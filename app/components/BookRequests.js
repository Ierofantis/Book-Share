
var React = require('react');

var ajaxFunctions = require("../common/ajax-functions.js")

var MyRequests = require("./MyRequests.js")
var RequestsForMe= require("./RequestsForMe.js")



var BookRequests = React.createClass({

    getInitialState: function() {
    return { 
      bookSearch: [],
      userBooks: []
    };
    },

    componentDidMount: function() {
      this.getBooks();
    },

    getBooks: function() {
      var component = this;
      var url = "/api/userBooks"

      ajaxFunctions.ajaxRequest('GET', url, function (data) {
         data = JSON.parse(data)
         component.setState({userBooks: data.books})
      });


    },


    changeBook: function(e){

      this.setState({book: e.target.value})
      console.log(this.state)
    },

    searchBooks: function() {

      var component = this;

      var book = this.state.book;
      var key = "AIzaSyDaJ0Om_qljos4jHfb2nzTQeYCnsiR90vs"
      var url = "https://www.googleapis.com/books/v1/volumes?q=" + book + "&country=US";

      $.getJSON(url, function(data) {
        
        data = data.items;
        console.log(data)

        var booksArray = [];
        data.map(function(book) {

          var author = book.volumeInfo.authors[0];
          var title = book.volumeInfo.title;
          var img = book.volumeInfo.imageLinks.thumbnail;
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
       return (
       	  <div>
            <h3> My Requests </h3>
            <RequestsContainer />
            <h3> Add a New Book </h3>
            <input onChange={this.changeBook} id="book-search" name="book-search"/>
            <button onClick={this.searchBooks} className="btn btn-primary"> Search </button>
            <div className="new-books">

            {this.state.bookSearch.map(function(book) {

              return <BookContainer getBooks={component.getBooks} key={book.id} title={book.title} author={book.author} img={book.img} />


            })}
            </div> 

            <div className="my-books">
          	<h3> All My Books </h3>


             {this.state.userBooks.map(function(book) {

              return <UserBookContainer key={book.id} book={book} />


            })}

    
            
  			 </div>
        </div>



  );
      }




});
module.exports=MyBooks;