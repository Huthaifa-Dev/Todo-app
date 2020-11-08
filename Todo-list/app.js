// JavaScript Document
/*jshint esversion: 6 */

//selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector(".todo-button");
const todoList = document.querySelector('.todo-list');
const filterOpt = document.querySelector('.filter-todo');

//Events
document.addEventListener("DOMContentLoaded", getTodos);
todoBtn.addEventListener('click', addTodo);
filterOpt.addEventListener('click', filter);

//functions

function addTodo(e) {
    e.preventDefault();

    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    let newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;

    newTodo.classList.add('item');
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);

    let buttons = document.createElement('div');
    buttons.classList.add('btns-section');


    let newDel = document.createElement('button');
    newDel.classList.add('remove');
    newDel.addEventListener('click', function () {
        todoDiv.classList.add('fall');
        todoDiv.addEventListener('transitionend', function () {
            todoList.removeChild(todoDiv);
        });
        removeLocalTodos(newTodo.innerText);
    });
    buttons.appendChild(newDel);

    let newChecked = document.createElement('button');
    newChecked.classList.add('checked');
    newChecked.addEventListener('click', function () {
        todoDiv.classList.toggle('cleared');
    });
    buttons.appendChild(newChecked);

    todoDiv.appendChild(buttons);

    todoList.appendChild(todoDiv);
    todoInput.value = '';
}

function filter(e) {
    const todos = todoList.childNodes;
    for (let i = 1; i < todos.length; i++) {
        console.log(todos[i].classList);
        let list = todos[i].classList;
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (list.contains("cleared")) {
                    todos[i].style.display = "flex";

                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (!list.contains("cleared")) {
                    todos[i].style.display = "flex";

                } else {
                    todos[i].style.display = "none";
                }
                break;
        }
    }

}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        let newTodo = document.createElement('li');
        newTodo.innerText = todo;
        todoInput.value = '';
        newTodo.classList.add('item');
        todoDiv.appendChild(newTodo);


        let buttons = document.createElement('div');
        buttons.classList.add('btns-section');


        let newDel = document.createElement('button');
        newDel.classList.add('remove');
        newDel.addEventListener('click', function () {
            todoDiv.classList.add('fall');
            todoDiv.addEventListener('transitionend', function () {
                todoList.removeChild(todoDiv);
            });
        });
        buttons.appendChild(newDel);

        let newChecked = document.createElement('button');
        newChecked.classList.add('checked');
        newChecked.addEventListener('click', function () {
            todoDiv.classList.toggle('cleared');
        });
        buttons.appendChild(newChecked);

        todoDiv.appendChild(buttons);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.splice(todos.indexOf(todo), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}