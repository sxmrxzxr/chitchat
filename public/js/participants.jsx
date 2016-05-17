var React = require('react');

module.exports = React.createClass({
  render:function(){
    return(
      <div className="inlineBlock topAligned">
        <b>Participants</b>
        <br />
        <div id="participants"></div>
      </div>
    );
  }
})
