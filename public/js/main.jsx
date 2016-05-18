var React = require('react');
var ReactDOM = require('react-dom');

var Participants = React.createClass({
  render:function(){
    return(
      <div className="inlineBlock topAligned">
        <b>Participants</b>
        <br />
        <div id="participants"></div>
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
  render: function(){
    return(
      <div>
        <h1>ChitChat</h1>
        <InlineBlock />
        <Participants />
      </div>
    );
  }
});

ReactDOM.render(
  <MainBody />,
  document.getElementById('content')
);
