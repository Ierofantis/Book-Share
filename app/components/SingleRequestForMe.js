
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")


var SingleRequestForMe = React.createClass({

	    getInitialState: function() {
        if (this.props.book.confirmed === true) {
          return { status: "Accepted"}
        }

        else return { status: "Not Accepted"}
      
    },

	 changeStatus: function() {
      var newState = "Accepted"
      var action = true;
      if (this.state.status === "Accepted") {
        newState = "Not Accepted"
        action = false;
      }

      this.setState({status: newState})

      var component = this; 
      var apiUrl = "/api/acceptrequest/" + this.props.book.title + "/" + action + "/" + this.props.book.requestedBy;
      ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {     
      });
    },

 
    render: function() {
      console.log(this.props)
    	var component = this;
    	var divStyle = {
    		padding: "10px",
    		margin: "3px auto",
    		width: "80%",
    	}


      var toggleStyle = {
        fontSize: "40px",
        marginRight: "10px",
        lineHeight: "22px"
      }

      var status = "alert alert-warning";
      var toggleClass = "fa fa-toggle-off pull-right"
      
      if (this.state.status === "Accepted") {
        status= "alert alert-success"
        toggleClass= "fa fa-toggle-on pull-right"
      }

      var date = this.props.book.requestedOn.substring(0,10)

 
       return (

          <div style={divStyle} className={status}> 
            <h5> {this.props.book.title} </h5>
            <i onClick={component.changeStatus} style={toggleStyle} className={toggleClass}> </i>  
            <p className="pull-right"> {component.state.status} </p> 
            <h5> Requested By: {this.props.book.requestedByName} {date} </h5>
          </div>


  );
      }




});
module.exports=SingleRequestForMe;