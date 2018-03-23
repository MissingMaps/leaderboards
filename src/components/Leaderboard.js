import createClass from "create-react-class";
import { Cell, Table, Column } from "fixed-data-table-2";
import { isEqual } from "lodash";
import moment from "moment";
import React from "react";
import R from "ramda";

import Footer from "../components/Footer";

const SortTypes = {
  ASC: "ASC",
  DESC: "DESC"
};

const STATS_API_URL =
  process.env.REACT_APP_STATS_API_URL ||
  "https://osm-stats-production-api.azurewebsites.net";

const get = async uri => {
  const rsp = await fetch(uri);

  if (rsp.status !== 200) {
    throw new Error(rsp.json());
  }

  return rsp.json();
};

const getUsers = async (hashtag, { orderBy, orderDirection, page }) => {
  const params = [];

  if (orderBy != null) {
    params.push(`order_by=${orderBy}`);
  }

  if (orderDirection != null) {
    params.push(`order_direction=${orderDirection}`);
  }

  if (page != null) {
    params.push(`page=${page}`);
  }

  const users = await get(
    `${STATS_API_URL}/hashtags/${hashtag}/users?${params.join("&")}`
  );

  return users.map(u => ({
    ...u,
    hashtag
  }));
};

class PagedData {
  constructor(hashtags, colSortDirs, callback) {
    this.callback = callback;
    this.hashtags = hashtags;
    [this.orderBy] = Object.keys(colSortDirs);
    this.orderDirection = colSortDirs[this.orderBy];
    this.data = [];
    this.filteredData = this.data;
    this.filter = "";
    this.loading = false;
    this.page = 1;

    this.pages = this.hashtags.reduce(
      (acc, k) => ({
        ...acc,
        [k]: Infinity
      }),
      {}
    );

    this.loadData();
  }

  _sort(list, columnKey, sortDir) {
    var sortedList = list;

    if (columnKey === "created_at") {
      sortedList = R.sortBy(function(element) {
        var n = moment(R.prop("created_at", element)).valueOf();
        return n;
      }, list);
    } else {
      sortedList = R.sortBy(R.prop(columnKey), list);
    }

    if (sortDir === SortTypes.ASC) {
      sortedList = R.reverse(sortedList);
    }

    return sortedList;
  }

  applyFilter(filter) {
    if (filter != null) {
      // update filter if provided
      this.filter = filter || "";
    }

    if (this.filter.length > 0) {
      this.filteredData = this.data.filter(x => x.name.includes(this.filter));
    } else {
      this.filteredData = this.data;
    }

    // report more rows than we have for auto-pagination
    this.callback(this.filteredData.length + (this.isDataPending() ? 1 : 0));
  }

  isDataPending() {
    return (
      this.filter === "" &&
      Object.keys(this.pages).some(k => this.pages[k] === Infinity)
    );
  }

  async getHashtagUsers(hashtag) {
    // only fetch subsequent pages when previous pages weren't empty
    if (this.page < this.pages[hashtag]) {
      const data = await getUsers(hashtag, {
        orderBy: this.orderBy,
        orderDirection: this.orderDirection,
        page: this.page
      });

      if (data.length === 0) {
        this.pages[hashtag] = this.page - 1;
      }

      return data;
    }

    return [];
  }

  async loadData() {
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.data = this._sort(
      this.data
        .concat(
          (await Promise.all(
            this.hashtags.map(hashtag => this.getHashtagUsers(hashtag))
          ))
            // merge results
            .reduce((acc, obj) => acc.concat(obj), [])
        )
        // sort everything by edits for rank
        .sort((a, b) => b.edits - a.edits)
        .map((x, i) => ({
          ...x,
          rank: i + 1
        })),
      this.orderBy,
      this.orderDirection
    );
    this.page++;

    this.applyFilter();

    this.loading = false;
  }

  getObjectAt(index) {
    if (index > this.filteredData.length - 1) {
      this.loadData();

      return {
        name: "Loading..."
      };
    }

    return this.filteredData[index];
  }
}

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
}

var SortHeaderCell = createClass({
  render: function() {
    // keep onSortChange out of props
    var { sortDir, children, onSortChange, ...props } = this.props;

    return (
      <Cell className="LB-header-descriptor" {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.ASC ? "↑" : "↓") : "↕"}
        </a>
      </Cell>
    );
  },

  _onSortChange: function(e) {
    e.preventDefault();

    const { columnKey, onSortChange, sortDir } = this.props;

    if (onSortChange) {
      onSortChange(
        columnKey,
        sortDir ? reverseSortDirection(sortDir) : SortTypes.ASC
      );
    }
  }
});

var HeaderCell = createClass({
  render: function() {
    var { children, ...props } = this.props;

    return (
      <Cell className="LB-header-descriptor" {...props}>
        {children}
      </Cell>
    );
  }
});

function StatsCell(props) {
  var { className, colors, rowIndex, data, field, ...other } = props;

  className = className || "statsCell";

  const row = data.getObjectAt(rowIndex);

  if (row == null) {
    return <Cell />;
  }

  var display = row[field];

  if (field === "created_at" && display != null) {
    display = moment(display).fromNow();
  } else if (field === "roads" && display != null) {
    display =
      display.toLocaleString(undefined, { maximumFractionDigits: 1 }) + " km";
  } else {
    display = (display == null ? "" : display).toLocaleString();
  }

  className += " " + colors[row.hashtag];

  return (
    <Cell className={className} {...other}>
      {display}
    </Cell>
  );
}

