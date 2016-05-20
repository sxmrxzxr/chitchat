var React = require('react');
var ReactDOM = require('react-dom');
var Participants = require('./participants.jsx');

var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl);
var sessionId = '';
//TODO: Moved messages into this component


var InlineBlock = React.createClass({
  getInitialState: function() {
    return{ name: 'Anonymous', text: '' };
  },
  handleTextChange: function(event) {
    this.setState({text: event.target.value});
  },
  handleNameChange: function(event){
    this.setState({name: event.target.value});
  },
  handleNameSubmit: function(event) {
    event.preventDefault();
    var n = event.target.value;
    var id = sessionId;
    socket.emit('nameChange', {
      id: id,
      name: n
    });
  },
  handleSubmit: function(event) {
    event.preventDefault();
    var name = this.state.name;
    var text = this.state.text;
    $.ajax({
      url: '/message',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        message: text,
        name: name
      })
    });
    ReactDOM.findDOMNode(this.refs.message).value = '';
  },
  handleKeyPress: function(event) {
    if(event.key === 'Enter') {
      this.handleSubmit(event);
    }
  },
  render: function(){
    return(
      <div className="inlineBlock">
        <span>
          <form onSubmit={this.handleNameSubmit}>
            Your Name:
            <input
              type="text"
              value={this.state.name}
              id="name"
              onChange={this.handleNameChange}
              />
          </form>
        </span>
        <br />
        <form id="messageForm" onSubmit={this.handleSubmit}>
          <textarea
            rows="4"
            cols="50"
            placeholder="share something"
            maxLength="200"
            id="outgoingMessage"
            ref="message"
            onKeyPress = {this.handleKeyPress}
            onChange={this.handleTextChange}>
          </textarea>
          <input type="submit" value="Share" />
        </form>
      </div>
    );
  }
});


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
