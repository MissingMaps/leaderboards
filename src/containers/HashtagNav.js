import createClass from "create-react-class";
import fetch from "isomorphic-fetch";
import R from "ramda";
import React from "react";
import Autosuggest from "react-autosuggest";

import Header from "../components/Header.js";

const STATS_API_URL =
  process.env.REACT_APP_STATS_API_URL ||
  "https://osm-stats-prod-api.azurewebsites.net";

const getSuggestionValue = suggestion => suggestion;

const renderSuggestion = (suggestion, { query, isHighlighted }) => (
  <span>
    {query}
    <strong>{suggestion.slice(query.length)}</strong>
  </span>
);

export default createClass({
  getInitialState: function() {
    return {
      trending: [],
      all: [],
      showModal: false,
      suggested: "",
      suggestions: []
    };
  },
  componentDidMount: function() {
    var component = this;
    fetch(`${STATS_API_URL}/hashtags`)
      .then(function(res) {
        return res.json();
      })
      .then(function(results) {
        var resultsCheck = results.trending.length;
        var defaultText = "";
        if (resultsCheck === 0) {
          defaultText = "No current trending hashtags.";
        }

        component.setState({
          all: results.hashtags,
          trending: results.trending,
          default: defaultText
        });
      });
  },
  onChange: function(event, { newValue }) {
    this.setState({
      suggested: newValue
    });
  },
  onSubmit: function(input) {
    var params = this.props.id;
    var hashtags = params.split(",");
    if (!R.contains(input, hashtags)) {
      params = params + "," + input;
      var mapLocation = R.match(/\/.+\/map/, this.props.location.pathname)
        .length;
      if (mapLocation > 0) {
        this.props.history.push("/" + params + "/map");
      } else {
        this.props.history.push("/" + params);
      }
    }
    this.setState({
      showModal: false
    });
  },
  onSuggestionsClearRequested: function() {
    this.setState({
      suggestions: []
    });
  },
  onSuggestionsFetchRequested: function({ value }) {
    const { all } = this.state;

    this.setState({
      suggestions: all
        .filter(x => x.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 10)
    });
  },
  render: function() {
    var list = this.props.id.split(",");
    var component = this;

    const { suggested, suggestions } = this.state;

    const suggestionProps = {
      placeholder: "missingmaps",
      value: suggested,
      onChange: this.onChange
    };

    return (
      <div>
        <Header />
        <section className="section-feature">
          <div className="row">
            <span className="section-headline section-headline__lighter">
              Leaderboard
            </span>
            <h1 className="title title-leaderboard">
              {list.map(function(hashtag, index) {
                return (
                  <span className="header-spacer-multiple" key={hashtag}>
                    {hashtag}{" "}
                    {list.length > 1 && index < list.length - 1 ? (
                      <span>vs.</span>
                    ) : (
                      <div style={{ display: "none" }} />
                    )}
                  </span>
                );
              })}
            </h1>
            <div
              className="Leaderboard-Navbar-Container"
              style={{ display: list.length < 3 ? "" : "none" }}
            >
              <a
                className="link-actionlink"
                onClick={e => {
                  e.preventDefault();
                  this.setState({
                    showModal: !this.state.showModal
                  });
                }}
              >
                Add Competitor
              </a>
              <div
                className="LN-Hashtag-Container"
                style={{
                  display: this.state.showModal ? "" : "none"
                }}
              >
                <div className="Input-hashtag">
                  <Autosuggest
                    getSuggestionValue={getSuggestionValue}
                    onSuggestionsFetchRequested={
                      this.onSuggestionsFetchRequested
                    }
                    onSuggestionsClearRequested={
                      this.onSuggestionsClearRequested
                    }
                    renderSuggestion={renderSuggestion}
                    suggestions={suggestions}
                    inputProps={suggestionProps}
                  />
                  <input
                    className="icon search-bar-submit"
                    type="submit"
                    onSubmit={this.onSubmit}
                    onClick={() => this.onSubmit(suggested)}
                  />
                </div>
                <div className="dropdown-details">
                  <h5 className="header-style__plain">Popular Options</h5>
                  <ul>
                    <li className="dropdown-option">{this.state.default}</li>
                  </ul>
                  <ul>
                    {this.state.trending.map(function(hashtag) {
                      return (
                        <li className="dropdown-option" key={hashtag}>
                          <button
                            className="btn-link"
                            onClick={e => {
                              e.preventDefault();
                              component.onSubmit(hashtag);
                            }}
                          >
                            {hashtag}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
});
