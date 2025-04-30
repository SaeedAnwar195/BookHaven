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

    

});