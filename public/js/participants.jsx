var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.props.socket.on('newConnection', this.newConnection);
    this.props.socket.on('userDisconnected', this.userDisconnected);
    this.props.socket.on('nameChanged', this.nameChanged);
  },
  newConnection: function(data) {
    this.setState({data:data});
  },
  userDisconnected: function(data) {
    //TODO
    console.log(data);
  },
  nameChanged: function(event) {
    console.log(event);
    console.log(this.state.data);
    // var _participants = this.state.data;
    // console.log(_participants.find(function(e){
    //   return e.id === data.id;
    // }));
    // //TODO
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
