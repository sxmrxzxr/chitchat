var React = require('react');

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

module.exports = React.createClass({
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
