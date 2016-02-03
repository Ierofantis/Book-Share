
var React = require('react');
var ajaxFunctions = require("../common/ajax-functions.js")
var Profile = React.createClass({

    getInitialState: function() {
    return { 
      city: "",
      state: "",
      name: "",
      message: ""
    };
    },

    componentDidMount: function() {
      this.getDetails()
    },

    getDetails: function() {
      var component = this;
          var apiUrl = "/api/userdata"
        ajaxFunctions.ajaxRequest('GET', apiUrl, function(data) {
          console.log(data)
          data = JSON.parse(data)
          component.setState({name: data.name, city: data.city, country: data.country}, function() {
            console.log(component.state)
          })
        })
    },

    addNewPass: function(e) {

      this.setState({newPass: e.target.value}, console.log(this.state.newPass))

    },

        addNewPassConfirmed: function(e) {

      this.setState({newPassConfirmed: e.target.value}, function() {

      if (this.state.newPassConfirmed !== this.state.newPass) {
        this.setState({message: "New passwords do not match."})
      }
      else {
        this.setState({message: ""})
      }
      });


      
    },

    sendUserData: function(e) {

      e.preventDefault();
      var component = this;
      $.ajax({
          contentType: 'application/json',
          data: JSON.stringify({ "city": this.state.newCountry, "country": this.state.newCity, "fullName": this.state.newName }),
          dataType: 'json',
          success: function(data){
              component.getDetails();
          },
          error: function(){
              console.log("It failed")
          },
          processData: false,
          type: 'POST',
          url: '/api/userinfo'
      });

    },

    setNewCountry: function(e) {
      this.setState({newCountry: e.target.value})

    },

    setNewCity: function(e) {
      this.setState({newCity: e.target.value})
    },

    setNewName: function(e) {
      this.setState({newName: e.target.value})
    },

    render: function() {

       return (
       	  <div>
            <div className="user-details"> 
              <h4> Welcome {this.state.name} from {this.state.city}, {this.state.country}</h4>
              <br/>
              <h4> Add Location Details </h4>

              <form className="form" action="/api/userinfo" method="POST">

                <div className="form form-group">
                  <label> Name </label>
                  <input onChange={this.setNewName} className="form-control" type="text" placeholder="Add your full name" name="name" />
                </div>

                <div className="form form-group">
                  <label> Country </label>
                  <input onChange={this.setNewCountry} className="form-control" type="text" placeholder="Add your country" name="city" />
                </div>

                <div className="form form-group">
                  <label> City </label>
                  <input onChange={this.setNewCity} className="form-control" type="text" placeholder="Add your city" name="country"/>
                </div> 

                <button onClick={this.sendUserData} className="btn btn-primary" type="submit"> Submit </button>
              </form>
            </div>


          <div className="user-details">
          <h4> Change Password </h4> 
            <form className="form" action="/changepass" method="POST">
              <div className="alert alert-warning"> {this.state.message} </div>

              <div className="form form-group">
                <label> Current Password </label>
                <input className="form-control" type="password" name="password" />
              </div>

              <div className="form form-group">
                <label> New Password </label>
                <input className="form-control" type="password" name="newpass" onChange={this.addNewPass}/>
              </div> 

              <div className="form form-group">
                <label> Confirm New Password </label>
                <input className="form-control" type="password"  name="newpassconfirmed" onChange={this.addNewPassConfirmed}/>
              </div> 

              <button className="btn btn-primary" type="submit"> Submit </button>
            </form>
          </div>


  			</div>
  );
     }  




});
module.exports=Profile