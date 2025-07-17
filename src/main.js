let table = []

const bookForm = document.getElementById('bookForm');
const bookTable = document.getElementById('bookTable').getElementsByTagName('rbody')[0];

// Loads JSON data
fetch('assets/table.json')
    .then(response => response.json())
    .then(data => {
        table = data;
        renderTable();
    })
    .catch(error => console.error("Error loading JSON:", error));

// Renders book data in a table
function renderTable() {
    bookTable.innerHTML = '';
    table.forEach((book, index) => {
        const row = bookTable.insertRow();
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
            <td>${book.genre}</td>
            <td>
                <button onclick="editBook(${index})>Edit</button>
                <button onclick="deleteBook(${book.title})>Delete</button>
            <td/>
        `;
    });
}