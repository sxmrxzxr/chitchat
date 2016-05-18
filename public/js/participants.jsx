var React = require('react');

module.exports = React.createClass({
  render:function(){
    if(this.props.data.participants!=null) {
      var participantNodes = this.props.data.participants.map(function(user){
        return (
          <li key={user.id}>{user.name}</li>
        );
      });
    } else {
      var participantNodes = <p></p>
    }
    return(
      <div className="inlineBlock topAligned">
        <b>Participants</b>
        <br />
        <div id="participants">
          <ul>
            {participantNodes}
          </ul>
        </div>
      </div>
    );
  }
});
