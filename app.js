console.log("This is Magic Notes");
showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addtitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    // console.log(notes)

    if (notes == null) {  // if notes is null then create a array. Notes is the key and the array will be our value
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    console.log(addtitle.value);
    console.log(addTxt.value);
    let myObj = {
        title:addtitle.value,
        content:addTxt.value
    }
    // notesObj.push(addTxt.value); //here we aere storing array of strings
    notesObj.push(myObj); // now we are storing array of objects/dictionary
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
})

function showNotes() {  //it will show case all the notes present in localStorage
    let notes = localStorage.getItem("notes");
    if (notes == null) {  // if notes is null then create a array. Notes is the key and the array will be our value
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="noteCard mx-2 my-2 card" style="width: 18rem;">
       <div class="card-body">
           <h5 class="card-title">${element.title}</h5>
           <p class="card-text">${element.content}</p>
           <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete Note</button>   
       </div>
   </div>`
    });

    let noteElement = document.getElementById("notes");
    if (notesObj.length != 0) {
        noteElement.innerHTML = html;
    }
    else{
        noteElement.innerHTML = "<b>Nothing to show!! add some notes..</b>"
    }

}

function deleteNode(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {  // if notes is null then create a array. Notes is the key and the array will be our value
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    // console.log(search.value);
    let inputValue = search.value.toLowerCase();  // here we will fetch the search text
    let noteClasses = document.getElementsByClassName("noteCard");
    Array.from(noteClasses).forEach(function (element) {
       let cardTxt = element.getElementsByTagName("p")[0].innerText;  //fetching note text
       console.log(cardTxt)
       if (cardTxt.includes(inputValue)){
            element.style.display = "block";
       }
       else{
            element.style.display = "none";
            
       }
    })
    
})
