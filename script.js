// Refactored to utilize class constructors

// Cache DOM 
const modal = document.querySelector(".modal");
const addBookBtn = document.querySelector(".addBook");
const closeModalButton = document.querySelector(".close-modal-button");
const submitBtn = document.querySelector("#modal-submit");
const deck = document.querySelector("#deck");
const bookForm = document.querySelector("#bookForm");

let bookCounter = 0;

class Book {
    constructor(title, author, pages, read) { 
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = bookCounter;
        bookCounter++;
    }

    info() { 
        return `${this.title} by ${this.author}, ${this.pages} pages. I ${this.read} it.`
    }

    get htmlFormat() {
        const title = document.createElement("div");
        title.classList.add('title');
        title.textContent = this.title;
        const author = document.createElement("div");
        author.classList.add('author');
        author.textContent = "by " + this.author;
        const pages = document.createElement("div");
        pages.classList.add('pages');
        pages.textContent = this.pages + " pages";
        const readOptions = document.createElement("div");
        readOptions.classList.add('read-options');
        const list = document.createElement("ul");
        const li1 = document.createElement("li");
       
        const radioOption1 = document.createElement('input');
        radioOption1.classList.add('radio');
        radioOption1.type = 'radio';
        radioOption1.id = 'no ' + this.id;
        radioOption1.name = 'read ' + this.id;
        radioOption1.value = 'Not started';
        radioOption1.onclick = this.memberOf.changeStatus;
        const label1 = document.createElement('label');
        label1.htmlFor = 'no ' + this.id;
        label1.textContent = " Not yet started";
        if (this.read == 'Not started') {
            radioOption1.checked = true;
        }

        const li2 = document.createElement("li");
        const radioOption2 = document.createElement('input');
        radioOption2.classList.add('radio');
        radioOption2.type = 'radio';
        radioOption2.id = 'started '+ this.id;
        radioOption2.name ='read '+ this.id;
        radioOption2.value = 'Started';
        radioOption2.onclick = this.memberOf.changeStatus;
        const label2 = document.createElement('label');
        label2.htmlFor = 'started '+ this.id;
        label2.textContent = " Started";
        if (this.read == 'Started') {
            radioOption2.checked = true;
        }

        const li3 = document.createElement("li");
        const radioOption3 = document.createElement('input');
        radioOption3.classList.add('radio');
        radioOption3.type = 'radio';
        radioOption3.id = 'finished '+ this.id;
        radioOption3.name = 'read '+ this.id;
        radioOption3.value = 'Finished';
        radioOption3.onclick = this.memberOf.changeStatus;
        const label3 = document.createElement('label');
        label3.htmlFor = 'finished '+ this.id;
        label3.textContent = "  Finished";
        if (this.read == 'Finished') {
            radioOption3.checked = true;
        }

        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = this.memberOf.removeBook;
  
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
        card.setAttribute("data-id", this.id);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(readOptions);
        card.appendChild(removeBtn);
        return (card)
    }

    set whichLibrary(lib) {
        this.memberOf = lib;
    }
} 


class Library {
    constructor() {
        this.collection = [];
    }

    addBook = (book) => {
        book.whichLibrary = this;
        this.collection.push(book);
    }

    toggleModal= () => {
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

    addBookThruModal = (element) => {
        element.preventDefault();
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.querySelector('input[name="read"]:checked').value;
        const book = new Book(title, author, pages, read);
        book.whichLibrary = this;
        this.collection.push(book);
        this.toggleModal();
        this.displayBooks();
    }

    displayBooks = () => {
        while (deck.firstChild) {
            deck.removeChild(deck.lastChild);
        }
        for (const book of this.collection) {
            const card = book.htmlFormat; 
            deck.appendChild(card);  
        }
    }

    changeStatus = (e) => {
        const optionsList = e.target.parentElement.parentElement.childNodes;
        for (const option of optionsList) {
            const thisTitle = option.parentElement.parentElement.parentElement.firstChild.textContent;
            if (option.firstChild.checked) {
                const thisBook = this.collection.find(o => o.title === thisTitle);
                thisBook.read = option.firstChild.value;     
            }
        }
    }

    removeBook = (e) => {
        let titleToRemove = e.target.parentElement.firstChild.textContent;
        let cardToRemove = e.target.parentElement;
        let idToRemove = e.target.parentElement.getAttribute('data-id');
        let deleteFunc = () => {
            const newArr = [];
            for (let i = 0; i < this.collection.length; i++){
                if (this.collection[i].id != idToRemove) {
                    newArr.push(this.collection[i])
                }
            }
            this.collection = newArr;
            this.displayBooks();
        }
        cardToRemove.style.transform = "scale(.01)";
        cardToRemove.addEventListener('transitionend', deleteFunc, false);
    }

    
}



const test = new Book('Lord of the Rings', 'J.R.R. Tolkien', 1178, "Finished");
const test2 = new Book('The Hobbit', 'J.R.R. Tolkien', 310, "Started");
const myLibrary = new Library();

// Attach Event Listeners
bookForm.addEventListener("submit", myLibrary.addBookThruModal);
addBookBtn.addEventListener("click", myLibrary.toggleModal);
closeModalButton.addEventListener("click", myLibrary.toggleModal);

myLibrary.addBook(test);
myLibrary.addBook(test2);
myLibrary.displayBooks();