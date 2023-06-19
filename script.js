console.log(`Welcome to Magic Notes`);
shownotes();
//if the user press the add note btn send it to the local storage
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  let notes = localStorage.getItem("notes");
  //getting the item from the local storage
  if (notes == null) {
    notesObj = [];
    //notes agr kuch bhi nai hua to ek khali object rahega
  } else {
    notesObj = JSON.parse(notes);
    //agar khali nai hua toh JSON.parse se koi bhi string jo ke server se mil raha hai usko javascript object mai convert kar do
  }
  notesObj.push(addTxt.value);
  //We push the data of addTxt in noteObj
  notes = localStorage.setItem("notes", JSON.stringify(notesObj));
  //we are updating the local storage and making it ready to take another note as we are setting and adding another value while converting it into a string using JSON.stringyfy(notesObj)
  addTxt.value = "";
  //we are clearing the addTxt so that we can add another note there
  console.log(notesObj);
  shownotes();
});

//Now lets add the notes from the local storage to the div container with id "notes"
function shownotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  // html+= means html= html + "anything"
  notesObj.forEach(function (element, index) {
    html += `
<div class="noteCard mx-3 my-2 card" style="width: 18rem;">
      
<div class="card-body">
  <h5 class="card-title">Note${index + 1}</h5>
  <p class="card-text">${element}</p>
  <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary" >Delete Note</button>
</div>
</div>
`;
  });
  let noteElem = document.getElementById("notes");
  if (notesObj.length != 0) {
    noteElem.innerHTML = html;
  } else {
    noteElem.innerHTML = "No notes available!";
  }
}

//function to delete note
function deletenote(index) {
  console.log("I am deleting", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  //splice function deletes the whole string with the index from the noteObj javascript object
  localStorage.setItem("notes", JSON.stringify(notesObj));
  shownotes();
}
//for searching an a element
let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    // notecard ke andar har element ka p ko lenee k liye 
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
