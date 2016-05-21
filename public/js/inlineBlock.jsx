var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');

module.exports = React.createClass({
  getInitialState: function() {
    return{ name: 'Anonymous', text: '' };
  },
  componentDidMount: function(){
  },
  handleTextChange: function(event) {
    this.setState({text: event.target.value});
  },
  handleNameFieldChange: function(event){
    this.setState({name: event.target.value});
  },
  handleNameSubmit: function(event) {
    event.preventDefault();
    var n = this.state.name;
    if(n==null){
      n='';
    }
    var id = this.props.socket.io.engine.id;
    this.props.socket.emit('nameChange', {
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
              ref="name"
              onChange={this.handleNameFieldChange}
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
