

const input = document.getElementById("text");
const submitBtn = document.getElementById("submit");
const taskList = document.querySelector(".task__list");
const doneList = document.querySelector(".done__list");
const taskTitle = document.querySelector(".task__title"); // task title element
const doneTitle = document.querySelector(".done__title"); // done title element

// LocalStorage'dan tasklarni oldik yoki bo'sh massiv boshladik
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Task va Done sanash funksiyalari
function updateTaskCount() {
  const taskCount = taskList.children.length; // task listdagi elementlar soni
  taskTitle.innerText = `Tasks to do - ${taskCount}`;
}

function updateDoneCount() {
  const doneCount = doneList.children.length; // done listdagi elementlar soni
  doneTitle.innerText = `Done - ${doneCount}`;
}

// LocalStorage'dan olingan tasklarni domga yuklaymiz
tasks.forEach((value) => {
  const newElement = createElementForTask(value);
  taskList.appendChild(newElement);
});
updateTaskCount();

// Submit tugmasiga event qo'shdik
submitBtn.addEventListener("click", () => {
  const value = input.value.trim();
  
  if (value) {
    const newElement = createElementForTask(value);
    taskList.appendChild(newElement);
    tasks.push(value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
  }
  
  updateTaskCount();
});

// Taskni delete qilish funksiyasi
function deleteItem(e) {
  const pressedBtn = e.target;
  const item = pressedBtn.closest("li").querySelector("p").innerText;

  tasks = tasks.filter((el) => el !== item);
  pressedBtn.closest("li").remove();
  localStorage.setItem("tasks", JSON.stringify(tasks));

  updateTaskCount();
}

// Taskni done ro'yxatiga ko'chirish funksiyasi
function moveItem(e) {
  const pressedBtn = e.target;
  const value = pressedBtn.closest("li").querySelector("p").innerText;

  pressedBtn.closest("li").remove();
  const newEl = document.createElement("li");
  newEl.classList.add("strike");
  newEl.innerText = value;
  doneList.appendChild(newEl);

  updateTaskCount();
  updateDoneCount();
}

// Task uchun yangi li element yaratish funksiyasi
function createElementForTask(value) {
  const newElement = document.createElement("li");
  newElement.classList.add("task__item");

  newElement.innerHTML = `
    <p>${value}</p>
    <div class="task__controller">
      <button class="btn__todo" onclick="moveItem(event)">
        <img src="./images/Check.svg" alt="">
      </button>
      <button class="btn__todo" onclick="deleteItem(event)">
        <img src="./images/delete.svg" alt="" srcset="" />
      </button>
    </div>
  `;
  
  return newElement;
}

// Boshlang'ich qiymat uchun task va done sanog'ini yangilash
updateTaskCount();
updateDoneCount();
