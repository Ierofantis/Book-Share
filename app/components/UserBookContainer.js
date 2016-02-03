
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")


var UserBookContainer = React.createClass({

	getInitialState: function() {
		
		return {
			img: "http://books.google.com/books/content?id=" + this.props.book.imgID + "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: this.props.book.title,
			author: this.props.book.author,
			requested: this.props.book.requested

		}
	},

    render: function() {
    	var color = "#338CD2"
    	if (this.props.book.requested) {
    		color = "#D7280B"
    	}
    	var divStyle = {
  			border: '5px solid',
  			borderColor: color,
};  

      var imgStyle = {
        backgroundColor: color
      };

       return (
       	  <div className="book-container col-md-2 col-sm-4 col-xs-6">
            <img style={divStyle} src={this.state.img}/> 
  			 </div>
        



  );
      }




});
module.exports=UserBookContainer;