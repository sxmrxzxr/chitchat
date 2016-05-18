var React = require('react');
var ReactDOM = require('react-dom');
var Participants = require('./participants.jsx');
var InlineBlock = require('./inlineBlock.jsx');

var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl);
var sessionId = '';

//TODO: Moved messages into this component


var MainBody = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    socket.on('connect', function(){
      sessionId = socket.io.engine.id;
      console.log('Connected ' + sessionId);
      socket.emit('newUser', {
        id: sessionId,
        name: $('#name').val()
      });
    });
    socket.on('newConnection', function(data) {
      this.setState({data:data});
    }.bind(this));
    //TODO
    socket.on('userDisconnected', function(data) {
      console.log(data);
    });
    //TODO
    socket.on('nameChanged', function(data) {
      console.log(data);
    });
    //TODO
    socket.on('incomingMessage', function(data) {
      console.log(data);
    });
    //TODO
    socket.on('error', function(reason){
      console.log(reason);
    });
  },
  render: function(){
    return(
      <div>
        <h1>ChitChat</h1>
        <InlineBlock />
        <Participants data={this.state.data}/>
      </div>
    );
  }
});

ReactDOM.render(
  <MainBody />,
  document.getElementById('content')
);
