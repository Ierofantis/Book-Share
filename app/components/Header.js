var React = require('react');
var HeaderButtons = require("./HeaderButtons.js")
var ContentContainer = require("./ContentContainer.js")

var Header = React.createClass({

    getInitialState: function() {
    return { 
      tab: "Browse All Books"
    };
    },



    changeTab: function(tabName) {
      if (tabName !== "Sign Out") {
          this.setState({tab: tabName});
        }
        
      
    },

    render: function() {

       return (
          <div>
            <div id="rct-header" className="header">
              <div id="title-bundle">
                <img id="rct-title-img" className="title-img" src="public/img/leaflet.png"/>
                <p id="rct-title" className="title"> {this.props.title} </p>
              </div>
              <div id="button-bundle">
                <HeaderButtons changeTab={this.changeTab} links={["Sign Out", "Profile", "My Books", "Book Requests", "Browse All Books"]}/>
              </div>
            </div>
            <ContentContainer books={this.props.books} tab={this.state.tab} />
          </div>
        );
  
  
      }
});

module.exports=Header