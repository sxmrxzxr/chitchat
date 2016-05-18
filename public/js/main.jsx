var React = require('react');
var ReactDOM = require('react-dom');
var serverBaseUrl = document.domain;
var socket = io.connect(serverBaseUrl);
var sessionId = '';

var Participants = React.createClass({
  render:function(){
    console.log(this.props.data);
    if(this.props.data.participants!=null) {
      var participantNodes = this.props.data.participants.map(function(user){
        return (
          <p>{user.name}</p>
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
          {participantNodes}
          <br/>
        </div>
      </div>
    );
  }
});

var NameField = React.createClass({
  render: function(){
    return(
      <span>
        Your Name:
        <input type="text" value="Anonymous" id="name" />
      </span>
    );
  }
});

var MessageForm = React.createClass({
  render: function(){
    return(
      <form id="messageForm">
        <textarea rows="4" cols="50" placeholder="share something" maxLength="200" id="outgoingMessage"></textarea>
        <input type="button" value="Share" disabled id="send" />
      </form>
    );
  }
});

var InlineBlock = React.createClass({
  render: function(){
    return(
      <div className="inlineBlock">
        <NameField />
        <br />
        <MessageForm />
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
    socket.on('userDisconnected', function(data) {
      console.log(data);
    });
    socket.on('nameChanged', function(data) {
      console.log(data);
    });
    socket.on('incomingMessage', function(data) {
      console.log(data);
    });
    socket.on('error', function(reason){
      console.log(reason);
    });
  },
  render: function(){
    //var data=[];
    return(
      <div>
        <h1>ChitChat</h1>
        <InlineBlock />
        {console.log(this.state.data)}
        <Participants data={this.state.data}/>
      </div>
    );
  }
});

ReactDOM.render(
  <MainBody />,
  document.getElementById('content')
);
