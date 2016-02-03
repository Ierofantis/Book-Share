
var React = require('react');

var AllBooks = require("./AllBooks.js")
var MyBooks = require("./MyBooks.js")
var Profile = require("./Profile.js")
var RequestsContainer = require("./RequestsContainer.js")


var ContentContainer = React.createClass({

    getInitialState: function() {
    return { 
    };
    },

    render: function() {

      var h1Style = {marginTop: "150px"}

       return (
       	  <div className="content-container">
          
          	<h1 style={h1Style}> {this.props.tab} </h1>
          
            	{this.props.tab === "My Books" ?
                          <MyBooks />
                          :null}
              {this.props.tab === "Browse All Books" ?
                          
                          <AllBooks books={this.props.books}/>
                          :null}
              {this.props.tab === "Profile" ?
                          
                          <Profile />
                          :null}
              {this.props.tab === "Book Requests" ?
                          
                          <RequestsContainer />
                          :null}
  			</div>
  );
     }  




});
module.exports=ContentContainer