console.log("app.js is running."); //debug
const { createApp } = Vue;

createApp({
    data() {
        return {
            books: [],
            //array to add book fields
            form: {
                title: '',
                author: '',
                year: '',
                genre: ''
            },

            //variables to edit book fields
            originalTitle: '',
            editTitle: '',
            editAuthor: '',
            editYear: '',
            editGenre: '',

            //variable to delete book
            deleteTitle: ''
        };
    },
    mounted() {
        fetch('assets/books.json')
            .then(res => res.json())
            .then(data => {
                console.log("Books loaded:", data); //debug
                this.books = data;
            })
            .catch(error => console.error('Error loading JSON', error));
    },
    methods: {

        //checks for empty form fields and invalid year
        validationCheck(title, author, year, genre) {
            if (!title.trim() || !author.trim() || !year || !genre.trim() || isNaN(year)) {
                alert("Warning: All fields must be filled and year must be a valid number.")
                return false;
            }
            return true;
        },

        //checks whether a title field is filled
        fieldCheck(filled) {
            if(!filled) {
                alert("Warning: No book title entered.");
                return true;
            }
            return false;
        },

        //adds a new book to the table
        addBook() {
            const title = this.form.title.trim();
            const author = this.form.author.trim();
            const year = Number(this.form.year);
            const genre = this.form.genre.trim();

            if(this.fieldCheck(title)) return;

            //checks if a book entry with the same title already exist
            const exists = this.books.some(book => book.title === title);
            if (exists) {
                alert("Warning: A book with this title already exists.");
                return;
            }
            
            if(!this.validationCheck(title, author, year, genre)) return;

            this.books.push(this.form);
            this.form = { title: '', author: '', year: '', genre: '' };

            alert("New book added!");
        },

        //updates the book data in the table
        editBook() {
            const origin = this.originalTitle.trim();
            const title = this.editTitle.trim();
            const author = this.editAuthor.trim();
            const year = Number(this.editYear);
            const genre = this.editGenre.trim();

            if(this.fieldCheck(origin)) return;

            //check if a book is in the table
            const index = this.books.findIndex(book => book.title.toLowerCase() === origin.toLowerCase());
            if(index === -1) {
                alert(`Warning: No book found with the title ${origin}.`);
                return;
            }

            if(!this.validationCheck(title, author, year, genre)) return;

            this.books.splice(index, 1, { title, author, year, genre });
            this.originalTitle = '';
            this.editTitle = '';
            this.editAuthor = '';
            this.editYear = '';
            this.editGenre = '';
            
            alert("Book information updated!")
        },

        //removes a book entry from the table
        deleteBook() {
            const title = this.deleteTitle.trim();

            if(this.fieldCheck(title)) return;

            //check if a book is in the table
            const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
            if (index === -1) {
                alert(`Warning: No book found with the title ${title}.`);
                return;
            }

            this.books.splice(index, 1);
            this.deleteTitle = '';

            alert(`Book ${title} deleted!`);
        }
    }
}).mount('#app');