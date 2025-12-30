const myLibrary = [];

const addBookButton = document.getElementById('add');
addBookButton.addEventListener('click', () =>{
    openDialog('add-book');
});

const updateButton = document.getElementById('update');
updateButton.addEventListener('click', () =>{
    updateBookshelf();
});

const loadLibraryButton = document.getElementById('load');
loadLibraryButton.addEventListener('click', () => {
    alert('Load Library Functionality Coming Soon...')
});

//dialog buttons
const addBookSubmitButton = document.getElementById('submit');
addBookSubmitButton.addEventListener('click', (event) => {
    event.preventDefault();
    let title = document.getElementById('name-input');
    let author = document.getElementById('author-input');
    let pages = document.getElementById('page-input');
    let isRead = document.getElementsByName('read');
    console.log(`Adding ${title.value} by ${author.value}...`)
    addBookToLibrary(title.value, author.value, pages.value, isRead.value);
    clearDialogInputs('add-book');
    const dialog = document.getElementById('add-book');
    dialog.close();
});



function Book(title, author, pages, isRead){
    if(!new.target){
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, `;
    }
}

function addBookToLibrary(title, author, pages, isRead){
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    updateBookshelf();
}

export function createBookObjects(myLibrary){
    if(myLibrary.length <= 0){
        console.log("No books found.")
        addSampleBooks();
    }
    const bookshelf = document.getElementById('bookshelf');
    //create books out of array of objects
    updateBookshelf();
}


function updateBookshelf(){
    const bookshelf = document.getElementById('bookshelf');
    bookshelf.innerHTML = "";
    //create books out of array of objects
    for(let i = 0; i < myLibrary.length; i++){
        let book = document.createElement('div');
        book.setAttribute('class', 'book');
        book.id = `${myLibrary[i].title.toLowerCase().replaceAll(" ", "-")}`;
        let bookTitleText = document.createElement('h2');
        bookTitleText.innerText = myLibrary[i].title;
        let bookAuthorText = document.createElement('p');
        bookAuthorText.innerText = `by ${myLibrary[i].author}`;
        let bookPagesText = document.createElement('p');
        bookPagesText.innerText = `${myLibrary[i].pages} pages`;
        book.appendChild(bookTitleText);
        book.appendChild(bookAuthorText);
        book.appendChild(bookPagesText);
        bookshelf.appendChild(book);

        if(myLibrary[i].isRead){
            let readStatus = document.createElement('p');
            readStatus.innerText = "Read";
            book.appendChild(readStatus);
            book.style.backgroundColor = "white";
            book.style.color = "black";
            let toggleReadButton = document.createElement('button');
            toggleReadButton.innerText = "Toggle Read Status";
            book.appendChild(toggleReadButton);
        } else {
            let readStatus = document.createElement('p');
            readStatus.innerText = "Not Read";
            book.appendChild(readStatus);
            book.style.backgroundColor = "lightgreen";
            book.style.color = "black";
            let toggleReadButton = document.createElement('button');
            toggleReadButton.innerText = "Toggle Read Status";
            book.appendChild(toggleReadButton);
        }
    }
}

function addSampleBooks(){
    console.log("Adding 4 sample books...")
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
    addBookToLibrary("Dune", "Frank Herbert", 305, true);
    addBookToLibrary("Armada", "Ernest Cline", 402, true);
    addBookToLibrary("Brave New World", "Aldous Huxley", 268, false);   
}

function openDialog(dialogId){
    const dialog = document.getElementById(dialogId);
    dialog.show();
}

function clearDialogInputs(dialogId){
    const dialog = document.getElementById(dialogId);
    const inputs = dialog.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = "";
    }
}

createBookObjects(myLibrary);