(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//var appUrl = window.location.origin;

var ajaxFunctions = {
   ready: function ready(fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   },
   ajaxRequest: function ajaxRequest(method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
};

module.exports = ajaxFunctions;

},{}],2:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");
var PublicBookContainer = require("./PublicBookContainer.js");
var MessageModal = require("./MessageModal.js");

var AllBooks = React.createClass({
  displayName: "AllBooks",

  getInitialState: function getInitialState() {
    return {
      allBooks: this.props.books,
      showModal: false,
      userMessage: ""
    };
  },

  componentDidMount: function componentDidMount() {
    this.getAllBooks();
  },

  showMessage: function showMessage() {
    this.setState({ showModal: true });
  },

  hideMessage: function hideMessage() {
    this.setState({ showModal: false });
  },

  createMessage: function createMessage(message) {
    var component = this;
    this.setState({ userMessage: message }, function () {
      component.showMessage();
    });
  },

  getAllBooks: function getAllBooks() {
    var component = this;
    var apiUrl = "/api/allbooks";

    //GET ALL BOOKS FROM SERVER
    ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {

      data = JSON.parse(data);
      component.setState({ allBooks: data });
    });
  },

  render: function render() {
    var component = this;

    return React.createElement(
      "div",
      { className: "content-container container-fluid" },
      React.createElement(
        "div",
        { className: "key" },
        React.createElement(
          "div",
          { className: "line line-available" },
          " "
        ),
        " ",
        React.createElement(
          "p",
          null,
          " Available "
        )
      ),
      React.createElement(
        "div",
        { className: "key" },
        React.createElement(
          "div",
          { className: "line line-taken" },
          " "
        ),
        " ",
        React.createElement(
          "p",
          null,
          " Reserved "
        )
      ),
      React.createElement(
        "h4",
        { className: "instructions" },
        " Click on an available book to reserve it "
      ),
      this.state.allBooks.map(function (book) {

        return React.createElement(PublicBookContainer, { createMessage: component.createMessage, key: book.userID + "/" + book.title, getAllBooks: component.getAllBooks, book: book });
      }),
      React.createElement(MessageModal, { showMessage: this.state.showModal, hideMessage: this.hideMessage, message: this.state.userMessage })
    );
  }

});
module.exports = AllBooks;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./MessageModal.js":8,"./PublicBookContainer.js":12}],3:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var BookContainer = React.createClass({
        displayName: "BookContainer",

        addBook: function addBook() {
                var component = this;
                var title = this.props.title;
                var img = this.props.img;
                var author = this.props.author;

                //GET IMAGE ID
                var regex = /id=(.*?)\&/;
                var matched = regex.exec(img);
                var imgID = matched[1];

                var apiUrl = "/api/addbook/" + title + "/" + author + "/" + imgID;
                ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
                        component.props.createMessage(data);
                        component.props.getBooks();
                });

                this.props.clearBooks();
        },

        render: function render() {

                var divStyle = { cursor: "pointer" };

                return React.createElement(
                        "div",
                        { className: "book-container col-md-2 col-sm-4 col-xs-6" },
                        React.createElement("img", { style: divStyle, key: this.props.img, onClick: this.addBook, src: this.props.img })
                );
        }

});
module.exports = BookContainer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],4:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var AllBooks = require("./AllBooks.js");
var MyBooks = require("./MyBooks.js");
var Profile = require("./Profile.js");
var RequestsContainer = require("./RequestsContainer.js");

