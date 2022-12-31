import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.querySelector("#new-task-list");
const input = document.querySelector("#new-task-title");
const tasks = loadTasks();
tasks.forEach((task) => {
  addListItem(task);
});
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = input.value;
  if (title === "" || title === null)
    return;
  const id = uuidV4();
  const newTask = {
    id,
    title,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  saveTasks();
  addListItem(newTask);
  input.value = "";
});
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
  return true;
}
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
  let taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  return JSON.parse(taskJSON);
}
