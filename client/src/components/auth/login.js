import React, { Component } from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: ""
    };
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  onChange = e => {
    this.setState({
      pass: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    axios.post('/login', {
      password: this.state.pass
    }, {headers: this.headers})
    .then(res => {
      if (res.status === 200) {
        this.props.history.push('/');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(err => {
      console.error(err);
      alert('Access denied');
    });
  }

  componentDidMount() {
    axios.get('/login')
    .then(res => {
      this.setState({msg: res.data.text});
    })
    .catch(err => console.log(err));
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
            <Button className="login-btn" block style={{backgroundColor: "#f36523"}} type="submit" id="button">
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