var ContentContainer = React.createClass({
            displayName: "ContentContainer",

            getInitialState: function getInitialState() {
                        return {};
            },

            render: function render() {

                        return React.createElement(
                                    "div",
                                    { className: "content-container" },
                                    React.createElement(
                                                "h1",
                                                null,
                                                " ",
                                                this.props.tab,
                                                " "
                                    ),
                                    this.props.tab === "My Books" ? React.createElement(MyBooks, null) : null,
                                    this.props.tab === "Browse All Books" ? React.createElement(AllBooks, { books: this.props.books }) : null,
                                    this.props.tab === "Profile" ? React.createElement(Profile, null) : null,
                                    this.props.tab === "Book Requests" ? React.createElement(RequestsContainer, null) : null
                        );
            }

});
module.exports = ContentContainer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./AllBooks.js":2,"./MyBooks.js":9,"./Profile.js":11,"./RequestsContainer.js":13}],5:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var HeaderButtons = require("./HeaderButtons.js");
var ContentContainer = require("./ContentContainer.js");

var Header = React.createClass({
  displayName: "Header",

  getInitialState: function getInitialState() {
    return {
      tab: "Browse All Books"
    };
  },

  changeTab: function changeTab(tabName) {
    if (tabName !== "Sign Out") {
      this.setState({ tab: tabName });
    }
  },

  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { id: "rct-header", className: "header" },
        React.createElement(
          "div",
          { id: "title-bundle" },
          React.createElement("img", { id: "rct-title-img", className: "title-img", src: "public/img/leaflet.png" }),
          React.createElement(
            "p",
            { id: "rct-title", className: "title" },
            " ",
            this.props.title,
            " "
          )
        ),
        React.createElement(
          "div",
          { id: "button-bundle" },
          React.createElement(HeaderButtons, { changeTab: this.changeTab, links: ["Sign Out", "Profile", "My Books", "Book Requests", "Browse All Books"] })
        )
      ),
      React.createElement(ContentContainer, { books: this.props.books, tab: this.state.tab })
    );
  }
});

module.exports = Header;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ContentContainer.js":4,"./HeaderButtons.js":7}],6:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var HeaderButton = React.createClass({
    displayName: "HeaderButton",

    getInitialState: function getInitialState() {
        return {};
    },

    changeTab: function changeTab() {

        this.props.changeTab(this.props.name);
    },

    render: function render() {

        return React.createElement(
            "button",
            { onClick: this.changeTab, id: "rct-btn", className: "btn-header  btn btn-primary" },
            " ",
            React.createElement(
                "a",
                { href: this.props.href },
                this.props.name,
                " "
            )
        );
    }
});
module.exports = HeaderButton;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var HeaderButton = require("./HeaderButton.js");

var HeaderButtons = React.createClass({
  displayName: "HeaderButtons",

  getInitialState: function getInitialState() {
    return {};
  },

  changeTab: function changeTab(tabName) {
    this.props.changeTab(tabName);
  },

  render: function render() {

    var component = this;
    return React.createElement(
      "div",
      null,
      this.props.links.map(function (link) {
        var href = "#";
        if (link === "Sign Out") {
          href = "/logout";
        }

        return React.createElement(HeaderButton, { changeTab: component.changeTab, href: href, key: link, name: link });
      })
    );
  }
});

module.exports = HeaderButtons;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./HeaderButton.js":6}],8:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var MessageModal = React.createClass({
  displayName: "MessageModal",

  getInitialState: function getInitialState() {
    return {};
  },

  changeTab: function changeTab(tabName) {

    if (tabName !== "Sign Out") {
      this.setState({ tab: tabName });
    }
  },

  render: function render() {

    var inline = {
      display: "inline"
    };

    var center = {
      textAlign: "center"
    };

    return React.createElement(
      "div",
      null,
      React.createElement(
        Modal,
        { style: center, show: this.props.showMessage },
        React.createElement(
          Modal.Header,
          { style: center },
          React.createElement(
            Modal.Title,
            { style: center },
            React.createElement("img", { style: inline, className: "title-img", src: "public/img/leaflet.png" }),
            React.createElement(
              "p",
              { style: inline, className: "title" },
              " BookShare "
            )
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(
            "p",
            { style: center },
            " ",
            this.props.message,
            " "
          )
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { onClick: this.props.hideMessage },
            "Close"
          )
        )
      )
    );
  }
});

