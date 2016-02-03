
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")

var SingleMyRequest = require("./SingleMyRequest.js")

var MyRequests = React.createClass({



    render: function() {


       return (
       	  <div className="col-md-6 my-requests">
            <h3> Requests I Have Made </h3>
              
              {this.props.requests.map(function(book) {

                return <SingleMyRequest book={book} />


              })}

  			 </div>

  );
      }




});
module.exports=MyRequests;