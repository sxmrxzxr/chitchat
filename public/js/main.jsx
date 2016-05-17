var React = require('react');
var ReactDOM = require('react-dom');
var InlineBlock = require('./inlineBlock.jsx')
var Participants = require('./participants.jsx')

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
