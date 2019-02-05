// BOOK CONSTRUCTOR
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// STORAGE CONSTRUCTOR
function Store(){}

// STORE PROTOTYPES
  // REMOVE BOOK PROTOTYPE METHOD
  Store.prototype.removeBook = function(isbn){
    const store = new Store();
    const books = store.getBooks();
    books.forEach(function(book,index){
      if(book.isbn === isbn){
        books.splice(index,1);
      }
      localStorage.setItem('books',JSON.stringify(books));
    }) 
  }
  // ADD BOOK PROTOTYPE METHOD
  Store.prototype.addBook = function(book){ 
    const store = new Store();
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
    console.log(books);
  }
  // GET BOOKS PROTOTYPE METHOD
  Store.prototype.getBooks = function(){
    let books;
    if(localStorage.getItem('books')===null){
      books =[];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
  // DISPLAY BOOKS PROTOTYPE METHOD
  Store.prototype.displayBooks = function(){
    const store = new Store();
    const books = store.getBooks();
    books.forEach(function(book){
      const ui = new UI();
      ui.addBookToList(book);
    });
    console.log(books);
  }

// UI CONSTRUCTOR
function UI(){}

// UI PROTOTYPE METHODS
  // UI ADD BOOK TO UI TABLE PROTOTYPE METHOD
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.isbn}</td>
                  <td><a href="#" class="delete">X</a></td>`;
                  list.appendChild(row);
}
// UI CLEAR INPUT FIELDS PROTOTYPE METHOD
UI.prototype.clearFields = function(){
  document.getElementById('title').value ='';
  document.getElementById('author').value ='';
  document.getElementById('isbn').value ='';
}
// UI DELETE BOOK FROM UI TABLE PROTOTYPE METHOD
UI.prototype.deleteBook = function(target){
  if(target.className==='delete'){
    target.parentElement.parentElement.remove();
  };
}
// UI SHOW ALERT PROTOTYPE METHOD
UI.prototype.showAlert = function(message,className){
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');
  container.insertBefore(div,form);
  let  timeout = 3000;
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, timeout);
}

// CREATE EVENT LISTENERSS
const store = new Store();
// GET BOOKS FROM STORAGE AND DISPLAY IN DOM ON PAGE LOAD 
document.addEventListener('DOMContenLoaded',store.displayBooks());

// FORM CLICK OR SUBMIT EVENT 
document.getElementById('book-form').addEventListener('submit', function(e){
  // GET INPUT VALUES
 const title = document.getElementById('title').value, 
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value ;
  // INSTANTIATE BOOK, STORE AND UI CONSTRUCTORS      
  const book = new Book(title, author,isbn);
  const store = new Store();
  const ui = new UI();
  // A LITTLE VALIDATION
  if(title === ''|| author ==='' || isbn===''){
    ui.showAlert('Please Fill in all fields','error');
  }else{
    ui.addBookToList(book);
    ui.showAlert('Book Successfully Added', 'success');
    ui.clearFields();
    store.addBook(book);
  }
  e.preventDefault(); // PREVENT FORM DEFAULT BEHAVIOUR
});
// EVENT LISTENER FOR DELETE - EVENT DELIGATION
document.getElementById('book-list').addEventListener('click',function(e){
  const store = new Store();
  const ui = new UI();
  ui.deleteBook(e.target);
  store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Deleted','warning');
  
  e.preventDefault();
})