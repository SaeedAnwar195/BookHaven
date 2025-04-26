document.addEventListener('DOMContentLoaded', () => {
    const searchForm   = document.getElementById('searchForm');
    const searchInput  = document.getElementById('searchQuery');
    const sortSelect   = document.getElementById('sortOption');
    const bookList     = document.getElementById('bookList');
  
    // Utility to escape HTML in data
    function escapeHtml(str) {
      if (typeof str !== 'string') return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  
    // Fetch & render books
    function loadBooks(search = '', sort = '') {
      // Build URL with only non-empty params
      let url = '/api/books';
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (sort)   params.set('sort', sort);
      const qs = params.toString();
      if (qs) url += `?${qs}`;
  
      fetch(url)
        .then(res => {
          if (!res.ok) throw new Error(`Server error: ${res.status}`);
          return res.json();
        })
        .then(books => {
          if (!Array.isArray(books) || books.length === 0) {
            bookList.innerHTML = '<p>No books found.</p>';
            return;
          }
  
          const rows = books.map(b => `
            <tr>
              <td>${escapeHtml(b.title)}</td>
              <td>${escapeHtml(b.author_name)}</td>
              <td>${escapeHtml(b.genre)}</td>
              <td>${b.price != null ? b.price : ''}</td>
              <td>${b.stock_quantity != null ? b.stock_quantity : ''}</td>
              <td>${escapeHtml(b.isbn)}</td>
            </tr>
          `).join('');
  
          bookList.innerHTML = `
            <table border="1">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>ISBN</th>
                </tr>
              </thead>
              <tbody>
                ${rows}
              </tbody>
            </table>
          `;
        })
        .catch(err => {
          console.error('Failed to load books:', err);
          bookList.innerHTML = '<p>Error loading books. Please try again later.</p>';
        });
    }
  
    // On form submit
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      loadBooks(searchInput.value.trim(), sortSelect.value);
    });
  
    // Also reload when sort changes
    sortSelect.addEventListener('change', () => {
      loadBooks(searchInput.value.trim(), sortSelect.value);
    });
  
    // Initial load
    loadBooks();
  });
  