import {combineReducers} from 'redux'

const updateList = (state = {tasks:[],title:"", text:""}, action) => {
  switch (action.type) {
    case "UPDATE_LIST":
      console.log(" ********** UPDATE_LIST ******")
      console.log(action.title);
      console.log(action.text);
      var obj = {};
      obj[action.title] = action.text;
      //console.log(obj);
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
        tasks:xx
      }
      break;
    default:
      break;
  }
  return state;
}

const red = combineReducers({
  list: updateList
});

export default red;
