import {combineReducers} from 'redux'
import Cookies from 'universal-cookie';

var cookie = new Cookies();

const updateList = (state = {tasks:cookie.get("ToDO"),title:"", text:"", btn:"Create New Task"}, action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      var obj = {};
      obj[action.title] = action.text;
      var arr = [];
      arr.push(obj);

      state = {
        ...state,
        tasks: state.tasks.concat(arr),
        title:"",
        text:""
      }
      break;
    case "DELETE_TASK_LIST":
      var xx = state.tasks;
      xx.splice(action.index, 1);

      state = {
        ...state,
        tasks:xx,
        btn:"Create New Task"
      }
      break;
    case "UPDATE_BUTTON_NAME":
      state = {
        ...state,
        btn:"Update Task"
      }
      break;
    case "UPDATE_TASK":
      var xx = state.tasks;
      xx.splice(action.index, 1);

      var obj = {};
      obj[action.title] = action.text;
      xx.push(obj);

      state = {
        ...state,
        btn:"Create New Task",
        tasks:xx
      }
      break;
    case "UPDATE_COOKIE_LIST":
      let myCookie = cookie.get('ToDO');

      if (myCookie === null) {
        let arr = state.tasks;
        cookie.set('ToDO', arr);
      }
      else {
        cookie.remove('ToDO');
        let arr = state.tasks;
        cookie.set('ToDO', arr);
      }
      state = {
        ...state
      }
      break;
    default:
      break;
  }
  //console.log("REDUCER RETURNED");
  return state;
}

const red = combineReducers({
  list: updateList
});

export default red;