module.exports = MessageModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],9:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ReactBootstrap = (typeof window !== "undefined" ? window['ReactBootstrap'] : typeof global !== "undefined" ? global['ReactBootstrap'] : null);
var BookContainer = require("./BookContainer.js");
var ajaxFunctions = require("../common/ajax-functions.js");
var UserBookContainer = require("./UserBookContainer.js");
var MessageModal = require("./MessageModal.js");
var RequestsContainer = require("./RequestsContainer.js");

var MyBooks = React.createClass({
    displayName: "MyBooks",

    getInitialState: function getInitialState() {
        return {
            bookSearch: [],
            userBooks: [],
            showModal: false,
            userMessage: ""

        };
    },

    componentDidMount: function componentDidMount() {
        this.getBooks();
    },

    showMessage: function showMessage() {
        this.setState({ showModal: true });
    },

    hideMessage: function hideMessage() {
        this.setState({ showModal: false });
    },

    createMessage: function createMessage(message) {
        var component = this;
        this.setState({ userMessage: message }, function () {
            component.showMessage();
        });
    },

    getBooks: function getBooks() {
        var component = this;
        var url = "/api/userBooks";

        ajaxFunctions.ajaxRequest('GET', url, function (data) {
            data = JSON.parse(data);
            component.setState({ userBooks: data.books });
        });
    },

    clearBooks: function clearBooks() {
        this.setState({ bookSearch: [] }, console.log("clearBooks being called"));
    },

    changeBook: function changeBook(e) {
        this.setState({ book: e.target.value });
    },

    sendData: function sendData(e) {
        var component = this;
        if (e.key === 'Enter') {
            component.searchBooks();
        }
    },

    searchBooks: function searchBooks() {

        var component = this;

        var book = this.state.book;
        var key = "AIzaSyDaJ0Om_qljos4jHfb2nzTQeYCnsiR90vs";
        var url = "https://www.googleapis.com/books/v1/volumes?q=" + encodeURI(book) + "&country=US";

        $.getJSON(url, function (data) {
            console.log(data);
            if (data.items === undefined) {
                component.createMessage("No book found with that title. Try being more specific.");
            }
            data = data.items;

            var booksArray = [];
            data.map(function (book) {

                var author = book.volumeInfo.authors ? book.volumeInfo.authors[0] : "No author found";
                var img = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "No thumbnail found";

                var title = book.volumeInfo.title;
                var id = book.id;
                var bookObj = {};

                bookObj.author = author;
                bookObj.title = title;
                bookObj.img = img;
                bookObj.id = id;
                booksArray.push(bookObj);
            });

            component.setState({ bookSearch: booksArray });
        });
    },

    render: function render() {

        var component = this;
        var btnStyle = { marginLeft: "5px" };
        var inputStyle = { margin: "0px auto" };

        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "input-box" },
                React.createElement(
                    "h3",
                    null,
                    " Add a New Book "
                ),
                React.createElement("input", { onKeyPress: this.sendData, onChange: this.changeBook, id: "book-search", name: "book-search" }),
                React.createElement(
                    "button",
                    { onClick: this.searchBooks, className: "btn btn-primary" },
                    " Search "
                )
            ),
            React.createElement(
                "div",
                { className: "new-books container-fluid" },
                this.state.bookSearch.map(function (book) {

                    return React.createElement(BookContainer, { createMessage: component.createMessage, clearBooks: component.clearBooks, getBooks: component.getBooks, key: book.id, title: book.title, author: book.author, img: book.img });
                })
            ),
            React.createElement(
                "div",
                { className: "my-books container-fluid" },
                React.createElement(
                    "h3",
                    null,
                    " All My Books "
                ),
                this.state.userBooks.map(function (book) {

                    return React.createElement(UserBookContainer, { key: book.id, book: book });
                }),
                React.createElement(MessageModal, { showMessage: this.state.showModal, hideMessage: this.hideMessage, message: this.state.userMessage })
            )
        );
    }

});
module.exports = MyBooks;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./BookContainer.js":3,"./MessageModal.js":8,"./RequestsContainer.js":13,"./UserBookContainer.js":17}],10:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var SingleMyRequest = require("./SingleMyRequest.js");

