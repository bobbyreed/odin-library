const myLibrary = [];

const addBookButton = document.getElementById('add');
addBookButton.addEventListener('click', () =>{
    openDialog('add-book');
});

const loadLibraryButton = document.getElementById('load');
loadLibraryButton.addEventListener('click', () => {
    alert('Load Library Functionality Coming Soon...')
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
}

export function createBookObjects(myLibrary){
    if(myLibrary.length <= 0){
        addSampleBooks();
    }
    const bookshelf = document.getElementById('bookshelf');
    //create books out of array of objects
    for(let i = 0; i < myLibrary.length; i++){
        let book = document.createElement('div');
        book.id = `${myLibrary[i].title.toLowerCase().replaceAll(" ", "-")}`;
        let bookTitleText = document.createElement('h2');
        bookTitleText.innerText = myLibrary[i].title;
        let bookAuthorText = document.createElement('p');
        bookAuthorText.innerText = `by ${myLibrary[i].author}`;
        let bookPagesText = document.createElement('p');
        bookPagesText.innerText = `${myLibrary[i].pages} pages`;
        let bookReadText = document.createElement('p');
        bookReadText.innerText = `Read? ${myLibrary[i].isRead}`
        book.appendChild(bookTitleText);
        book.appendChild(bookAuthorText);
        book.appendChild(bookPagesText);
        book.appendChild(bookReadText);
        bookshelf.appendChild(book);
    }
    //append books to bookshelf
}

function addSampleBooks(){
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
    addBookToLibrary("Dune", "Frank Herbert", 305, false);
    addBookToLibrary("Armada", "Ernest Cline", 402, true);
}

function openDialog(dialogId){
    const dialog = document.getElementById(dialogId);
    dialog.show();
}

createBookObjects(myLibrary);