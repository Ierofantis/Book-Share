
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")
var SingleRequestForMe = require("./SingleRequestForMe.js")

var RequestsForMe = React.createClass({

    render: function() {


       return (
       	  <div className="col-md-6 requests-for-me">
            <h3> Requests For My Books </h3>
            {this.props.requests.map(function(book) {

              return  <SingleRequestForMe book={book} />

            })}

  			 </div>

  );
      }




});
module.exports=RequestsForMe;