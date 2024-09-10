const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addBtn = document.getElementById("add-btn");
const cancelBtn = document.getElementById("cancel-btn");
let editingItem = null;

function addTask() {
  if (inputBox.value === "") {
    alert("Harus diisi!");
    return;
  }

  if (editingItem) {
    updateTask();
  } else {
    createNewTask();
  }

  inputBox.value = "";
  saveData();
}

function createNewTask() {
  let li = document.createElement("li");
  li.innerHTML = inputBox.value;
  listContainer.appendChild(li);

  let editSpan = document.createElement("span");
  editSpan.innerHTML = "&#9998;"; // Pencil icon
  editSpan.className = "edit-btn";
  li.appendChild(editSpan);

  let deleteSpan = document.createElement("span");
  deleteSpan.innerHTML = "\u00d7"; // Cross icon
  deleteSpan.className = "delete-btn";
  li.appendChild(deleteSpan);
}

function updateTask() {
  editingItem.firstChild.textContent = inputBox.value;
  editingItem = null;
  addBtn.textContent = "Tambahkan";
  cancelBtn.style.display = "none";
}

function editTask(li) {
  editingItem = li;
  inputBox.value = li.firstChild.textContent;
  addBtn.textContent = "Perbarui";
  cancelBtn.style.display = "inline-block";
}

function cancelEdit() {
  editingItem = null;
  inputBox.value = "";
  addBtn.textContent = "Tambahkan";
  cancelBtn.style.display = "none";
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.className === "delete-btn") {
      e.target.parentElement.remove();
      saveData();
    } else if (e.target.className === "edit-btn") {
      editTask(e.target.parentElement);
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
  listContainer.innerHTML = localStorage.getItem("data");
}

showTasks();
