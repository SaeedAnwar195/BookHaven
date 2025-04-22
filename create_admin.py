from werkzeug.security import generate_password_hash
from app import app
from database import db
from models import User

def create_admin():
    with app.app_context():
        db.create_all()
        username = input("Enter admin username: ")
        password = input("Enter admin password: ")
        if not User.query.filter_by(username=username).first():
            admin = User(
                username=username,
                password_hash=generate_password_hash(password),
                is_admin=True
            )
            db.session.add(admin)
            db.session.commit()
            print(f'Admin user "{username}" created.')
        else:
            print(f'Admin user "{username}" already exists.')

if __name__ == '__main__':
    create_admin()
