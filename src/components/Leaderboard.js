import createClass from 'create-react-class';
import {Cell, Table, Column} from 'fixed-data-table';
import moment from 'moment';
import React from 'react';
import R from 'ramda';

import Footer from '../components/Footer.js';

var SortTypes = {
  ASC: 'ASC',
  DESC: 'DESC'
};

function reverseSortDirection (sortDir) {
  return sortDir === SortTypes.ASC ? SortTypes.DESC : SortTypes.ASC;
}

var SortHeaderCell = createClass({
  render: function () {
    var {sortDir, children, ...props} = this.props;
    return (
      <Cell className='LB-header-descriptor' {...props}>
        <a onClick={this._onSortChange}>
          {children} {sortDir ? (sortDir === SortTypes.ASC ? '↑' : '↓') : '↕'}
        </a>
      </Cell>
    );
  },

  _onSortChange: function (e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir
          ? reverseSortDirection(this.props.sortDir)
          : SortTypes.ASC
      );
    }
  }
});

function StatsCell (props) {
  var {className, rowIndex, data, field, ...other} = props;

  className = className || 'statsCell';

  if (!data[rowIndex]) return <Cell></Cell>;
  var display = data[rowIndex][field];

  if (field === 'created_at') {
    display = moment(display).fromNow();
  } else if (field === 'roads') {
    display = display.toLocaleString(undefined, { maximumFractionDigits: 1 }) + ' km';
  } else {
    display = display.toLocaleString();
  }

  className += ' ' + data[rowIndex].team;

  return (
    <Cell className={className} {...other } >
      { display }
    </Cell>
  );
}

const LinkCell = (props) => {
  var {rowIndex, data, field, ...other} = props;
  if (!data[rowIndex]) return <Cell></Cell>;

  var username = props.data[rowIndex].name;
  var usernameShift = username.replace(/\s+/g, '-').toLowerCase();

  var userlink = 'http://missingmaps.org/users/#/' + usernameShift;
  var userClass = data[rowIndex].team + '-name statsCell table-username';

  var display = data[rowIndex][field];
  if (field === 'created_at') {
    display = moment(display).fromNow();
  }

  return (
    <Cell className={userClass} {...other } >
      <a href={userlink}>{ display }</a>
    </Cell>
  );
};

