import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: ""
    }
  }

  check = () => {
    if (this.state.pass !== "lemmein") return "/";
    else return "/home/lemmein";
  }

  onChange = e => {
    this.setState({
      pass: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    if (this.state.pass !== "lemmein") window.location.reload();
    this.setState({
      pass: ""
    });
  }

  render() {
    return (
      <div className="li-form">
        <Card style={{ width: '25rem', margin: "auto", marginTop: "5%", marginBottom: "5px" }}>
          <Card.Body>
            <Form onSubmit={this.onSubmit}>
            <Form.Group>
              <Form.Label>Passcode</Form.Label>
              <Form.Control type="password" onChange={this.onChange} value={this.state.pass}/>
            </Form.Group>
            <Button className="login-btn" block href={this.check()} style={{backgroundColor: "#f36523"}} type="submit" id="button">
              Enter
            </Button>
            </Form>
          </Card.Body>
        </Card>   
      </div>   
    )
  }
}

export default Login;