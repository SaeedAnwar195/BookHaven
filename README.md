# 📚 BookHaven

**BookHaven** is a simple Flask web application developed by **Saeed Anwar** for managing an online book catalog platform with both administrative and user interfaces.

## 🚀 Features

- 🔐 User Authentication (Admin)
- 📘 Admin Dashboard for managing books and users
- 👤 User Dashboard to browse and view books
- 💾 SQLite Database Integration
- 📡 RESTful API support
- 📁 Clean project structure
- ✔️ Easy to run and extend

## 🧱 Project Structure

```
BookHaven/
├── app.py               # Main application entry point
├── api.py               # API routes
├── auth.py              # Authentication logic
├── create_admin.py      # Script to create admin user
├── database.py          # Database setup
├── models.py            # SQLAlchemy models
├── requirements.txt     # Python dependencies
├── instance/
│   └── book_haven.db    # SQLite database
├── static/
│   └── js/
│       ├── admin.js     # Admin-specific JavaScript
│       └── user.js      # User-specific JavaScript
├── templates/
│   ├── admin.html       # Admin dashboard
│   ├── login.html       # Login page
│   └── user.html        # User dashboard
```

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/SaeedAnwar195/BookHaven.git
   cd BookHaven/BookHaven
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate       # Do this for Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Access the app**
   Open your browser and go to: [http://127.0.0.1:5000](http://127.0.0.1:5000)

## 🛠️ Create Admin User

Run this command to create an admin user:

```bash
python create_admin.py
```

Follow the prompts to set up the username and password.

## 🧪 Technologies Used

- Python 3
- Flask
- Flask-SQLAlchemy
- SQLite
- HTML / CSS / JavaScript

## 🚀 Deployment

To deploy your Flask project on platforms like **Heroku**, **Render**, or **PythonAnywhere**, you may need to:
- Add a `Procfile`
- Create a `runtime.txt` (for Python version)
- Use a production-ready database (e.g., PostgreSQL)
- Configure environment variables

Let me know if you need help setting that up!

## 👨‍💻 Author

**Saeed Anwar**  
GitHub: [https://github.com/SaeedAnwar195](https://github.com/SaeedAnwar195/)

---

> “BookHaven – because every great mind deserves great book.”
