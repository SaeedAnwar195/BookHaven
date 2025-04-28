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