const LinkCell = props => {
  const { rowIndex, colors, data, field, ...other } = props;

  const row = data.getObjectAt(rowIndex);

  if (row == null) {
    return <Cell />;
  }

  const userlink = "https://www.missingmaps.org/users/#/" + row.name;
  const userClass = colors[row.hashtag] + "-name statsCell table-username";

  let display = row[field];

  if (field === "created_at") {
    display = moment(display).fromNow();
  }

  return (
    <Cell className={userClass} {...other}>
      <a href={userlink}>{display}</a>
    </Cell>
  );
};

export default createClass({
  getInitialState: function() {
    return {
      size: 0,
      colSortDirs: {
        edits: SortTypes.ASC
      }
    };
  },
  componentDidMount: async function() {
    const { hashtags } = this.props;
    const { colSortDirs } = this.state;

    // NOTE: when comparing uneven hashtags, users from the one with lower
    // engagement will appear higher in the result list than they should (since
    // it's showing the first 500 users of each)
    this.setState({
      data: new PagedData(hashtags, colSortDirs, this.dataDidUpdate),
      size: 0
    });
  },
  componentWillUpdate: async function(nextProps, nextState) {
    const { hashtags } = nextProps;
    const { colSortDirs } = nextState;

    if (
      !isEqual(this.props.hashtags, hashtags) ||
      !isEqual(this.state.colSortDirs, colSortDirs)
    ) {
      this.setState({
        data: new PagedData(hashtags, colSortDirs, this.dataDidUpdate),
        size: 0
      });
    }
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    const { hashtags } = nextProps;
    const { colSortDirs, size } = nextState;

    return (
      !isEqual(this.props.hashtags, hashtags) ||
      !isEqual(this.state.colSortDirs, colSortDirs) ||
      !isEqual(this.state.size, size)
    );
  },
  dataDidUpdate: function(size) {
    this.setState({
      size
    });
  },
  _onFilterChange: function(e) {
    const { data } = this.state;

    data.applyFilter(e.target.value.toLowerCase());
  },
  _onSortChange: async function(columnKey, sortDir) {
    this.setState({
      colSortDirs: {
        [columnKey]: sortDir
      }
    });
  },
  render: function() {
    const { colors } = this.props;
    const { colSortDirs, data, size } = this.state;

    return (
      <div>
        <section className="section-leaderboard">
          <div className="row">
            <h2 className="section-header section-header__light">
              Leaderboard
            </h2>
            <div className="search-bar-input-test">
              <input
                onChange={this._onFilterChange}
                className="search-bar-input"
                name="query"
                type="text"
                maxLength="100"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Search for user"
              />
              <div className="search-bar-side">
                <div className="search-glass">
                  <div
                    style={{
                      WebkitTransform: "rotate(45deg)",
                      MozTransform: "rotate(45deg)",
                      OTransform: "rotate(45deg)"
                    }}
                  >
                    &#9906;
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="Table-Container">
              <Table
                rowsCount={size}
                rowHeight={60}
                width={1100}
                height={700}
                headerHeight={30}
              >
                <Column
                  columnKey="Rank"
                  header={
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.hashtag}
                    >
                      RANK
                    </SortHeaderCell>
                  }
                  cell={
                    <StatsCell
                      className="rankCell"
                      colors={colors}
                      data={data}
                      field="rank"
                    />
                  }
                  width={48}
                  fixed={true}
                />
                <Column
                  columnKey="name"
                  header={<HeaderCell>NAME</HeaderCell>}
                  cell={<LinkCell colors={colors} data={data} field="name" />}
                  width={200}
                />
                <Column
                  columnKey="hashtag"
                  header={<HeaderCell>TEAM</HeaderCell>}
                  cell={
                    <StatsCell colors={colors} data={data} field="hashtag" />
                  }
                  width={150}
                />
                <Column
                  columnKey="edits"
                  header={
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.edits}
                    >
                      TOTAL EDITS
                    </SortHeaderCell>
                  }
                  cell={<StatsCell colors={colors} data={data} field="edits" />}
                  width={100}
                  flexGrow={1}
                />
                <Column
                  columnKey="buildings"
                  header={
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.buildings}
                    >
                      BUILDING EDITS
                    </SortHeaderCell>
                  }
                  cell={
                    <StatsCell colors={colors} data={data} field="buildings" />
                  }
                  width={100}
                  flexGrow={1}
                />
                <Column
                  columnKey="roads"
                  header={
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.roads}
                    >
                      KM OF ROAD
                    </SortHeaderCell>
                  }
                  cell={<StatsCell colors={colors} data={data} field="roads" />}
                  width={120}
                  flexGrow={1}
                />
                <Column
                  columnKey="created_at"
                  header={
                    <SortHeaderCell
                      onSortChange={this._onSortChange}
                      sortDir={colSortDirs.created_at}
                    >
                      LAST UPDATE
                    </SortHeaderCell>
                  }
                  cell={
                    <StatsCell colors={colors} data={data} field="created_at" />
                  }
                  width={150}
                  flexGrow={1}
                />
              </Table>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
});
