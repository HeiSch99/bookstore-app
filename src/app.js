new Vue({
    el: '#app',
    data: {
        books: [],
        form: {
            title: '',
            author: '',
            year: '',
            genre: '',
        },
        isEditing: false,
        editingIndex: null
    },
    created() {
        fetch('data/books.json')
            .then(res => res.json())
            .then(data => {
                this.books = data;
            })
            .catch(error => console.error('Error loading JSON', error));
    },
    methods: {
        submitForm() {
            const newBook = { ...this.form };
            
            if (this.isEditing) {
                this.books.splice(this.editingIndex, 1, newBook);
                this.isEditing = false;
                this.editingIndex = null;
            } else {
                const exists = this.books.find(b => b.title === newBook.title);
                if (exists) {
                    alert("A book with this title")
                }
                this.books.push(newBook);
            }
            this.resetForm();
        },

        resetForm() {
            this.form = { title: '', author: '', year: '', genre: '' };
            this.isEditing = false;
            this.editingIndex = null;
        }
    }
});