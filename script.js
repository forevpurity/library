// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// Book.prototype.changeStatus = function () {
//   this.read = !this.read;
// };

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  changeStatus() {
    this.read = !this.read;
  }
}

const myLibrary = [];

myLibrary.push(new Book("Intelligent Design", "William Dembski", 312, true));
myLibrary.push(new Book("Atomic Habits", "James Clear", 288, false));
myLibrary.push(new Book("The Alchemist", "Paulo Coelho", 208, false));
myLibrary.push(new Book("Eat That Frog", "Brian Tracy", 144, true));

const container = document.querySelector(".container");

const addBookBtn = document.querySelector(".add__book");
const dialog = document.querySelector(".dialog");
const overlay = document.querySelector(".overlay");
const submitBtn = document.querySelector(".submitBtn");
const form = document.querySelector("form");

function displayBook(book) {
  const card = document.createElement("div");
  card.classList.toggle("card");

  const author = document.createElement("div");
  const title = document.createElement("div");
  const pages = document.createElement("div");
  const topDiv = document.createElement("div");

  topDiv.classList.toggle("info__group");
  author.classList.toggle("author");
  title.classList.toggle("title");
  pages.classList.toggle("pages");

  const readBtn = document.createElement("div");
  const delBtn = document.createElement("div");
  const botDiv = document.createElement("div");

  botDiv.classList.toggle("btn__group");
  readBtn.classList.toggle("readBtn");
  delBtn.classList.toggle("delBtn");
  if (book.read) readBtn.classList.toggle("isRead");

  author.textContent = `by ${book.author}`;
  title.textContent = book.title;
  pages.textContent = `Pages: ${book.pages}`;
  readBtn.textContent = book.read ? "Read" : "Not read";
  delBtn.textContent = "Delete";

  readBtn.addEventListener("click", () => {
    readBtn.classList.toggle("isRead");
    book.changeStatus();
    readBtn.textContent = book.read ? "Read" : "Not read";
  });

  delBtn.addEventListener("click", () => {
    const cards = document.querySelectorAll(".card");
    cards.forEach((cardTmp, index) => {
      if (cardTmp === card) {
        myLibrary.splice(index, 1);
      }
    });
    container.removeChild(card);
  });

  topDiv.appendChild(title);
  topDiv.appendChild(pages);
  topDiv.appendChild(author);

  botDiv.appendChild(readBtn);
  botDiv.appendChild(delBtn);

  card.appendChild(topDiv);
  card.appendChild(botDiv);
  container.appendChild(card);
}

function displayBooks() {
  myLibrary.forEach((book) => displayBook(book));
}

function addBookToLibrary() {}

addBookBtn.addEventListener("click", () => {
  dialog.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  dialog.classList.toggle("active");
  overlay.classList.toggle("active");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector(".titleText");
  const authorInput = document.querySelector(".authorText");
  const pagesInput = document.querySelector(".pagesText");
  const checkbox = document.querySelector(".checkbox");

  const titleText = titleInput.value;
  const authorText = authorInput.value;
  const pagesText = parseInt(pagesInput.value);
  const isChecked = checkbox.checked;

  const newBook = new Book(titleText, authorText, pagesText, checkbox);

  myLibrary.push(newBook);

  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkbox.checked = false;

  dialog.classList.toggle("active");
  overlay.classList.toggle("active");

  displayBook(myLibrary[myLibrary.length - 1]);
});

displayBooks();
