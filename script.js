let myLibrary = [];

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
    let readstr;
    if (this.read){
        readstr = "read";
    }
    else {
        readstr = "not read yet"
    }
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readstr}.`
}


let test = new Book('Lord of the Rings', 'J.R.R. Tolkien', 255, true);



function addBookToLibrary(book) {
    myLibrary.push(book);
  // do stuff here
}

function displayBooks(){
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

        if (book.read) {
            read.textContent = 'Already read'
        }
        else {
            read.textContent = 'Not yet read'
        }        

        const card = document.createElement("div");
        card.classList.add('card');
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        document.querySelector('body').appendChild(card);  
    }
}

addBookToLibrary(test);
displayBooks();