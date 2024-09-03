const inputbox = document.getElementById("inpu-box");
const listcontainer = document.getElementById("list-container");

function addtask(){
    if(inputbox.value === ''){
        alert("harus di isi!!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // KODE SILANG
        li.appendChild(span);
    }
    inputbox.value = "";
    saveData()
}

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName ==="LI"){
        e.target.classList.toggle("check");
        saveData()
    } else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
},false);

function saveData(){
    localStorage.setItem("data",listcontainer.innerHTML);
}
function showtaks(){
    listcontainer.innerHTML = localStorage.getItem("data");
}
showtaks();