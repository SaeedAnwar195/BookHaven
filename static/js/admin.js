document.addEventListener('DOMContentLoaded', () => {
    const authorForm     = document.getElementById('authorForm');
    const bookForm       = document.getElementById('bookForm');
    const authorList     = document.getElementById('authorList');
    const bookList       = document.getElementById('bookList');
    const authorDropdown = document.getElementById('bookAuthorId');
    const totalBooks     = document.getElementById('totalBooks');
    const totalAuthors   = document.getElementById('totalAuthors');
    const authorSection  = document.getElementById('authorSection');
    const bookSection    = document.getElementById('bookSection');

    function loadAuthors() {
        return fetch('/api/authors')
            .then(res => res.json())
            .then(authors => {
                authorDropdown.innerHTML = 
                    '<option value="">Select Author</option>' +
                    authors.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
                authorList.innerHTML = 
                    '<table border="1"><tr><th>Name</th><th>Bio</th><th>Actions</th></tr>' +
                    authors.map(a => `
                        <tr>
                            <td>${a.name}</td>
                            <td>${a.bio || ''}</td>
                            <td>
                                <button onclick="editAuthor(${a.id})">Edit</button>
                                <button onclick="deleteAuthor(${a.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('') +
                    '</table>';
            })
            .catch(err => {
                console.error(err);
                alert('Error loading authors');
            });
    }

    function loadBooks() {
        fetch('/api/books')
            .then(res => res.json())
            .then(books => {
                bookList.innerHTML = 
                    '<table border="1"><tr><th>Title</th><th>Author</th><th>Genre</th><th>Price</th><th>Stock</th><th>ISBN</th><th>Actions</th></tr>' +
                    books.map(b => `
                        <tr>
                            <td>${b.title}</td>
                            <td>${b.author_name}</td>
                            <td>${b.genre || ''}</td>
                            <td>${b.price || ''}</td>
                            <td>${b.stock_quantity || ''}</td>
                            <td>${b.isbn || ''}</td>
                            <td>
                                <button onclick="editBook(${b.id})">Edit</button>
                                <button onclick="deleteBook(${b.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('') +
                    '</table>';
            })
            .catch(err => {
                console.error(err);
                alert('Error loading books');
            });
    }

    function loadStats() {
        fetch('/api/stats')
            .then(res => res.json())
            .then(stats => {
                totalBooks.textContent   = stats.total_books;
                totalAuthors.textContent = stats.total_authors;
            })
            .catch(err => {
                console.error(err);
                alert('Error loading stats');
            });
    }

    window.showAuthorForm = (isEdit = false) => {
        authorSection.style.display = 'block';
        bookSection.style.display   = 'none';
        if (!isEdit) {
            authorForm.reset();
            document.getElementById('authorEditId').value = '';
            authorForm.querySelector('button').textContent = 'Add Author';
        }
    };

    window.showBookForm = (isEdit = false) => {
        bookSection.style.display   = 'block';
        authorSection.style.display = 'none';
        if (!isEdit) {
            bookForm.reset();
            document.getElementById('bookId').value = '';
            bookForm.querySelector('button').textContent = 'Add Book';
        }
        // return the promise so callers can wait for the dropdown
        return loadAuthors();
    };


});