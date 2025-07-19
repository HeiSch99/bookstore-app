const { createApp } = Vue

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
            editingIndex: null
        };
    },
    mounted() {
        fetch('assets/books.json')
            .then(res => res.json())
            .then(data => {
                this.books = data;
            })
            .catch(error => console.error('Error loading JSON', error));
    },
    methods: {
        isValid(book) {
            return book.title && book.author && book.genre && Number.isFinite(book.year);
        },

        submitForm() {
            const newBook = { ...this.form };
            
            if (!this.isValid(newBook)) {
                alert("All fields must be filled and year must be valid.");
                return;
            }

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
            }
            this.resetForm();
        },

        editBook(index) {
            this.form = { ...this.books[index] };
            this.editingIndex = index;
            this.isEditing = true;
        },

        deleteBook(index) {
            this.books.splice(index, 1);
            if (this.isEditing && this.editingIndex === index) {
                this.resetForm();
            }
        },

        resetForm() {
            this.form = { title: '', author: '', year: '', genre: '' };
            this.isEditing = false;
            this.editingIndex = null;
        }
    }
}).mount('#app');