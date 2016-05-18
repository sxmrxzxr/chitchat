var React = require('react');

var NameField = React.createClass({
  getInitialState: function() {
    return{ value: 'Anonymous' };
  },
  handleChange: function(event){
    this.setState({value: event.target.value});
  },
  render: function(){
    return(
      //TODO: Get this hooked up better
      <span>
        Your Name:
        <input
          type="text"
          value={this.state.value}
          id="name"
          onChange={this.handleChange}
          />
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
