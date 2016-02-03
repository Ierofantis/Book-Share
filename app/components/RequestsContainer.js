
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")
var MyRequests = require("./MyRequests.js")
var RequestsForMe= require("./RequestsForMe.js")

var RequestsContainer = React.createClass({

      getInitialState: function() {

        return {
          myRequests: [],
          requestsForMe: []
        };

      },

      componentDidMount: function() {
        this.getRequests();
      },

      getRequests: function() {
        var component = this;
        var apiUrl = "/api/getrequests"

        ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
            data = JSON.parse(data)

            component.setState({myRequests: data.myRequests, requestsForMe: data.requestsForMe})
        });

      },

    render: function() {

  
        

       return (
          <div className="container-fluid">
            <div className="row">
              <MyRequests requests={this.state.myRequests} />
              <RequestsForMe requests={this.state.requestsForMe} />
            </div>
  			 </div>
        



  );
      }




});
module.exports=RequestsContainer;