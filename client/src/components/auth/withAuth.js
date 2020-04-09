import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    deleteCookie = name => {
      document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  
    logOff = () => {
      this.deleteCookie('token');
      window.location.reload();
    }

    authState = () => {
      if (document.cookie.length === 0) {
        return null;
      } else {
        return <Button style={{backgroundColor: "rgba(40,40,40,0.2)", borderRadius: 0, borderColor: "rgba(40,40,40,0.2)"}} 
        id='off' onClick={this.logOff}>Log Out</Button>
      }
    }

    componentDidMount() {
      axios.get('/checkToken')
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <div>
        <ComponentToProtect {...this.props} />;
        {this.authState()}
        </div>
      );
    }
  }
}