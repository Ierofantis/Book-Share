'use strict';

var Users = require('../models/users.js');

var bodyParser = require('body-parser');

var bcrypt   = require('bcrypt-nodejs');

function BookHandler () {

	this.getBooks = function(req, res) {


		//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

		Users.findOne(query, { books: 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
				});
	},

	this.addBook = function(req, res) {
			var title = req.params.book;
			var author = req.params.author;
			var img = req.params.img;

			console.log(title)
			console.log(author)
			console.log(img)

			var ownerName = req.user.local.username || req.user.facebook.name

			var bookObj = {}

			bookObj.title = title;
			bookObj.author = author;
			bookObj.imgID = img;
			bookObj.requested = false;
			bookObj.confirmed = false;
			bookObj.requestedBy = "no-one yet";
			bookObj.ownerName = ownerName;
			console.log(bookObj)

			var bool = true;

			//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

			Users.findOne(query, { books: 1, _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
					console.log(result)
					
					result.books.map(function(book) {
						if (book.title === title) {
							bool= false;
							res.send("You've already added this book!")
						}

					})
					
					//IF NOT ALREADY IN OWNERS COLLECTIONS
					if (bool) {
			Users
			.findOneAndUpdate(query, { $push: { books: bookObj } }, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					
		

					res.send("Nice! You added " + title + " by " + author + ".");
					
					});//END OF QUERY2 

}




				});

			


	},

	this.getAllBooks = function(req, res) {

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



					res.json(booksArray);
				});

	},

	this.addUserInfo = function(req, res) {

		var country = req.body.country;
		var city = req.body.city;
		var fullName = req.body.fullName
		console.log(fullName)

		//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}
		
		Users
			.findOneAndUpdate(query, { $set: { country: country, city: city, fullName: fullName } }, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					
					var user = {};
					user.city = result.city;
					user.country = result.country;
					user.fullName = result.fullName
					

					res.json(user);
					
					});
	
	},

	this.requestBook = function(req, res) {

			console.log(req.params)
			

			
		var bookName = req.params.bookname;
		var ownerID = req.params.owner;
		var userID = req.user.id;

		var ownerName = req.user.local.username || req.user.facebook.name;
		var date = new Date();

		var requestObj = {};
		requestObj.book = bookName;
		requestObj.date = date;
		requestObj.confirmed = false;
		requestObj.ownerID = ownerID;
		

		var requesterName;
		var ownerName;
		//ADD TO REQUESTER DOCUMENT
		Users.findOne({'_id': ownerID}, {_id: 0})
			.exec(function (err, result) {
					if (err) { throw err; }
					console.log(result)
					ownerName = result.facebook.name || result.local.username;
					requestObj.ownerName = ownerName;


		Users
			.findOneAndUpdate({'_id': userID}, {$push : {requests: requestObj} }, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					requesterName = result.local.username || result.facebook.name;



		//ADD TO OWNER DOCUMENT
		Users
			.findOneAndUpdate({'_id': ownerID, "books.title": bookName}, {$set : {"books.$.requested" : true, "books.$.requestedBy": userID, "books.$.requestedByName": requesterName, "books.$.requestedOn": date} }, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					
					res.json(result);
					
					});


					});




			});
		




	},

	this.getRequests = function(req, res) {

		//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

		Users.findOne(query, { _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }

					var myRequests = result.requests;
					var requestsForMe = [];

					result.books.map(function(book) {
						if (book.requested === true) {
							requestsForMe.push(book)
						}

					})


					var requestsObj = {};
					requestsObj.myRequests = myRequests;
					requestsObj.requestsForMe = requestsForMe;

					console.log(requestsObj)


					res.json(requestsObj);
				});
	}

	this.acceptRequest = function(req, res) {
		console.log(req.params)
		var title = req.params.book;
		var action = true;
		var ownerID = req.params.ownerID
		if (req.params.action === "false") {
			action = false;
		}


		//CUSTOM QUERY BASED ON FACEBOOK OR LOCAL LOGIN
			var query = {"facebook.id": req.user.facebook.id, "books.title": title};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username, "books.title": title};
			}

		Users
			.findOneAndUpdate(query, {$set : {"books.$.confirmed" : action}}, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					});

		Users
			.findOneAndUpdate({'_id': ownerID, "requests.book": title}, {$set : {"requests.$.confirmed" : action}}, {"new": true})
			.exec(function (err, result) {
					if (err) { throw err; }
					res.json(result);
					});


	},


	this.changePass = function(req, res, next) {
		//req.body contains currentpass, newpass and newpassconfirmed
		if (req.body.newpass !== req.body.newpassconfirmed) {
        throw new Error('password and confirm password do not match');
     }

     var User = req.user;

     User.local.password = req.body.newpass;
     
     //PASSPORT SHOULD RECOGNISE THAT PASSWORD IS CHANGED AND HASH IT BEFORE SAVING....
     User.save(function(err, result){
         if (err) { next(err) }
         else {
             res.json(result)
         }
     });

	},


	this.getUserDetails = function(req, res) {

		var query = {"facebook.id": req.user.facebook.id};
			if (req.user.local.username) {
				query = {"local.username": req.user.local.username};
			}

		Users.findOne(query, { _id: 0 })
			.exec(function (err, result) {
					if (err) { throw err; }
				var name = result.fullName || result.local.username || result.facebook.name;
				var country = result.city;
				var city = result.country;

				var user = {}
				user.name = name;
				user.city = city;
				user.country = country;

				res.json(user)
			});


		}


}

module.exports=BookHandler;