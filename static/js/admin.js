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

    authorForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('authorEditId').value;
        const data = {
            name: document.getElementById('authorName').value,
            bio: document.getElementById('authorBio').value || null
        };
        const method = id ? 'PUT' : 'POST';
        const url    = id ? `/api/authors/${id}` : '/api/authors';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) return res.json().then(err => { throw new Error(err.error); });
            return res.json();
        })
        .then(() => {
            authorForm.reset();
            document.getElementById('authorEditId').value = '';
            authorForm.querySelector('button').textContent = 'Add Author';
            loadAuthors();
            loadStats();
        })
        .catch(err => alert(err.message));
    });

    bookForm.addEventListener('submit', e => {
        e.preventDefault();
        const id = document.getElementById('bookId').value;
        const data = {
            title: document.getElementById('title').value,
            author_id: parseInt(authorDropdown.value),
            genre: document.getElementById('genre').value || null,
            price: parseFloat(document.getElementById('price').value) || null,
            stock_quantity: parseInt(document.getElementById('stockQuantity').value) || null,
            isbn: document.getElementById('isbn').value || null
        };
        if (!data.author_id) return alert('Please select an author');

        const method = id ? 'PUT' : 'POST';
        const url    = id ? `/api/books/${id}` : '/api/books';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (!res.ok) return res.json().then(err => { throw new Error(err.error); });
            return res.json();
        })
        .then(() => {
            bookForm.reset();
            document.getElementById('bookId').value = '';
            bookForm.querySelector('button').textContent = 'Add Book';
            loadBooks();
            loadStats();
        })
        .catch(err => alert(err.message));
    });

    window.editAuthor = id => {
        fetch(`/api/authors/${id}`)
            .then(res => res.json())
            .then(author => {
                showAuthorForm(true);
                document.getElementById('authorEditId').value = author.id;
                document.getElementById('authorName').value     = author.name;
                document.getElementById('authorBio').value      = author.bio || '';
                authorForm.querySelector('button').textContent = 'Update Author';
            })
            .catch(err => {
                console.error('Failed to fetch author', err);
                alert('Error loading author');
            });
    };


    loadAuthors();
    loadBooks();
    loadStats();


});