from flask import Blueprint, jsonify, request
from flask_login import login_required
from database import db
from models import Book, Author

api_bp = Blueprint('api', __name__)