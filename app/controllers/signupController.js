

var returnBool;
$("#overlay").hide();


$(".show-signup ").click(function() {
	console.log("triggering")
	$("#overlay").fadeIn("slow");
	
})

$(".close-signup").click(function(e) {
	e.preventDefault();
	$("#overlay").fadeOut("slow");
	$("#overlay-rendered").fadeOut("slow")
})

$('#signup-form').submit( function(ev) {
     
     if (returnBool) {
     		$(this).submit()
     }
     else {
     	ev.preventDefault();
     }
     
});

var alertBox = "<div class='alert alert-warning'><p> Your password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number </p> </div>"
var successBox = "<div class='alert alert-success'><p> Your password is strong. Continue my apprentice. </p> </div>"


function checkPassword(inputBox, messageBox) {
	returnBool = false;
$("#password").on("keyup", function() {
	var password = $(inputBox).val();

	/*
	(/^
(?=.*\d)                //should contain at least one digit
(?=.*[a-z])             //should contain at least one lower case
(?=.*[A-Z])             //should contain at least one upper case
[a-zA-Z0-9]{8,}         //should contain at least 8 from the mentioned characters
$/)
*/

var regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/

	var test = password.match(regex)
	if (test) {
		$(messageBox).html(successBox)
		returnBool = true;
	}
	else {
		$(messageBox).html(alertBox)
	}
	return returnBool;
	
})



}

checkPassword("#password", "#password-message")