from database import db
from flask_login import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=True)

class Author(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    bio = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'bio': self.bio
        }

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('author.id'), nullable=False)
    genre = db.Column(db.String(50), nullable=True)
    price = db.Column(db.Float, nullable=True)
    stock_quantity = db.Column(db.Integer, nullable=True)
    isbn = db.Column(db.String(13), nullable=True)
    author = db.relationship('Author', backref='books')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'author_id': self.author_id,
            'author_name': self.author.name,
            'genre': self.genre,
            'price': self.price,
            'stock_quantity': self.stock_quantity,
            'isbn': self.isbn
        }