import React, { Component } from 'react'
import './App.css';
import {connect} from 'react-redux'
import {addToDo, deleteTaskList, updateButtonName, updateTaskList, updateCookieList} from './action'
import ReactDOM from 'react-dom';
import { Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
//import Cookies from 'universal-cookie';

export class App extends Component {
  constructor(props) {
    super(props);
    this.currentText = '';
    this.currentTitle = '';
    this.updateIndex = 0;
  }

  // for deletion of tasks in the list and updating the cookies
  deleteTask(index, txt, title) {
    //console.log("*********  TASK DELETION ********");

    this.props.dispatch(deleteTaskList(index));

    this.props.dispatch(updateCookieList());

    ReactDOM.findDOMNode(this.refs.title).value = "";
    ReactDOM.findDOMNode(this.refs.text).value = "";

  }


// changes the name of button name to update task when task Clicked
  displayTask(txt, title, index) {
    ReactDOM.findDOMNode(this.refs.title).value = title;
    ReactDOM.findDOMNode(this.refs.text).value = txt;
    this.currentText = txt;
    this.currentTitle = title;
    this.updateIndex = index;

    //this.taskType = "Update Task";
    this.props.dispatch(updateButtonName());

  }

  // for updating the task and cookie list
  updateTask() {
    if (this.currentTitle.length > 0 && this.currentText.length > 0) {
        this.props.dispatch(updateTaskList(this.currentTitle, this.currentText, this.updateIndex));

        this.props.dispatch(updateCookieList());
    }
    else {
        alert("please fill both title and task fields");
    }
  }

  // if btn name is update task then calls 'update task' to update otherwise 'addToDo' to add tasks
  addTask(event) {
    if (this.props.ll.btn === "Create New Task") {
        if (this.currentTitle.length > 0 && this.currentText.length > 0) {
          this.props.dispatch(addToDo(this.currentTitle, this.currentText));

          //to update cookies
          this.props.dispatch(updateCookieList());
        }
        else {
          alert("please fille both title and task fields");
        }
    }
    else {
      this.updateTask();
    }

    // for emptying the value in input text
    ReactDOM.findDOMNode(this.refs.title).value = "";
    ReactDOM.findDOMNode(this.refs.text).value = "";
    this.currentText = "";
    this.currentTitle = "";
  }

    render() {
      console.log();
        return (
          <div className="container">
            <div className = 'left'>
              {this.props.ll.tasks.map((data, index) => {
                var kk = Object.keys(data);
                //console.log(" KEYyyyyyyyy", kk[0]);
                return(
                <div key = {index}>
                  <ListGroup className = "list">
                    <ListGroupItem className = "listData" bsStyle="success" key={index} onClick = {this.displayTask.bind(this, data[kk[0]], kk[0], index)}> {kk} </ListGroupItem>
                    <Button className = "cancel" bsStyle="danger" bsSize="small" onClick = {this.deleteTask.bind(this, index, data[kk[0]], kk[0])}>X</Button>
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
                <Button bsStyle="primary" className ="button" onClick = {this.addTask.bind(this)}>{this.props.ll.btn}</Button>
            </div>
          </div>
        );
  }
}

//console.log(state);
//console.log(store.getState());
const mapStatetoProps = (state) => {return {
    ll: state.list
  }};

const mapDispatchtoProps = (dispatch) => ({
    dispatch: dispatch
});

export default connect(mapStatetoProps, mapDispatchtoProps)(App);
