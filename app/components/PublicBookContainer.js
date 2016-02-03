var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")


var PublicBookContainer = React.createClass({

		getInitialState: function() {
		
		return {
			img: "http://books.google.com/books/content?id=" + this.props.book.imgID + "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: this.props.book.title,
			author: this.props.book.author,
			requested: this.props.book.requested,
			userID: this.props.book.userID
		}
	},

	requestBook: function() {
		var component = this;
		console.log(component.state)
		
		if (!this.state.requested) {
			var apiUrl = "/api/requestbook/" + this.state.title + "/" + this.state.userID
	        ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
	        	component.props.createMessage("You requested " + component.state.title + " by " + component.state.author + ". Please check your book requests to see its status.")
	        	component.props.getAllBooks()
	        });
		}
		else {
			component.props.createMessage("That book has already been requested. Please choose another book.")
		}


	},


    render: function() {
    	var pointer = "pointer"
    	var color = "#338CD2"
    	if (this.props.book.requested) {
    		color = "#D7280B"
    		pointer = ""
    	}
    	var divStyle = {
  			border: '5px solid',
  			borderColor: color,
  			cursor: pointer
};

       return (
       	  <div onClick={this.requestBook} data-content="Text added on hover" className="book-container col-md-2 col-sm-4 col-xs-6" >
         	 <img style={divStyle}  src={this.state.img}/> 
  		  </div>
        



  );
      }




});
module.exports=PublicBookContainer;