import React, { Component } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import { Button, Container, ButtonToolbar } from "react-bootstrap";
import  VertModal from "../components/modal";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalShow: false,
      list: [],
      newList: ""
    };
  }

  onChangeList(e) {
    this.setState({
      newList: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("Submitted");
    axios.post("/home/lemmein", {
      name: this.state.newList,
      items: []
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
    this.setState({newList: ""});

    axios.get("/home/lemmein")
    .then(res => {
      const index = res.data.length - 1;
      return this.setState(state => ({list: [...state.list, {
        key: res.data[index]._id,
        name: res.data[index].name,
        items: []
      }]}));
    })
    .catch(err => console.log(err));
  }

  componentDidMount() {
    axios.get("/home/lemmein")
    .then(res => {
      res.data.map(listItem => {
        let objArray = [];
        listItem.items.forEach(item => {
          objArray.push(item);
        });
        return this.setState(state => ({list: [...state.list, {
            key: listItem._id,
            name: listItem.name,
            items: [...objArray]
          }]}));
      });
    })
    .catch(err => console.log(err));
  }

  listList = () => {
    return this.state.list.map(listname => {
      let count = 0;
      if (listname) {
        listname.items.forEach(item => {
          if (item.done) count++;
        });
        return (
          <button className="home-btn btn-group btn-block mt-0 mb-3 p-0 border-0" role="group">
            <Link to={`/list/${listname.key}`} className="homes btn p-0 border-0">{listname.name}<div>{count}/{listname.items.length}</div></Link>
          </button>
        )
      } else return null;
    });
  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });
    return (
      <Container>
      <h2 className="text-center mb-4 mt-2"><i className="fa fa-rocket fa-lg fa-spin"></i><div>MY TODOS</div></h2>
      {this.listList()}
      <ButtonToolbar>
        <Button
          className="btn btn-primary btn-block mdl"
          style={{backgroundColor: "#f36523"}} 
          onClick={() => this.setState({ modalShow: true })}
        ><i className="fa fa-plus fa-lg"></i></Button>

        <VertModal
          change={e => this.onChangeList(e)}
          new={this.state.newList}
          submit={e => this.onSubmit(e)}
          show={this.state.modalShow}
          onHide={modalClose}
          title={"List Name"}
        />
      </ButtonToolbar>
      </Container>
    );
  }
}