function Book(title, author, nrOfPages, read){
    this.title = title;
    this.author = author;
    this.nrOfPages = nrOfPages;
    this.read = read;
}
const myLibrary = [];

function addToLibrary(title,pages, author, read){
    const book = new Book(title,author,pages,read);
    myLibrary.push(book);
    updateLibrary();
}
document.getElementById("bookForm").addEventListener("submit",(event)=>{
    event.preventDefault();
    let title = document.getElementById("title").value;
    let pages = document.getElementById("pages").value;
    let author = document.getElementById("author").value;
    let read = document.querySelector('input[name="read"]:checked').value;
    document.getElementById("bookForm").reset();
    addToLibrary(title,pages, author, read);
})
function updateLibrary(){
    let booksContainer = document.getElementById("books-container");
    booksContainer.innerHTML = "";
    myLibrary.forEach((book, i)=>{
        let newBookItem = document.createElement("li");
        newBookItem.id = "book-card";
        
        newBookItem.innerHTML = `
        <div class="b-title">${book.title}</div>
        <div>author: ${book.author}</div>
        <div>Total pages: ${book.nrOfPages}</div>
        <div>finished reading: ${Boolean(book.read)? "Yes": "No"}</div>
        <div class="action-btns">
          <button onclick="deleteBook(${i})">Delete</button>
          <button onclick="changeReadStatus(${i})">Change Read Status</button>
        </div>`;
        booksContainer.appendChild(newBookItem)
    })
}
function deleteBook(index){
    myLibrary.splice(index,1);
    updateLibrary();
}
function changeReadStatus(index){
    myLibrary.forEach((book, i)=>{
        if(i==index){
            book.read = !(Boolean(book.read));
        }
    })
    updateLibrary();
}