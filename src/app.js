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
        addBook() {
            const newBook = { ...this.form };

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
                this.books.push(newBook);
                alert("New book added!");
            }
            this.form = { title: '', author: '', year: '', genre: '' };
        },

        editBook() {
            const title = this.originalTitle.trim();
            const index = this.books.findIndex(book => book.title.toLowerCase() === title.toLowerCase());
            
            this.books.splice(index, 1, {
                title: this.editTitle,
                author: this.editAuthor,
                year: Number(this.editYear),
                genre: this.editGenre
            });
            this.originalTitle = '';
            this.editTitle = '';
            this.editAuthor = '';
            this.editYear = '';
            this.editGenre = '';
            
            alert("Book information updated!")
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
                alert(`Book ${title} deleted!`);
            } else {
                alert("No such book found.");
            }
            this.deleteTitle = '';
        }
    }
}).mount('#app');