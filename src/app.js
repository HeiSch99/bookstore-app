console.log("app.js is running."); //debug
const { createApp } = Vue;

createApp({
    data() {
        return {
            books: [],
            form: {
                title: '',
                author: '',
                year: '',
                genre: '',
            },
            isEditing: false,
            editingIndex: null,
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
    methods: {/*
        isValid(book) {
            return book.title && book.author && book.genre && Number.isFinite(book.year);
        },*/

        addBook() {
            const newBook = { ...this.form };
            /*
            if (!this.isValid(newBook)) {
                alert("All fields must be filled and year must be valid.");
                return;
            }*/

            if (this.isEditing) {
                this.books.splice(this.editingIndex, 1, newBook);
                this.isEditing = false;
                this.editingIndex = null;
            } else {
                const exists = this.books.find(b => b.title === newBook.title);
                if (exists) {
                    alert("A book with this title already exists.");
                    return;
                }
                alert("New book added!");
                this.books.push(newBook);
            }
            this.resetForm();
        },

        editBook(index) {
            this.form = { ...this.books[index] };
            this.editingIndex = index;
            this.isEditing = true;
        },

        deleteBook() {
            const title = this.deleteTitle.trim();
            if (!title) {
                alert("No such book found.");
                return;
            }
            const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
            if (index !== -1) {
                this.books.splice(index, 1);
                alert(`"${title}" deleted!`);
            } else {
                alert("No such book found.");
            }
            this.deleteTitle = '';
        },

        resetForm() {
            this.form = { title: '', author: '', year: '', genre: '' };
            this.isEditing = false;
            this.editingIndex = null;
        }
    }
}).mount('#app');