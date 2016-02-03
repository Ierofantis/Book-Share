
var React = require('react');

var HeaderButton = React.createClass({

    getInitialState: function() {
    return { 
    };
    },

    changeTab: function() {

    	this.props.changeTab(this.props.name)
    },

    render: function() {

       return (
          <button onClick={this.changeTab} id="rct-btn" className="btn-header  btn btn-primary"> <a href={this.props.href}>{this.props.name} </a></button>
        );
  
  
      }
});
module.exports=HeaderButton