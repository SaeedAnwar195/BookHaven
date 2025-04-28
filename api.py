from flask import Blueprint, jsonify, request
from flask_login import login_required
from database import db
from models import Book, Author

api_bp = Blueprint('api', __name__)

@api_bp.route('/authors', methods=['GET'])
def get_authors():
    authors = Author.query.all()
    return jsonify([author.to_dict() for author in authors])

@api_bp.route('/authors', methods=['POST'])
@login_required
def create_author():
    data = request.get_json()
    if not data or not data.get('name'):
        return jsonify({'error': 'Name is required'}), 400
    author = Author(name=data['name'], bio=data.get('bio'))
    db.session.add(author)
    db.session.commit()
    return jsonify(author.to_dict()), 201

@api_bp.route('/authors/<int:id>', methods=['GET'])
def get_author(id):
    author = Author.query.get_or_404(id)
    return jsonify(author.to_dict())

@api_bp.route('/authors/<int:id>', methods=['PUT'])
@login_required
def update_author(id):
    author = Author.query.get_or_404(id)
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    author.name = data.get('name', author.name)
    author.bio = data.get('bio', author.bio)
    db.session.commit()
    return jsonify(author.to_dict())

@api_bp.route('/authors/<int:id>', methods=['DELETE'])
@login_required
def delete_author(id):
    author = Author.query.get_or_404(id)
    if Book.query.filter_by(author_id=id).count() > 0:
        return jsonify({'error': 'Cannot delete author with associated books'}), 400
    db.session.delete(author)
    db.session.commit()
    return jsonify({'message': 'Author deleted'})

@api_bp.route('/books', methods=['GET'])
def get_books():
    search = request.args.get('search', '')
    sort = request.args.get('sort', '')
    query = Book.query.join(Author)
    if search:
        query = query.filter(
            db.or_(
                Book.title.ilike(f'%{search}%'),
                Author.name.ilike(f'%{search}%'),
                Book.isbn.ilike(f'%{search}%')
            )
        )
    if sort == 'price_asc':
        query = query.order_by(Book.price.asc())
    elif sort == 'price_desc':
        query = query.order_by(Book.price.desc())
    books = query.all()
    return jsonify([book.to_dict() for book in books])


@api_bp.route('/books/<int:id>', methods=['GET'])
def get_book(id):
    book = Book.query.get_or_404(id)
    return jsonify(book.to_dict())

@api_bp.route('/books', methods=['POST'])
@login_required
def create_book():
    data = request.get_json()
    if not data or not data.get('title') or not data.get('author_id'):
        return jsonify({'error': 'Title and author_id are required'}), 400
    book = Book(
        title=data['title'],
        author_id=data['author_id'],
        genre=data.get('genre'),
        price=data.get('price'),
        stock_quantity=data.get('stock_quantity'),
        isbn=data.get('isbn')
    )
    db.session.add(book)
    db.session.commit()
    return jsonify(book.to_dict()), 201

@api_bp.route('/books/<int:id>', methods=['PUT'])
@login_required
def update_book(id):
    book = Book.query.get_or_404(id)
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    book.title = data.get('title', book.title)
    book.author_id = data.get('author_id', book.author_id)
    book.genre = data.get('genre', book.genre)
    book.price = data.get('price', book.price)
    book.stock_quantity = data.get('stock_quantity', book.stock_quantity)
    book.isbn = data.get('isbn', book.isbn)
    db.session.commit()
    return jsonify(book.to_dict())

@api_bp.route('/books/<int:id>', methods=['DELETE'])
@login_required
def delete_book(id):
    book = Book.query.get_or_404(id)
    db.session.delete(book)
    db.session.commit()
    return jsonify({'message': 'Book deleted'})
