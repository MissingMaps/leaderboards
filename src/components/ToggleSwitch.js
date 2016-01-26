import React from 'react';
import CheckboxGroup from 'react-checkbox-group';

export default React.createClass({
  handleChange: function (key) {
    this.props.onChange(this.refs.checkboxes.getCheckedValues());
  },
  render: function () {
    var props = this.props;
    if (!props.hashtags) {
      return <div></div>;
    }
    var toggles = Object.keys(props.hashtags).map((key, index) => {
      var className = 'onoffswitch-switch ' + props.hashtags[key];
      return (
          <label className="onoffswitch" key={key}>
            <input type="checkbox" className="onoffswitch-checkbox" value={key} />
            <div className="onoffswitch-label">
              <span className="onoffswitch-inner"></span>
              <span className={className}></span>
            </div>
          </label>
      );
    });
    return (
      <CheckboxGroup
        ref="checkboxes" onChange={this.handleChange}>
        {toggles}
      </CheckboxGroup>
    );
  }
});
