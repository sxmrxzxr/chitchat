var React = require('react');
var ReactDOM = require('react-dom');
var Participants = require('./participants.jsx');
var Messages = require('./messages.jsx');
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
    socket.on('connect', this.handleConnect);
    socket.on('nameChanged', this.handleNameChanged);
    socket.on('error', this.handleError);
  },
  handleConnect: function(){
    sessionId = socket.io.engine.id;
    console.log('Connected ' + sessionId);
    socket.emit('newUser', {
      id: sessionId,
      name: $('#name').val()
    });
  },

  handleNameChanged: function(event) {
    console.log(event);
    var _participants = this.state.data;
    console.log(_participants.find(function(e){
      return e.id === data.id;
    }));
    //TODO
  },
  handleError: function(reason) {
    console.log(reason);
  },
  render: function(){
    return(
      <div>
        <h1>ChitChat</h1>
        <InlineBlock socket={socket} sessionId={sessionId} />
        <Participants socket={socket} />
        <Messages socket={socket} />
      </div>
    );
  }
});

ReactDOM.render(
  <MainBody />,
  document.getElementById('content')
);
