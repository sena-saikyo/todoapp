const input = document.getElementById("todoInput");
const button = document.getElementById("addButton");
const list = document.getElementById("todoList");
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];
renderList();

button.addEventListener("click", () => {
    const taskText = input.value;
    if(taskText === "") return;

    // todos.push(taskText);
    todos.push({ text: taskText, done: false});
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";
    renderList();
});

function renderList(){
    list.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.done;

        checkbox.addEventListener("change", () =>{
            todo.done  = checkbox.checked;
            localStorage.setItem("todos", JSON.stringify(todos));
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(todos));
            renderList();
        });
        li.appendChild(checkbox);
        li.append(todo.text);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    });
}



