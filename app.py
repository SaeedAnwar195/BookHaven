from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_required, current_user
from database import db
from api import api_bp
from auth import auth_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///book_haven.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key'

# here i am Initializing the extensions
db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth.login'

# here i am Loading the user for Flask-Login
from models import User
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# here i am Registering the blueprints
app.register_blueprint(api_bp, url_prefix='/api')
app.register_blueprint(auth_bp)

# these are the BookHaven Routes
@app.route('/')
def index():
    if current_user.is_authenticated:
        return render_template('admin.html')
    return render_template('user.html')

@app.route('/admin')
@login_required
def admin():
    return render_template('admin.html')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)