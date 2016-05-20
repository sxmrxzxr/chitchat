var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return{data: []};
  },
  componentDidMount: function() {
    this.props.socket.on('incomingMessage', this.receivingNewMessage);
    this.props.socket.on('nameChanged', this.nameChangedMessage);
  },
  receivingNewMessage: function(data) {
    console.log(data);
    var comments = this.state.data;
    comments.push(data);
    this.setState({data:comments});
  },
  nameChangedMessage: function(data) {
    var comments = this.state.data;
    var newName = data;
    newName.message = ' changed name to ' + newName.name;
    newName.name = newName.oldName;
    comments.push(newName);
    this.setState({data:comments});
  },
  render: function() {
    var commentNodes = this.state.data.map(function(e) {
      return(
        <p><b>{e.name}: </b> {e.message} </p>
      );
    });
    return(
      <div id='messages'>
        {commentNodes}
      </div>
    );
  }
});
