// find the element
const todoform=document.querySelector(".todo-form");
const todoInput=document.querySelector("#input-todo");
const todolists=document.getElementById("lists");
const messageElement=document.getElementById("message");

// showMessage
const showMessage=(text,status)=>{
    messageElement.textContent=text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent="";
        messageElement.classList.remove(`bg-${status}`);

    }, 1000);
}

// createTodo
const createTodo=(todoId,todoValue)=>{
    const todoElement=document.createElement("li");
    todoElement.id=todoId;
    todoElement.classList.add("li-style")
    todoElement.innerHTML = `
    <span> ${todoValue} </span>
    <span> <button class="btn" id="deleteButton">
    <i class="fa-solid fa-trash"></i></button></span>
    `;
    todolists.appendChild(todoElement);
    const deleteBtn=todoElement.querySelector("#deleteButton")
    deleteBtn.addEventListener("click",deleteTodo);

};
// delete Todo`
const deleteTodo=(event)=>{
  const  selectedTodo= event.target.parentElement.parentElement.parentElement;
  todolists.removeChild(selectedTodo);
  showMessage("Todo is deleted","Danger")
    
}
// gettodo
 const getTodo=()=>{
  return  localStorage.getItem("mytodos")?JSON.
    parse(localStorage.getItem("mytodos")):[];

}

// add todo
const addTodo=(event)=>{
    event.preventDefault();
    const todoValue=todoInput.value;

    // unique id
    const todoId=Date.now().toString();
    console.log(todoId);
    
 createTodo(todoId,todoValue);
    showMessage("Todo is Added","success");

    
   // adding todo to local stoarge
    const todos= getTodo();
    todos.push({todoId,todoValue})
    localStorage.setItem("mytodos",JSON.stringify(todos));
    todoInput.value="";
};

// loadtodos
const loadtodos=()=>{
const todos=getTodo();
todos.map((todo)=>createTodo(todo.todoId,todo.todoValue))
    
};

// adding listeners
todoform.addEventListener("submit",addTodo);
window.addEventListener("DOMContentLoaded",loadtodos)
