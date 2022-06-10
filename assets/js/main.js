const taskInput = document.querySelector(".task__input input");
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear__button"),
taskBox = document.querySelector(".task__box");
enterBtn = document.querySelector(".input__button");
todoCount = document.querySelector(".count");


// DARK MODE
const darkmode = document.querySelector('.dark__toggle'),body = document.querySelector('.page');

darkmode.onclick = () => {
    body.classList.toggle("dark");
}

enterBtn.addEventListener("click", () => {
    let userTask = taskInput.value.trim();
    taskInput.value = "";
    let taskInfo = {name: userTask, status: "pending"};
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
});


let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);

    });
});


function showTodo(filter) {
    let li = "";
    if(todos){
        todos.forEach((todo, id) => {
            let isCompleted = todo.status == "completed" ? "checked" : "";
            if (filter == todo.status || filter == "all"){
                li += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}></input>
                                <p class="${isCompleted}">${todo.name}</p>
                            </label>
                            <i onclick="deleteTask(${id})" class='bx bx-x'></i>
                        </li>`;
            }
        });
    }
    taskBox.innerHTML = li;
    todoCount.innerHTML = todos.length;
}
showTodo("all");

function deleteTask(deleteId) {
    todos.splice(deleteId, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener('click', () => {
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
})


function updateStatus(selectedTask){
    let taskName = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    }
    else {
        taskName.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
    
}

taskInput.addEventListener("keyup", e => {

    let userTask = taskInput.value.trim();
    if(e.key == "Enter" && userTask){
        if(!todos) {
            todos = [];
        }
        let taskInfo = {name: userTask, status: "pending"};
        todos.push(taskInfo);
        localStorage.setItem("todo-list", JSON.stringify(todos));
        showTodo("all");
        taskInput.value = "";
    }
});


new Sortable (taskBox, {
    animation: 150,
    ghostClass: 'blue-background-class'
});
