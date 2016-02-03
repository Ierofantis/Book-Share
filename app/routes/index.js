'use strict';

var path = process.cwd();
var passport = require('passport');

var BookHandler = require("../controllers/bookHandler.js")

//REACT
var React = require('react');
var ReactDOM = require("react-dom")
var ReactDOMServer = require("react-dom/server")
var ReactBootstrap = require("react-bootstrap")

//USER SCHEMA	
var Users = require('../models/users.js');
	
//MAIN OBJECT CONSTRUCTOR

module.exports = function (app, passport) {

	var bookHandler = new BookHandler();

	//////////////////////////////						
	//AUTHENTICATION STRATEGIES///
	//////////////////////////////

	// route middleware to make sure a user is logged in
	function isLoggedIn(req, res, next) {

	    // if user is authenticated in the session, carry on 
	    if (req.isAuthenticated())
	        return next();

	    // if they aren't redirect them to the home page
	    res.redirect('/login');
	}

	//FBOOK LOGIN
	app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/',
            failureRedirect : '/login'
        }));


	//LOCAL
   

    app.post('/signup', 
    	passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
     // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //////////////////////////////						
	//PAGE RENDERS////////////////
	//////////////////////////////


	//API////////////////
	app.route('/login')
		.get(function (req, res) {
			res.render('index', { signupMessage: req.flash("signupMessage"), loginMessage: req.flash("loginMessage") }); 
		});

	app.route('/')
		.get(isLoggedIn, function (req, res) {
			//IMPORT MODULE AND CREATE COMPONENT
			var Header = React.createFactory(require("../components/Header.js"));	
			//GET ALL BOOKS

			Users.find({}, { books: 1, _id: 1, })
			.exec(function (err, result) {
					if (err) { throw err; }
					var booksArray = [];
            		result.map(function(userData) {
              		var id = userData._id;
              		var books = userData.books;

                	books.map(function(book) {
                    book.userID = id;
                    booksArray.push(book)
                	})
                

            		})
            		//RENDER DASHBOARD WITH ALLBOOKS FOR FAST LOADING
					var markup = ReactDOMServer.renderToString(Header({books: booksArray, title: "BookShare"}));
					res.render("dashboard", {markup: markup, props: JSON.stringify(booksArray)});
				});
			
		});



	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});


	//////////////////////////////						
	//////BOOK API HANDLERS///////
	//////////////////////////////	

	//ADD BOOKS 
	app.route('/api/addbook/:book/:author/:img(*)') 
		.get(bookHandler.addBook)

	//GET USER BOOKS
	app.route('/api/userBooks') 
		.get(bookHandler.getBooks)

	//GET ALL BOOKS
	app.route("/api/allbooks")	
		.get(bookHandler.getAllBooks)

	//REQUEST A BOOK
	app.route("/api/requestbook/:bookname/:owner")
		.get(bookHandler.requestBook)

	//GET BOOK REQUESTS 
	app.route("/api/getrequests")
		.get(bookHandler.getRequests)

	//ACCEPT A REQUEST 
	app.route("/api/acceptrequest/:book/:action/:ownerID")
		.get(bookHandler.acceptRequest)


	//////////////////////////////						
	//////USER DETAIL CHANGES/////
	//////////////////////////////	


		//ADD CITY AND STATE
	app.route("/api/userinfo")
		.post(bookHandler.addUserInfo)

		//CHANGE PASSWORD
	app.route("/changepass")
		.post(bookHandler.changePass)

		//GET USER DETAILS
	app.route("/api/userdata")
		.get(bookHandler.getUserDetails)
};