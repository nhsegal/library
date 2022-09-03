let myLibrary = [];

const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".addBook");
const closeButton = document.querySelector(".close-button");
const submitBtn = document.querySelector("#modal-submit");
const deck = document.querySelector("#deck");
const bookForm = document.querySelector("#bookForm");
let test = new Book('Lord of the Rings', 'J.R.R. Tolkien', 255, "Finished");


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
  // do stuff here
}

function addBookThruModal(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.querySelector('input[name="read"]:checked').value;
    book = new Book(title, author, pages, read);
    addBookToLibrary(book);
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
        author.textContent = "by "+book.author;
        
        const pages = document.createElement("div");
        pages.classList.add('pages');
        pages.textContent = book.pages + " pages";

        const read = document.createElement("div");
        pages.classList.add('read');
        read.textContent = book.read;
    
        const card = document.createElement("div");
        card.classList.add('card');
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        document.querySelector('#deck').appendChild(card);  
    }
}







function toggleModal() {
    modal.classList.toggle("show-modal");
}

bookForm.addEventListener("submit", addBookThruModal);

addBookBtn.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);



addBookToLibrary(test);
displayBooks();