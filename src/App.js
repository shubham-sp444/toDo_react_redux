import React, { Component } from 'react'
import './App.css';
import {connect} from 'react-redux'
import {addToDo, deleteTaskList} from './action'
import ReactDOM from 'react-dom';

export class App extends Component {
  constructor(props) {
    super(props);
    this.currentText = '';
    this.currentTitle = '';
  }

  deleteTask(index) {
    console.log("*********  TASK DELETION ********");

    this.props.dispatch(deleteTaskList(index));
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
    //console.log("***************",this.currentTitle,);
    console.log(this.currentText);
    console.log("button Clicked AFTER");
    this.props.dispatch(addToDo(this.currentTitle, this.currentText));

    // for emptying the value in input text
    ReactDOM.findDOMNode(this.refs.title).value = "";
    ReactDOM.findDOMNode(this.refs.text).value = "";
    //this.currentText = this.props.ll.title;
    //this.currentTitle = this.props.ll.text;
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
                  <div  >
                    <ul key={index} className = "list">
                      <li key={index} onClick = {this.displayTask.bind(this, data[kk[0]], kk[0])}> {kk} </li>
                    </ul>
                    <text onClick = {this.deleteTask.bind(this, index)}>X</text>
                  </div>
                );
              })}
            </div>
            <div className = 'right'>
              <div>
                <textarea className = "textbox"
                  type="search"
                  ref = "title"
                  onChange={(event) => {this.currentTitle = event.target.value}}
                />
                <textarea className = "textbox"
                  type="search"
                  ref = "text"
                  onChange={(event) => {this.currentText = event.target.value;}}
                />
              </div>
                <button className = "button" onClick = {this.addTask.bind(this)}>Add Task</button>
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