export default createClass({
  getInitialState: function () {
    return {
      sortedDataList: [],
      list: [],
      colSortDirs: {
        'edits': 'ASC'
      },
      filterBy: ''
    };
  },
  setTableData: function (props) {
    var colors = props.colors;
    var rows = props.rows;

    var list = [];
    Object.keys(rows).forEach((key) => {
      rows[key].forEach((row) => {
        row.team = colors[key];
        row.hashtag = key;
        list.push(row);
      });
    });

    // Sort by edits so we can add rank
    var sortedList = this._sort(list, 'edits', 'ASC').map((x, idx) => ({ ...x, rank: idx + 1 }));

    var colSortKeys = Object.keys(this.state.colSortDirs);
    var key = colSortKeys[0];
    var dir = this.state.colSortDirs[key];
    sortedList = this._sort(sortedList, key, dir);

    // Filter
    var filteredList = sortedList;
    if (this.state.filterBy.length > 0) {
      filteredList = this._filter(sortedList, this.state.filterBy);
    }

    this.setState({
      sortedDataList: filteredList,
      list: sortedList
    });
  },
  componentDidMount: function () {
    var props = this.props;
    if (props && props.hasOwnProperty('colors') && props.hasOwnProperty('rows')) this.setTableData(props);
  },
  componentWillReceiveProps: function (props) {
    if (props && props.hasOwnProperty('colors') && props.hasOwnProperty('rows')) this.setTableData(props);
  },
  _filter: function (list, filterBy) {
    return R.filter(function (element) {
      var {name} = element;
      return (name.toLowerCase().indexOf(filterBy) !== -1);
    }, list);
  },
  _onFilterChange: function (e) {
    if (e.target.value.length === 0 || !e.target.value) {
      this.setState({
        sortedDataList: this.state.list,
        filterBy: ''
      });
      return;
    }

    var filterBy = e.target.value.toLowerCase();
    var list = this.state.list;

    var filteredList = this._filter(list, filterBy);

    this.setState({
      sortedDataList: filteredList,
      filterBy: filterBy
    });
  },
  _sort: function (list, columnKey, sortDir) {
    var sortedList = list;
    if (columnKey === 'created_at') {
      sortedList = R.sortBy(function (element) {
        var n = moment(R.prop('created_at', element)).valueOf();
        return n;
      }, list);
    } else {
      sortedList = R.sortBy(R.prop(columnKey), list);
    }
    if (sortDir === SortTypes.ASC) {
      sortedList = R.reverse(sortedList);
    }
    return sortedList;
  },
  _onSortChange: function (columnKey, sortDir) {
    var list = this.state.sortedDataList;

    var sortedList = this._sort(list, columnKey, sortDir);

    this.setState({
      sortedDataList: sortedList,
      list: sortedList,
      colSortDirs: {
        [columnKey]: sortDir
      }
    });
  },
  render: function () {
    var {sortedDataList, colSortDirs} = this.state;
    return (
      <div>
        <section className="section-leaderboard">
          <div className="row">
            <h2 className="section-header section-header__light">Leaderboard</h2>
        <div className='search-bar-input-test'>
          <input onChange={this._onFilterChange}
            className='search-bar-input'
            name='query' type='text'
            maxLength='100'
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect='off'
            placeholder='Search for user'/>
          <div className='search-bar-side'>
            <div className='search-glass'><div style={{'WebkitTransform': 'rotate(45deg)', 'MozTransform': 'rotate(45deg)', 'OTransform': 'rotate(45deg)'}}>&#9906;</div></div>
          </div>
        </div>
        <br />
        <div className='Table-Container'>
        <Table
          rowsCount={sortedDataList.length}
          rowHeight={60}
          width={1100}
          height={700}
          headerHeight={30}>
          <Column
            columnKey='Rank'
            header=
              {<SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.hashtag} >
                RANK
              </SortHeaderCell>}
            cell={<StatsCell className="rankCell" data={sortedDataList} field="rank" />}
            width={48}
            fixed={true}

          />
          <Column
            columnKey='name'
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.name} >
                NAME
              </SortHeaderCell>
            }
            cell={<LinkCell data={sortedDataList} field='name' />}
            width={200}
          />
          <Column
            columnKey='hashtag'
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.hashtag} >
                TEAM
              </SortHeaderCell>}
            cell={<StatsCell data={sortedDataList} field='hashtag' />}
            width={150}
          />
          <Column
            columnKey='edits'
            header={
              <SortHeaderCell
                onSortChange={this._onSortChange}
                sortDir={colSortDirs.edits} >
                TOTAL EDITS
              </SortHeaderCell>}
            cell={<StatsCell data={sortedDataList} field='edits' />}
            width={100}
            flexGrow={1}
          />
          <Column
            columnKey='buildings'
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.buildings} >
              BUILDINGS
            </SortHeaderCell>}
            cell={<StatsCell data={sortedDataList} field='buildings' />}
            width={100}
            flexGrow={1}
          />
          <Column
            columnKey='roads'
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.roads} >
              KM OF ROAD
            </SortHeaderCell>
            }
            cell={<StatsCell data={sortedDataList} field='roads' />}
            width={120}
            flexGrow={1}
          />
          <Column
            columnKey='created_at'
            header={<SortHeaderCell
              onSortChange={this._onSortChange}
              sortDir={colSortDirs.created_at} >
              LAST UPDATE
            </SortHeaderCell>
            }
            cell={<StatsCell data={sortedDataList} field='created_at' />}
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
