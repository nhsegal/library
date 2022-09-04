let myLibrary = [];

const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".addBook");
const closeModalButton = document.querySelector(".close-modal-button");
const submitBtn = document.querySelector("#modal-submit");
const deck = document.querySelector("#deck");
const bookForm = document.querySelector("#bookForm");


let test = new Book('Lord of the Rings', 'J.R.R. Tolkien', 1178, "Finished");
let test2 = new Book('The Hobbit', 'J.R.R. Tolkien', 310, "Started");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages. I ${this.read} it.`
}



function addBookToLibrary(book) {
    myLibrary.push(book);
}

function addBookThruModal(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked').value;
    book = new Book(title, author, pages, read);
    addBookToLibrary(book);
    toggleModal();
    displayBooks();
}

function displayBooks(){
    while (deck.firstChild) {
        deck.removeChild(deck.lastChild);
      }

    for (book of myLibrary) {
        const title = document.createElement("div");
        title.classList.add('title');
        title.textContent = book.title;

        const author = document.createElement("div");
        author.classList.add('author');
        author.textContent = "by " + book.author;
        
        const pages = document.createElement("div");
        pages.classList.add('pages');
        pages.textContent = book.pages + " pages";

        const readOptions = document.createElement("div");
        readOptions.classList.add('read-options');

        const list = document.createElement("ul");
        const li1 = document.createElement("li");
        const radioOption1 = document.createElement('input');
        radioOption1.classList.add('radio');
        radioOption1.type = 'radio';

        // Appending the book index to the radio id and radio name
        // groups the buttons by card and gives each label a unique id

        radioOption1.id = 'no ' + myLibrary.indexOf(book);
        radioOption1.name = 'read ' + myLibrary.indexOf(book);
        radioOption1.value = 'Not started';
        radioOption1.onclick = changeStatus;
        
      
        const label1 = document.createElement('label');
        label1.htmlFor = 'no ' + myLibrary.indexOf(book);
        label1.textContent = " Not yet started";
        if (book.read == 'Not started') {
            radioOption1.checked = true;
        }

        const li2 = document.createElement("li");
        const radioOption2 = document.createElement('input');
        radioOption2.classList.add('radio');
        radioOption2.type = 'radio';
        radioOption2.id = 'started '+ myLibrary.indexOf(book);
        radioOption2.name ='read '+ myLibrary.indexOf(book);
        radioOption2.value = 'Started';
        radioOption2.onclick = changeStatus;
     
        const label2 = document.createElement('label');
        label2.htmlFor = 'started '+ myLibrary.indexOf(book);
        label2.textContent = " Started";
        if (book.read == 'Started') {
            radioOption2.checked = true;
        }


        const li3 = document.createElement("li");
        const radioOption3 = document.createElement('input');
        radioOption3.classList.add('radio');
        radioOption3.type = 'radio';
        radioOption3.id = 'finished '+ myLibrary.indexOf(book);
        radioOption3.name = 'read '+ myLibrary.indexOf(book);
        radioOption3.value = 'Finished';
        radioOption3.onclick = changeStatus;
        
        const label3 = document.createElement('label');
        label3.htmlFor = 'finished '+ myLibrary.indexOf(book);
        label3.textContent = "  Finished";
        if (book.read == 'Finished') {
            radioOption3.checked = true;
        }

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = removeBook;
  
        li1.append(radioOption1);
        li1.append(label1);
        li2.append(radioOption2);
        li2.append(label2);
        li3.append(radioOption3);
        li3.append(label3)
        list.append(li1);
        list.append(li2);
        list.append(li3);
        readOptions.append(list);

        const card = document.createElement("div");
        card.classList.add('card');
        card.setAttribute("data-id", myLibrary.indexOf(book));
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readOptions);
        card.appendChild(removeBtn);
       

        document.querySelector('#deck').appendChild(card);  
    }
}



function changeStatus(e){
    let optionsList = e.target.parentElement.parentElement.childNodes;
    for (option of optionsList) {
        let thisTitle = option.parentElement.parentElement.parentElement.firstChild.textContent;
        if (option.firstChild.checked) {
            let thisBook = myLibrary.find(o => o.title === thisTitle);
            thisBook.read = option.firstChild.value;
            console.log(thisBook.read);
        }
    }
}
    
function removeBook(e){

    let titleToRemove = e.target.parentElement.firstChild.textContent;
    let cardToRemove = e.target.parentElement;
   
    let idToRemove = e.target.parentElement.getAttribute('data-id');
    
    let deleteFunc = function () {
        console.log('here')
        myLibrary.splice(idToRemove, 1);
        displayBooks();
    }
    
    cardToRemove.style.transform = "scale(.01)";
    cardToRemove.addEventListener('transitionend', deleteFunc, false);
    
}

function toggleModal() {
    let title = document.getElementById('title');
    title.value = '';
    let author = document.getElementById('author');
    author.value = '';
    let pages = document.getElementById('pages');
    pages.value = '';
    let no = document.getElementById('no');
    no.checked = false;
    let reading = document.getElementById('reading');
    reading.checked = false;
    let yes = document.getElementById('yes');
    yes.checked = false;
    modal.classList.toggle("show-modal");
}

bookForm.addEventListener("submit", addBookThruModal);
addBookBtn.addEventListener("click", toggleModal);
closeModalButton.addEventListener("click", toggleModal);

addBookToLibrary(test);
addBookToLibrary(test2);
displayBooks();