var MyRequests = React.createClass({
  displayName: "MyRequests",

  render: function render() {

    return React.createElement(
      "div",
      { className: "col-md-6 my-requests" },
      React.createElement(
        "h3",
        null,
        " Requests I Have Made "
      ),
      this.props.requests.map(function (book) {

        return React.createElement(SingleMyRequest, { book: book });
      })
    );
  }

});
module.exports = MyRequests;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./SingleMyRequest.js":15}],11:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");
var Profile = React.createClass({
  displayName: "Profile",

  getInitialState: function getInitialState() {
    return {
      city: "",
      state: "",
      name: "",
      message: ""
    };
  },

  componentDidMount: function componentDidMount() {
    this.getDetails();
  },

  getDetails: function getDetails() {
    var component = this;
    var apiUrl = "/api/userdata";
    ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
      console.log(data);
      data = JSON.parse(data);
      component.setState({ name: data.name, city: data.city, country: data.country }, function () {
        console.log(component.state);
      });
    });
  },

  addNewPass: function addNewPass(e) {

    this.setState({ newPass: e.target.value }, console.log(this.state.newPass));
  },

  addNewPassConfirmed: function addNewPassConfirmed(e) {

    this.setState({ newPassConfirmed: e.target.value }, function () {

      if (this.state.newPassConfirmed !== this.state.newPass) {
        this.setState({ message: "New passwords do not match." });
      } else {
        this.setState({ message: "" });
      }
    });
  },

  sendUserData: function sendUserData(e) {

    e.preventDefault();
    var component = this;
    $.ajax({
      contentType: 'application/json',
      data: JSON.stringify({ "city": this.state.newCountry, "country": this.state.newCity, "fullName": this.state.newName }),
      dataType: 'json',
      success: function success(data) {
        component.getDetails();
      },
      error: function error() {
        console.log("It failed");
      },
      processData: false,
      type: 'POST',
      url: '/api/userinfo'
    });
  },

  setNewCountry: function setNewCountry(e) {
    this.setState({ newCountry: e.target.value });
  },

  setNewCity: function setNewCity(e) {
    this.setState({ newCity: e.target.value });
  },

  setNewName: function setNewName(e) {
    this.setState({ newName: e.target.value });
  },

  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "user-details" },
        React.createElement(
          "h4",
          null,
          " Welcome ",
          this.state.name,
          " from ",
          this.state.city,
          ", ",
          this.state.country
        ),
        React.createElement("br", null),
        React.createElement(
          "h4",
          null,
          " Add Location Details "
        ),
        React.createElement(
          "form",
          { className: "form", action: "/api/userinfo", method: "POST" },
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Name "
            ),
            React.createElement("input", { onChange: this.setNewName, className: "form-control", type: "text", placeholder: "Add your full name", name: "name" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Country "
            ),
            React.createElement("input", { onChange: this.setNewCountry, className: "form-control", type: "text", placeholder: "Add your country", name: "city" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " City "
            ),
            React.createElement("input", { onChange: this.setNewCity, className: "form-control", type: "text", placeholder: "Add your city", name: "country" })
          ),
          React.createElement(
            "button",
            { onClick: this.sendUserData, className: "btn btn-primary", type: "submit" },
            " Submit "
          )
        )
      ),
      React.createElement(
        "div",
        { className: "user-details" },
        React.createElement(
          "h4",
          null,
          " Change Password "
        ),
        React.createElement(
          "form",
          { className: "form", action: "/changepass", method: "POST" },
          React.createElement(
            "div",
            { className: "alert alert-warning" },
            " ",
            this.state.message,
            " "
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Current Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "password" })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " New Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "newpass", onChange: this.addNewPass })
          ),
          React.createElement(
            "div",
            { className: "form form-group" },
            React.createElement(
              "label",
              null,
              " Confirm New Password "
            ),
            React.createElement("input", { className: "form-control", type: "password", name: "newpassconfirmed", onChange: this.addNewPassConfirmed })
          ),
          React.createElement(
            "button",
            { className: "btn btn-primary", type: "submit" },
            " Submit "
          )
        )
      )
    );
  }

});
module.exports = Profile;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],12:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var PublicBookContainer = React.createClass({
	displayName: "PublicBookContainer",

	getInitialState: function getInitialState() {

		return {
			img: "http://books.google.com/books/content?id=" + this.props.book.imgID + "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
			title: this.props.book.title,
			author: this.props.book.author,
			requested: this.props.book.requested,
			userID: this.props.book.userID
		};
	},

	requestBook: function requestBook() {
		var component = this;
		console.log(component.state);

		if (!this.state.requested) {
			var apiUrl = "/api/requestbook/" + this.state.title + "/" + this.state.userID;
			ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
				component.props.createMessage("You requested " + component.state.title + " by " + component.state.author + ". Please check your book requests to see its status.");
				component.props.getAllBooks();
			});
		} else {
			component.props.createMessage("That book has already been requested. Please choose another book.");
		}
	},

	render: function render() {
		var pointer = "pointer";
		var color = "#338CD2";
		if (this.props.book.requested) {
			color = "#D7280B";
			pointer = "";
		}
		var divStyle = {
			border: '5px solid',
			borderColor: color,
			cursor: pointer
		};

		return React.createElement(
			"div",
			{ onClick: this.requestBook, "data-content": "Text added on hover", className: "book-container col-md-2 col-sm-4 col-xs-6" },
			React.createElement("img", { style: divStyle, src: this.state.img })
		);
	}

});
module.exports = PublicBookContainer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],13:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");
var MyRequests = require("./MyRequests.js");
var RequestsForMe = require("./RequestsForMe.js");

