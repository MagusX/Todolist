import React, { Component } from "react";
import { Button, Form, Modal, ButtonGroup } from "react-bootstrap";

export default class VertModal extends Component {
  render() {
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.submit}>
          <Form.Control type="text" onChange={this.props.change} value={this.props.new} required />
          <div>
          <ButtonGroup className="float-right">
          <Button variant="secondary" style={{backgroundColor: "rgb(40,40,40)", border: "1px orange"}} className="mt-2" onClick={this.props.onHide}>Close</Button>
          <Button variant="primary" style={{backgroundColor: "#f36523", border: "1px black"}} className="mt-2 ml-1" type="submit" onClick={this.props.onHide}>
            Save
          </Button>
          </ButtonGroup>
          </div>
          </Form>      
        </Modal.Body>      
      </Modal>
    );
  }
}