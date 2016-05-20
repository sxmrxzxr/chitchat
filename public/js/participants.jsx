var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.props.socket.on('newConnection', this.handleNewConnection);
    this.props.socket.on('userDisconnected', this.handleUserDisconnected);
  },
  handleNewConnection: function(data) {
    this.setState({data:data});
  },
  handleUserDisconnected: function(data) {
    //TODO
    console.log(data);
  },
  render:function(){
    if(this.state.data.participants!=null) {
      var participantNodes = this.state.data.participants.map(function(user){
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
