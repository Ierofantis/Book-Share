
var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var BookContainer = require("./BookContainer.js")
var ajaxFunctions = require("../common/ajax-functions.js")
var UserBookContainer = require("./UserBookContainer.js")
var MessageModal = require("./MessageModal.js")
var RequestsContainer = require("./RequestsContainer.js")

var MyBooks = React.createClass({

    getInitialState: function() {
    return { 
      bookSearch: [],
      userBooks: [],
      showModal: false,
      userMessage: ""

    };
    },

    componentDidMount: function() {
      this.getBooks();
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

    getBooks: function() {
      var component = this;
      var url = "/api/userBooks"

        ajaxFunctions.ajaxRequest('GET', url, function (data) {
             data = JSON.parse(data)
             component.setState({userBooks: data.books})
        });


    },

    clearBooks: function() {
      this.setState({bookSearch: []}, console.log("clearBooks being called"))
    },


    changeBook: function(e){
      this.setState({book: e.target.value})
    },

    sendData: function(e) {
      var component = this;
       if (e.key === 'Enter') {
        component.searchBooks();
    }
    },

    searchBooks: function() {

      var component = this;

      var book = this.state.book;
      var key = "AIzaSyDaJ0Om_qljos4jHfb2nzTQeYCnsiR90vs"
      var url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURI(book) + "&country=US";

      $.getJSON(url, function(data) {
          console.log(data)
        if (data.items === undefined) {
          component.createMessage("No book found with that title. Try being more specific.")
        }
        data = data.items;

        var booksArray = [];
        data.map(function(book) {

          var author = (book.volumeInfo.authors ? book.volumeInfo.authors[0] : "No author found")
          var img = (book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "No thumbnail found")

          var title = book.volumeInfo.title;
          var id = book.id;
          var bookObj = {};

          bookObj.author = author;
          bookObj.title = title;
          bookObj.img = img;
          bookObj.id = id;
          booksArray.push(bookObj)
        })

          component.setState({bookSearch: booksArray})

      });


    },

    render: function() {

        var component = this;
        var btnStyle = {marginLeft: "5px"}
        var inputStyle = {margin: "0px auto"}

       return (
       	  <div>
            <div className="input-box">
              <h3> Add a New Book </h3>
              <input onKeyPress = {this.sendData} onChange={this.changeBook} id="book-search" name="book-search"/>
              <button onClick={this.searchBooks} className="btn btn-primary"> Search </button>
            </div> 

            <div className="new-books container-fluid">

            {this.state.bookSearch.map(function(book) {

              return <BookContainer createMessage={component.createMessage} clearBooks={component.clearBooks} getBooks={component.getBooks} key={book.id} title={book.title} author={book.author} img={book.img} />


            })}
            </div> 

            <div className="my-books container-fluid">
            	<h3> All My Books </h3>


               {this.state.userBooks.map(function(book) {

                return <UserBookContainer key={book.id} book={book} />


              })}

              <MessageModal showMessage={this.state.showModal} hideMessage={this.hideMessage} message={this.state.userMessage}  />
            
  			   </div>
        </div>



  );
      }




});
module.exports=MyBooks;