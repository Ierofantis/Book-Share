
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")


var SingleMyRequest = React.createClass({

    getInitialState: function() {
      return { status: "Not Accepted", divClass: "alert alert-warning"}
    },

    componentDidMount: function() {

      if (this.props.book.confirmed === true) {
        this.setState({status: "Accepted", divClass: "alert alert-success"})
      }


    },

    render: function() {
      
    var date = this.props.book.date.substring(0,10)

      var divStyle = {
        padding: "10px",
        margin: "3px auto",
        width: "80%",
      }

       return (
          <div style={divStyle} className={this.state.divClass}> <p> {this.props.book.book} </p> 
          <p className="pull-right"> {this.state.status} </p> 
          <h5> Owner: {this.props.book.ownerName} Requested: {date} </h5></div> 

  );
      }




});
module.exports=SingleMyRequest;