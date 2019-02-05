// DECLARE CLASSES
class Book { // BOOK CLASS
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
class UI { // UI CLASS
    addBookToList(book){
      const list = document.getElementById('book-list');
      const row = document.createElement('tr');
      row.innerHTML = `<td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.isbn}</td>
                      <td><a href="#" class="delete">X</a></td>`;
      list.appendChild(row);
    }
    showAlert(message,className){
      const div = document.createElement('div');
      div.className = `alert ${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div,form);
      let timeout = 3000;
      setTimeout(() => {
        document.querySelector('.alert').remove();
      }, timeout);
    }
    deleteBook(target){
      if(target.className==='delete'){
        target.parentElement.parentElement.remove();
      };
    }
    clearFields(){
      document.getElementById('title').value ='';
      document.getElementById('author').value ='';
      document.getElementById('isbn').value ='';
    }
  }
class Store{
  static displayBooks(){
    const books = Store.getBooks();
    books.forEach(function(book){
      const ui = new UI();
      ui.addBookToList(book);
    })
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(isbn){
    const books = Store.getBooks();
    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
      localStorage.setItem('books',JSON.stringify(books));
    })
    console.log(isbn);
  }
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
     books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }
}
// CREATE EVENT LISTERNS 
  // DIPLAY BOOKS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', Store.displayBooks);
  // GET FORM SUBMIT ACTION
document.getElementById('book-form').addEventListener('submit', function(e){

  // GET INPUT VALUES
 const title = document.getElementById('title').value, 
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value ;
        
  const book = new Book(title, author,isbn);

  const ui = new UI();
  if(title === ''|| author ==='' || isbn===''){
    ui.showAlert('Please Fill in all fields','error');
  }else{
    ui.addBookToList(book);
    Store.addBook(book);
    ui.showAlert('Book Successfully Added', 'success');
    ui.clearFields();
  }
  e.preventDefault(); // PREVENT FORM DEFAULT BEHAVIOUR
});
// EVENT LISTENER FOR DELETE
document.getElementById('book-list').addEventListener('click',function(e){
  const ui = new UI();

  ui.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert('Book Deleted','warning');
  
  e.preventDefault(); // PREVENT DEFAULT BEHAVIOUR
})