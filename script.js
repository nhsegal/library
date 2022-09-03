let myLibrary = [];

const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".addBook");
const closeButton = document.querySelector(".close-button");
const submitBtn = document.querySelector("#modal-submit");
const deck = document.querySelector("#deck");
const bookForm = document.querySelector("#bookForm");
//const radioButtons = document.querySelectorAll('input');

//radioButtons.addEventListener(onchange, )

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

Book.prototype.changeStatus = function(status) {
    this.read = status;
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
        author.textContent = "by "+book.author;
        
        const pages = document.createElement("div");
        pages.classList.add('pages');
        pages.textContent = book.pages + " pages";

        const readOptions = document.createElement("div");
        readOptions.classList.add('read-options');

        const list = document.createElement("ul");
        const li1 = document.createElement("li");
        const rad1 = document.createElement('input');
        rad1.classList.add('radio');
        rad1.type = 'radio';
        rad1.id = 'no';
        rad1.name = 'read'+book.title;
        rad1.value = 'Not started';
      
        const label1 = document.createElement('label');
        label1.htmlFor = 'no';
        label1.textContent = " Not yet started";
        if (book.read == 'Not started') {
            rad1.checked = true;
        }

        const li2 = document.createElement("li");
        const rad2 = document.createElement('input');
        rad2.classList.add('radio');
        rad2.type = 'radio';
        rad2.id = 'started';
        rad2.name ='read'+book.title;
        rad2.value = 'Started';
        rad2.onchange = book.changeStatus;
        const label2 = document.createElement('label');
        label2.htmlFor = 'read';
        label2.textContent = " Started";
        if (book.read == 'Started') {
            rad2.checked = true;
        }


        const li3 = document.createElement("li");
        const rad3 = document.createElement('input');
        rad3.classList.add('radio');
        rad3.type = 'radio';
        rad3.id = 'finished';
        rad3.name = 'read'+book.title;
        rad3.value = 'Finished';
        rad3.onchange = book.changeStatus();
        const label3 = document.createElement('label');
        label3.htmlFor = 'read';
        label3.textContent = "  Finished";
        if (book.read == 'Finished') {
            rad3.checked = true;
        }
  
        li1.append(rad1);
        li1.append(label1);
        li2.append(rad2);
        li2.append(label2);
        li3.append(rad3);
        li3.append(label3)
        list.append(li1);
        list.append(li2);
        list.append(li3);
        readOptions.append(list);

        console.log(list)


        const card = document.createElement("div");
        card.classList.add('card');
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readOptions);
       


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
addBookToLibrary(test2);
displayBooks();