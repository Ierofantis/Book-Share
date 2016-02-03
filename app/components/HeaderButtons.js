var React = require('react');
var HeaderButton = require("./HeaderButton.js")

var HeaderButtons = React.createClass({

    getInitialState: function() {
    return { 
    };
    },
  
    changeTab: function(tabName) {
      this.props.changeTab(tabName)
    },

    render: function() {

        var component = this;
       return (
        <div>
          {this.props.links.map(function(link) {
              var href = "#"
            if (link === "Sign Out") {
              href = "/logout"
            }

            return <HeaderButton changeTab={component.changeTab} href={href} key={link} name={link} />
          } 
          )}
        </div>
        );
  
  
      }
});

module.exports=HeaderButtons