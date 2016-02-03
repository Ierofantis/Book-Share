
var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var ajaxFunctions = require("../common/ajax-functions.js")
var PublicBookContainer = require("./PublicBookContainer.js")
var MessageModal = require("./MessageModal.js")


var AllBooks = React.createClass({

    getInitialState: function() {
    return { 
      allBooks: this.props.books,
      showModal: false,
      userMessage: ""
    };
    },

    componentDidMount: function() {
      this.getAllBooks()
    },


    showMessage: function() {
      this.setState({showModal: true})
    },

    hideMessage: function() {
      this.setState({showModal: false})

    },

    createMessage: function(message) {
      var component = this;
      this.setState({userMessage: message}, function() {
        component.showMessage()
      })
    },

  

    getAllBooks: function() {
      var component = this;
      var apiUrl = "/api/allbooks"

        //GET ALL BOOKS FROM SERVER
        ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {

          data = JSON.parse(data)
          component.setState({allBooks: data})  
        });

    },

    render: function() {
      var component = this;

      

       return (

       	  <div className="content-container container-fluid">
            <div className="key">
              <div className="line line-available"> </div> <p> Available </p>
            </div>
            <div className="key">
              <div className="line line-taken"> </div> <p> Reserved </p>
            </div>
            <h4 className="instructions"> Click on an available book to reserve it </h4>
               {this.state.allBooks.map(function(book) {

                return <PublicBookContainer createMessage={component.createMessage} key={book.userID + "/" + book.title} getAllBooks={component.getAllBooks} book={book} /> 

              })}
            <MessageModal showMessage={this.state.showModal} hideMessage={this.hideMessage} message={this.state.userMessage}  />
  			</div>
  );
     }  




});
module.exports=AllBooks