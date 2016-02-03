
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")


var BookContainer = React.createClass({


      addBook: function() {
        var component = this;
        var title = this.props.title;
        var img =  this.props.img;
        var author = this.props.author;
        
        //GET IMAGE ID
        var regex = /id=(.*?)\&/;
        var matched = regex.exec(img);
        var imgID = matched[1];
       

        var apiUrl = "/api/addbook/" + title + "/" + author + "/" + imgID
        ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
            component.props.createMessage(data)
            component.props.getBooks();
        });

        this.props.clearBooks()
        

        
      },

    render: function() {

      var divStyle = { cursor: "pointer"}

       return (
       	  <div className="book-container col-md-2 col-sm-4 col-xs-6">
            <img style={divStyle} key={this.props.img} onClick={this.addBook} src={this.props.img}/> 
  			 </div>
        



  );
      }




});
module.exports=BookContainer;