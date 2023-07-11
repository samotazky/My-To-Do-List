const toDoForm = document.querySelector("[data-todo-form]")
const newTaskInput = document.querySelector("[data-new-task]")
const addTaskBtn = document.querySelector("[data-add-task-btn]")
const toDoList = document.querySelector("[data-todo-list]")
const tasks = document.getElementsByClassName("tasks")

// táto podmienka zaistí že ak v LS nič nie, je vytvorí sa myToDoList ale ak sa nejaká hodnota v LS (key = tasks) nachádza vyberie ich a parsne ich 
if(localStorage.getItem("tasks") === null) {

    var myToDoList = []
}

else {
    myToDoList = JSON.parse(localStorage.getItem("tasks"))
}

// po kliknutí na tlačítko vloží na koniec myToDoList napísanú hodnotu v políčku (name = "addTask") --> prevedie na string a uloží do LS s key = "tasks" --> vyčistí políčko --> vyberie hodnotu z LS (key = "tasks") --> parsne ju --> a pripojí do ul(data-todo-list) 
toDoForm.addEventListener("submit", e => {
    e.preventDefault()
    
    myToDoList.push(e.target.elements.addTask.value)
    
    myToDoListToString()

    e.target.elements.addTask.value = ""

    let myToDoListFromLS = localStorage.getItem("tasks")
    
    let myToDoListParse = JSON.parse(myToDoListFromLS)

    let task = document.createElement("li")
    task.classList.add("tasks")
    task.textContent = myToDoListParse[myToDoListParse.length - 1]
    document.querySelector("[data-todo-list]").appendChild(task)
} )

// táto funkcia prevedie hodnoty z myToDoList na string --> uloží do LS s key = "tasks"
function myToDoListToString() {
    let myToDoListToStringify = JSON.stringify(myToDoList)
    localStorage.setItem("tasks", myToDoListToStringify)
}
// kvôli lokálnym premenným bolo nutné  zadefinovať aj globálne 
let myToDoListFromLS = localStorage.getItem("tasks")
let myToDoListParse = JSON.parse(myToDoListFromLS)

// táto podmienka zisťuje či je v LS nejaká hodnota ak nie je null (to znamená že ak sa tam niečo nachádza) urobí cyklus a vypíše všetky hodnoty z myToDoList uložených v LS (myToDoListParse) a vypíše ich
if (myToDoListFromLS !== null) {
    myToDoListParse.forEach(tasks => {
        let task = document.createElement("li")
        task.classList.add("tasks")
        task.textContent = tasks
        document.querySelector("[data-todo-list]").appendChild(task)
    })
}
else {
    alert("Local Storage je prázdny nemám čo vypísať ")
}




