import React, { Component } from "react";
import axios from "axios";
import { Button, Container, ButtonToolbar, ListGroup, Form, Breadcrumb, Row } from "react-bootstrap";
import  VertModal from "../components/modal";
import "font-awesome/css/font-awesome.min.css";

/*
axios.delete delete based on params not body
sent by url layer
*/

export default class List extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      key: this.props.match.params.id,
      curList: "",
      modalShow: false,
      items: [],
      newItem: "",
    }
  }

  onChangeItem(e) {
    this.setState({
      newItem: e.target.value
    });
  }

  onSubmitCB = e => {
    const target = e.target;
    axios.put(`/list/${this.state.key}`, {
      itemId: target.id
    }).then(console.log("Submit: " + target.id));
  }

  onSubmitRM = e => {
    let curId = e.target.id;
    axios.delete(`/list/${curId}`).then(res => {console.log("Deleted: " + curId); console.log("Item:\n" + res)});
    this.setState(state => ({items: state.items.filter((item) => (item.key !== curId))}));
  }

  sleep = (ms) => {
    return new Promise(resolve=>{
      setTimeout(resolve,ms)
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
    axios.post(`/list/${this.state.key}`, {
      task: this.state.newItem,
      done: false
    })
    .then(res => console.log(res.data))
    .then(this.setState({newItem: ""}))
    .catch(err => console.log(err));

    await this.sleep(1000);

    axios.get(`/list/${this.state.key}`)
    .then(res => {
      const index = res.data.items.length - 1;
        this.setState({newItem: ""});
        return this.setState(state => ({items: [...state.items, {
          key: res.data.items[index]._id,
          task: res.data.items[index].task,
          done: false
      }]}));
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    axios.get(`/list/${this.state.key}`)
    .then(res => {
      this.setState({curList: res.data.name});
      res.data.items.map(item => {
        return this.setState(state => ({items: [...state.items, {
            key: item._id,
            task: item.task,
            done: item.done
          }
        ]}));
      })
    })
    .catch(err => console.log(err));
  }

  itemList = () => {
    return this.state.items.map(item => {
      console.log(item);
      return (
        <ListGroup.Item className="i-l">
          <Form className="i-l" >
            <Row>
            { item.done ? (
              <Form.Check custom className="m-2" type="checkbox" id={item.key} label={item.task} onClick={this.onSubmitCB} defaultChecked/> 
            ) : (
              <Form.Check custom className="m-2" type="checkbox" id={item.key} label={item.task} onClick={this.onSubmitCB}/> 
            )}

            <Button variant="danger" type="button" className="ml-auto" id={item.key} style={{backgroundColor: "rgb(40,40,40)", color: "rgb(246,246,246)", border:"0",  borderRadius:"0%"}} onClick={this.onSubmitRM}><i id={item.key} className="fa fa-trash fa-md"></i></Button>
            </Row>
          </Form>
        </ListGroup.Item>
      )
    })
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <Container>
        <Breadcrumb>
        <Breadcrumb.Item style={{color: "#f36523"}} href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item style={{color: "white"}} active>{this.state.curList}</Breadcrumb.Item>
        </Breadcrumb>
        <h2 style={{textAlign: "center"}}>{this.state.curList}</h2>
        <ListGroup className="mb-3 l-g">
        {this.itemList()}
        </ListGroup>
        <ButtonToolbar>
          <Button
            className="btn btn-primary btn-block mdl"
            style={{backgroundColor: "#f36523"}}
            onClick={() => this.setState({ modalShow: true })}
          ><i className="fa fa-plus fa-lg"></i></Button>

          <VertModal
            change={(e) => this.onChangeItem(e)}
            new={this.state.newItem}
            submit={(e) => this.onSubmit(e)}
            show={this.state.modalShow}
            onHide={modalClose}
            title={"Item Name"}
          />
        </ButtonToolbar>
      </Container>
    );
  }
}