var RequestsContainer = React.createClass({
      displayName: "RequestsContainer",

      getInitialState: function getInitialState() {

            return {
                  myRequests: [],
                  requestsForMe: []
            };
      },

      componentDidMount: function componentDidMount() {
            this.getRequests();
      },

      getRequests: function getRequests() {
            var component = this;
            var apiUrl = "/api/getrequests";

            ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
                  data = JSON.parse(data);

                  component.setState({ myRequests: data.myRequests, requestsForMe: data.requestsForMe });
            });
      },

      render: function render() {

            return React.createElement(
                  "div",
                  { className: "container-fluid" },
                  React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(MyRequests, { requests: this.state.myRequests }),
                        React.createElement(RequestsForMe, { requests: this.state.requestsForMe })
                  )
            );
      }

});
module.exports = RequestsContainer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./MyRequests.js":10,"./RequestsForMe.js":14}],14:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");
var SingleRequestForMe = require("./SingleRequestForMe.js");

var RequestsForMe = React.createClass({
  displayName: "RequestsForMe",

  render: function render() {

    return React.createElement(
      "div",
      { className: "col-md-6 requests-for-me" },
      React.createElement(
        "h3",
        null,
        " Requests For My Books "
      ),
      this.props.requests.map(function (book) {

        return React.createElement(SingleRequestForMe, { book: book });
      })
    );
  }

});
module.exports = RequestsForMe;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1,"./SingleRequestForMe.js":16}],15:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var SingleMyRequest = React.createClass({
  displayName: "SingleMyRequest",

  getInitialState: function getInitialState() {
    return { status: "Not Accepted", divClass: "alert alert-warning" };
  },

  componentDidMount: function componentDidMount() {

    if (this.props.book.confirmed === true) {
      this.setState({ status: "Accepted", divClass: "alert alert-success" });
    }
  },

  render: function render() {

    var date = this.props.book.date.substring(0, 10);

    var divStyle = {
      padding: "10px",
      margin: "3px auto",
      width: "80%"
    };

    return React.createElement(
      "div",
      { style: divStyle, className: this.state.divClass },
      " ",
      React.createElement(
        "p",
        null,
        " ",
        this.props.book.book,
        " "
      ),
      React.createElement(
        "p",
        { className: "pull-right" },
        " ",
        this.state.status,
        " "
      ),
      React.createElement(
        "h5",
        null,
        " Owner: ",
        this.props.book.ownerName,
        " Requested: ",
        date,
        " "
      )
    );
  }

});
module.exports = SingleMyRequest;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],16:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var SingleRequestForMe = React.createClass({
  displayName: "SingleRequestForMe",

  getInitialState: function getInitialState() {
    if (this.props.book.confirmed === true) {
      return { status: "Accepted" };
    } else return { status: "Not Accepted" };
  },

  changeStatus: function changeStatus() {
    var newState = "Accepted";
    var action = true;
    if (this.state.status === "Accepted") {
      newState = "Not Accepted";
      action = false;
    }

    this.setState({ status: newState });

    var component = this;
    var apiUrl = "/api/acceptrequest/" + this.props.book.title + "/" + action + "/" + this.props.book.requestedBy;
    ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {});
  },

  render: function render() {
    console.log(this.props);
    var component = this;
    var divStyle = {
      padding: "10px",
      margin: "3px auto",
      width: "80%"
    };

    var toggleStyle = {
      fontSize: "40px",
      marginRight: "10px",
      lineHeight: "22px"
    };

    var status = "alert alert-warning";
    var toggleClass = "fa fa-toggle-off pull-right";

    if (this.state.status === "Accepted") {
      status = "alert alert-success";
      toggleClass = "fa fa-toggle-on pull-right";
    }

    var date = this.props.book.requestedOn.substring(0, 10);

    return React.createElement(
      "div",
      { style: divStyle, className: status },
      React.createElement(
        "h5",
        null,
        " ",
        this.props.book.title,
        " "
      ),
      React.createElement(
        "i",
        { onClick: component.changeStatus, style: toggleStyle, className: toggleClass },
        " "
      ),
      React.createElement(
        "p",
        { className: "pull-right" },
        " ",
        component.state.status,
        " "
      ),
      React.createElement(
        "h5",
        null,
        " Requested By: ",
        this.props.book.requestedByName,
        " ",
        date,
        " "
      )
    );
  }

});
module.exports = SingleRequestForMe;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],17:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var ajaxFunctions = require("../common/ajax-functions.js");

var UserBookContainer = React.createClass({
  displayName: "UserBookContainer",

  getInitialState: function getInitialState() {

    return {
      img: "http://books.google.com/books/content?id=" + this.props.book.imgID + "&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      title: this.props.book.title,
      author: this.props.book.author,
      requested: this.props.book.requested

    };
  },

  render: function render() {
    var color = "#338CD2";
    if (this.props.book.requested) {
      color = "#D7280B";
    }
    var divStyle = {
      border: '5px solid',
      borderColor: color
    };

    var imgStyle = {
      backgroundColor: color
    };

    return React.createElement(
      "div",
      { className: "book-container col-md-2 col-sm-4 col-xs-6" },
      React.createElement("img", { style: divStyle, src: this.state.img })
    );
  }

});
module.exports = UserBookContainer;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../common/ajax-functions.js":1}],18:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var Header = require("./Header.js");
var ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

//GET PROPS
var props = JSON.parse(document.getElementById("props").innerHTML);

//RENDER CONTAINER
ReactDOM.render(React.createElement(Header, { books: props, title: "BookShare" }), document.getElementById("react-holder"));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./Header.js":5}]},{},[2,3,9,11,12,17,18,5,6,7,4,13]);
