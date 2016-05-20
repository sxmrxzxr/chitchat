var React = require('react');
var ReactDOM = require('react-dom');
var Participants = require('./participants.jsx');
var InlineBlock = require('./inlineBlock.jsx');

var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl);
var sessionId = '';
//TODO: Moved messages into this component


var Messages = React.createClass({
  getInitialState: function() {
    return{data: []};
  },
  componentDidMount: function() {
    socket.on('incomingMessage', function(data) {
      console.log(data);
      var comments = this.state.data;
      comments.push(data);
      this.setState({data:comments});
    }.bind(this));
  },
  render: function() {
    var commentNodes = this.state.data.map(function(e) {
      return(
        <p><b>{e.name}</b> {e.message} <br/></p>
      );
    });
    return(
      <div id='messages'>
        {commentNodes}
      </div>
    );
  }
});

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
      //Having this console.log makes it work but I'm not sure why
      console.log(this.state.data);
    });
    //TODO
    socket.on('nameChanged', function(data) {
      console.log(data);
      //Like userDisconnected, this also works. I suspect its incorrect though
      console.log(this.state.data);
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
  <div>
    <MainBody />
    <Messages />
  </div>,
  document.getElementById('content')
);
