import React from 'react';
import L from 'leaflet';
import tfc from 'turf-featurecollection';
import turfextent from 'turf-extent';
import R from 'ramda';

var styles = {
  'redteam': {
    'color': '#15b7b7',
    'weight': 5,
    'opacity': 0.65
  },
  'greenteam': {
    'color': '#f37346',
    'weight': 5,
    'opacity': 0.65
  },
  'blueteam': {
    'color': '#bdcc32',
    'weight': 5,
    'opacity': 0.65
  }
};

function combineFC (elements) {
  var allFeatures = R.flatten(R.map(R.prop('features'), elements));
  return tfc(allFeatures);
}

export default React.createClass({
  getInitialState: function () {
    return {
      map: {},
      position: [0, 0],
      layers: {},
      numLayersHasChanged: false
    };
  },
  addToMap: function (props) {
    var features = props.features;
    var layers = this.state.layers;
    var component = this;
    var map = component.map;
    Object.keys(features).forEach((hashtag) => {
      if (layers[hashtag]) {
        layers[hashtag].addData(combineFC(features[hashtag]));
      } else {
        layers[hashtag] = L.geoJson(combineFC(features[hashtag]), {
          style: styles[props.colors[hashtag]],
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {'opacity': 0, radius: 0.1});
          }
        });
        layers[hashtag].addTo(map);
      }
    });
    this.setState({
      layers: layers
    });
    var extent = turfextent(combineFC(R.flatten(R.values(features))));
    extent = [[extent[1], extent[0]], [extent[3], extent[2]]];
    return extent;
  },
  componentDidMount: function () {
    var map = L.map('map', {minZoom: 2}).setView(this.state.position, 2);
    L.tileLayer('http://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RhdGVvZnNhdGVsbGl0ZSIsImEiOiJlZTM5ODI5NGYwZWM2MjRlZmEyNzEyMWRjZWJlY2FhZiJ9.omsA8QDSKggbxiJjumiA_w.', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.Icon.Default.imagePath = 'assets/images/';

    this.map = map;

    if (this.props &&
        this.props.hasOwnProperty('features') &&
          Object.keys(this.props.features).length) {
      var extent = this.addToMap(this.props);
      this.map.fitBounds(extent);
    }
    this.setState({
      map: this.map
    });
  },
  componentWillReceiveProps: function (nextProps) {
    var layers = Object.keys(this.state.layers);
    var numLayers = layers.length;
    var numLayersHasChanged = (Object.keys(nextProps.features).length !== numLayers);

    layers.forEach((layerKey) => {
      this.state.map.removeLayer(this.state.layers[layerKey]);
    });
    this.state.layers = {};
    var props = nextProps;

    if (props &&
        props.hasOwnProperty('features') &&
          Object.keys(props.features).length) {
      var extent = this.addToMap(props);

      if (numLayersHasChanged) {
        this.map.fitBounds(extent);
      }
    }
  },
  render: function () {
    return (
      <div id = "MapContainer">
        <div className = "MapContent">
          <div id="map"></div>
          <div className = "Map-Subtext">
            Map updates every 30 seconds to show the last 100 changesets made for the competing hashtags.
          </div>
        </div>
      </div>);
  }
});
