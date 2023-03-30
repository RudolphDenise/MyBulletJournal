console.log('todo.js loaded');

const initialHREF_todo = 'http://localhost:5000/todo'
const ADD_BTN = document.getElementById('todosubmit')
const NEWTASK = document.getElementById('newtask')

// GET all Todos from database and display 
//Shows if checked or not 

let showAllTodos = async function () {
    const SHOWALL_TODOS_ROUTE = '/todo/getAll'


    return await fetch(SHOWALL_TODOS_ROUTE)
        .then((resp) => resp.json())
        .then(function (data) {

            console.log(data);
            const PARENT = document.getElementById('newTodoPos')
            PARENT.innerHTML = ''
            data.forEach(element => {
                const NEW_TASK_DIV_EL = createNode('div')

                const cratedNewtask = append(PARENT, NEW_TASK_DIV_EL)
                let todoContent = element.todotask
                let todoStatusFinishedDB = element.finished
                let todoId = element._id
                let todoUnchecked = '<i class="fa-regular fa-square"></i>'
                let todoChecked = '<i class="fa-solid fa-square-check"></i>'
                let todoStatusView = todoStatusFinishedDB ? todoChecked : todoUnchecked
                let opacity50 = 'opacity-50'
                let opacityView = todoStatusFinishedDB ? opacity50 : ''
                let checkBtnColor = todoStatusFinishedDB ? 'btn-secondary' : 'btn-calm'

                const TODO_HTML =
                    `<div id="${todoId}" class="input-group ${opacityView} pb-1">
                    <div onclick="todoStatusToggle('${todoId}', ${todoStatusFinishedDB} )"  class="form-check">
                        <label class="btn ${checkBtnColor}" for="btn-check">${todoStatusView}</label> 
                    </div>
                    <label class="form-control" for="fname"> ${todoContent}</label>
                    <button  id="${todoId + '_BTN'}" onclick="deletetodo('${todoId}')" type="submit" class="input-group-text deletebtn"><i class="fa-solid fa-trash"></i></button>
                </div>`

                cratedNewtask.innerHTML = TODO_HTML

            });

        })
        .catch(function () {
            console.log('Something went wrong with showAllTodos-Fetch');
        });
}



//PATCH: Change todoStatus: checked / unchecked 

let todoStatusToggle = async function (todoId, todoStatusFinishedDB) {
    console.log('ID Toggle:', todoId, todoStatusFinishedDB)
    let toggleStatus = !todoStatusFinishedDB
    console.log('ID: todoStatusFinishedDB', todoId, toggleStatus);


    await fetch(`/todo/${todoId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                finished: `${toggleStatus}`
            }
        )
    })

    showAllTodos()
}


// DELETE one Todo-Item 

let deletetodo = async function (todoId) {
    console.log(todoId);
    await fetch(`/todo/${todoId}`, {
        method: 'DELETE',
    })
    showAllTodos()
}


// Initial function to load all todos: load only when location is right
if (document.location.href == initialHREF_todo) {
    showAllTodos()


    //POST a new Task 

    ADD_BTN.onclick = async (event) => {
        event.preventDefault()

        if (NEWTASK.value == '') {
            console.log('Bitte eine Aufgabe hinzufügen');
            NEWTASK.value = 'Bitte eine Aufgabe hinzufügen'
        }
        else {
            let newTask = { todotask: NEWTASK.value }
            console.log('You added a task', 'NEWTASK:', newTask);
            const ADD_NEW_TASK_PATH = '/todo/post'


            fetch(ADD_NEW_TASK_PATH, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
                .then((resp) => resp.json())
                .then(function (data) {
                    console.log('data.todotask:', data.todotask)
                    showAllTodos()
                })
        }
    }
}








