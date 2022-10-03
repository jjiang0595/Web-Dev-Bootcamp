let todos = []
let command = prompt("What would you like to do?")
let todo = ""
let index = 0

while (command != "quit") {
    if (command === "new") {
        todo = prompt("Enter new todo");
        todos.push(todo);
        console.log(`${todo} added to list`);
    } else if (command === "list") {
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
    } else if (command === "delete") {
        index = parseInt(prompt("Enter index of todo to delete"));
        if (!Number.isNaN(index) && todos.length !== 0 && 1 <= index < todos.length) {
            todos.splice(index, 1);
            console.log("Todo Removed");
        } else {
            console.log("Unknown Index");
        }
    }
    console.log("************");
    command = prompt("What would you like to do?");
}
console.log("OK, YOU QUIT THE APP");
