'use strict';


var React = require('react');
var Header = require("./Header.js")
var ReactDOM = require("react-dom")

//GET PROPS
var props = JSON.parse(document.getElementById("props").innerHTML)



//RENDER CONTAINER
ReactDOM.render(<Header books={props} title={"BookShare"} />, document.getElementById("react-holder"));
