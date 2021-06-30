//get form data
var submitButton = document.getElementById("submit");
var landmark = "";
var vacayLocation = "";
var url = "";
var description = "";

submitButton.onclick = function(event) {
    getDataFromForm();
    if (landmark == "" || vacayLocation == "") {
        clearForm();
        return;
    }
    insertNewCard();
    clearForm();
    return false;
}

async function getUnsplash() {
    const API_URL="https://api.unsplash.com/search/photos?client_id=7sfLhno4PMuu5dMh5fpuIPAxz3LoO96Y1H1mSIaROWs&page=1&query=" + landmark + " " + vacayLocation;
    var index = Math.floor(Math.random()*10);
    let tmpURL;
    await fetch(API_URL)
    .then(response => response.json())
    .then(function(data) {tmpURL = data.results[index].urls.thumb}).catch(err => console.log(err));
    return tmpURL;
}

function clearForm() {
    document.getElementById("submission").reset();
}

function getDataFromForm() {
    landmark         = document.getElementById("landmark").value;
    vacayLocation    = document.getElementById("location").value;
    if((temp = document.getElementById("details")) != "") {
        description = temp.value;
    }
}

async function insertNewCard() {
    var url = await getUnsplash();
    var text = `
    <img class="card-img-top" src="${url}" alt="Card image cap">
    <div class="card-body">
        <h5 class="card-title">${landmark}</h5>
        <p class="card-text"><span style="text-decoration: bold">${vacayLocation}</span><br />
        ${description}</p>
        <div class="text-center"><a href="#" id="editBtn" class="btn btn-secondary mx-2">Edit</a><a href="#" id="deleteBtn" class="btn btn-secondary">Delete</a></div>
    </div>
    `;
    var div = document.createElement('div');
    div.setAttribute('class', 'card');
    div.setAttribute('style', 'max-width: 33%; display: inline-block;');
    div.innerHTML = text;
    document.getElementById("content").appendChild(div);
    
    div.addEventListener('click', function(event) {
        if (event.target.getAttribute('id') == "deleteBtn") {
            event.currentTarget.parentElement.removeChild(div);
        } 
        if (event.target.getAttribute('id') == "editBtn") {
            var modal = document.getElementById("edit-modal");
            var btn = document.getElementById("landmark-edit");
            var span = document.getElementsByClassName("close-btn")[0];
            modal.style.display = "block";

            span.onclick=function() {
                modal.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
        }
    });
}

 

