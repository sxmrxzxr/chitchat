var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return{data: []};
  },
  componentDidMount: function() {
    this.props.socket.on('incomingMessage', function(data) {
      console.log(data);
      var comments = this.state.data;
      comments.push(data);
      this.setState({data:comments});
    }.bind(this));
    // socket.on('nameChanged', function(data) {
    // });
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
