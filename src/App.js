import React, { Component } from 'react'
import './App.css';
import {connect} from 'react-redux'
import {addToDo, deleteTaskList} from './action'
import ReactDOM from 'react-dom';
import { Button, Panel, form, FormGroup, ControlLabel, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

export class App extends Component {
  constructor(props) {
    super(props);
    this.currentText = '';
    this.currentTitle = '';
  }

  deleteTask(index, txt, title) {
    console.log("*********  TASK DELETION ********");

    this.props.dispatch(deleteTaskList(index));

    if (ReactDOM.findDOMNode(this.refs.title).value = title) {
      ReactDOM.findDOMNode(this.refs.title).value = "";
      ReactDOM.findDOMNode(this.refs.text).value = "";
    }
  }

  displayTask(txt, title) {
    console.log("********* displayTask ********");
    //this.props.dispatch(displayTaskList(false, txt, title));
    //this.cK = title;
    ReactDOM.findDOMNode(this.refs.title).value = title;
    ReactDOM.findDOMNode(this.refs.text).value = txt;
  }

  addTask(event) {
    console.log("button Clicked");
    console.log("***************",this.currentTitle.length,);
    console.log(this.currentText.length);
    console.log("button Clicked AFTER");
    if (this.currentTitle.length > 0 && this.currentText.length > 0) {
      this.props.dispatch(addToDo(this.currentTitle, this.currentText));
    }
    else {
      alert("please fille both title and task fields");
    }

    // for emptying the value in input text
    ReactDOM.findDOMNode(this.refs.title).value = "";
    ReactDOM.findDOMNode(this.refs.text).value = "";
    this.currentText = "";
    this.currentTitle = "";
  }

  //console.log(" DISPLAY SCREEN", this.props.ll.display);
  //if (this.props.ll.display) {
    render() {
      console.log(" RENDER START");
      console.log(this.props.ll.tasks);
      console.log(" DISPLAY SCREEN", this.props.ll.display);
      console.log("RENDER END");
        return (
          <div className="container">
            <div className = 'left'>
              {this.props.ll.tasks.map((data, index) => {
                var kk = Object.keys(data);
                //console.log(" KEYyyyyyyyy", kk[0]);
                return(
                <div key = {index}>
                  <ListGroup className = "list">
                    <ListGroupItem className = "listData" bsStyle="success" key={index} onClick = {this.displayTask.bind(this, data[kk[0]], kk[0])}> {kk} </ListGroupItem>
                    <Button bsStyle="danger" bsSize="small" onClick = {this.deleteTask.bind(this, index, data[kk[0]], kk[0])}>X</Button>
                  </ListGroup>
              </div>
                );
              })}
            </div>
            <div className = 'right'>
              <div>
                <Panel header="title" bsStyle="warning" className = "box">
                  <textarea className = "textboxtitle"
                    type="search"
                    ref = "title"
                    onChange={(event) => {this.currentTitle = event.target.value}}
                  />
                </Panel>
                <Panel header="tasks" bsStyle="info" className = "box">
                  <textarea className = "textbox"
                    type="search"
                    ref = "text"
                    onChange={(event) => {this.currentText = event.target.value;}}
                  />
              </Panel>
              </div>
                <Button bsStyle="primary" className ="button" onClick = {this.addTask.bind(this)}>Add Task</Button>
            </div>
          </div>
        );
  }
}
//}

const mapStatetoProps = (state) => ({
    ll: state.list
  });

const mapDispatchtoProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
