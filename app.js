
/*variables*/
let bookNumber = 0;

/*DOM*/
const links = document.querySelectorAll('.link');
const msg = document.querySelector('.msg');
const form = document.querySelector('.form'); //form wrapper.
const logForm = document.querySelector('.logForm'); //the actual form.
let bookCards = document.querySelectorAll('.bookCard');
const shelf = document.querySelector('.shelf');
let shelfPanel;

/*Starting*/
links.forEach(link => link.addEventListener('mousedown', e=>{
    if(e.target.classList.contains('guestMode')){
        start();
    }
}))

function start(){
    msg.style.display = 'none';
    bookNumber = localStorage.getItem('bookNumber');
    /*initializting*/
    for(let i = 0; i<localStorage.length-1; i++){
        arrangeShelf(JSON.parse(localStorage.getItem('book'+i)));
    }
}

function cardSelected(obj){
    bookCards.forEach(bookCard => bookCard.style.display = 'none');
    shelf.classList.add('notiPanel', 'shelfPanel');
    shelfPanel = document.querySelector('.shelfPanel');
    obj.style.display = 'flex';
    obj.classList.add('selectedBook');

    //used setTimeout to prevent the following from triggering immediately.
    setTimeout(() => {
        shelfPanel.addEventListener('mousedown', e=>{
            if(e.target != obj){
              bookCards.forEach(book => {
                book.style.display='flex';
                book.classList.remove('selectedBook');});
                shelf.classList.remove('notiPanel');
                return false;
            }  
            })
            
        }, 100);
}

//Adding books.
class Book{
    constructor(title, author,rating){
        this.title = title;
        this.author = author;
        this.rating = rating;
    }
}

function addBooks(){
    form.style.display = 'flex';
}
logForm.addEventListener('submit',e=>{
    e.preventDefault();
    let newBook = 
        new Book(logForm['title'].value,
                logForm['author'].value,
                logForm['rating'].value);
    logForm.reset();
    bookNumber++;
    localStorage.setItem('book'+bookNumber, JSON.stringify(newBook));
    localStorage.setItem('bookNumber', bookNumber);
    arrangeShelf(newBook);
    form.style.display = 'none';
})

function arrangeShelf(book){
    shelf.innerHTML +=
        `<div class="bookCard flexbox" onclick="cardSelected(this)">
            <h3 class="title"> ${book.title} </h1>
            <p class="author"> ${book.author} </p>
            <p class="rating"> ${book.rating}/10 </p>
        </div>`
    bookCards = document.querySelectorAll('.bookCard');
}




