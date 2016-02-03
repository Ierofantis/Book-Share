var React = require('react');
var ReactBootstrap = require("react-bootstrap")
var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;

var MessageModal= React.createClass({


        getInitialState: function() {
    return { 
    };
    },
    
    changeTab: function(tabName) {

      if (tabName !== "Sign Out") {
          this.setState({tab: tabName});
        } 
      
    },

    render: function() {

    	var inline = {
    		display: "inline",
    	}

    	var center = {
    		textAlign: "center"
    	}

       return (
 		  <div>
        <Modal style={center} show={this.props.showMessage} >
          <Modal.Header style={center}>
            <Modal.Title style={center}>
              <img style={inline} className="title-img" src="public/img/leaflet.png"/>
              <p style={inline} className="title"> BookShare </p>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
           <p style={center}> {this.props.message} </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.hideMessage}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
        );
  
  
      }
});

module.exports=MessageModal;

