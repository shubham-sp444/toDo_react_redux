export function addToDo(title, text) {
  return {
    type: "UPDATE_LIST",
    title: title,
    text: text
  }
}

export function deleteTaskList(index) {
  return {
    type: "DELETE_TASK_LIST",
    index: index
  }
}
