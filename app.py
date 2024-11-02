from flask import Flask, render_template, request, redirect, url_for, flash
import mysql.connector

app = Flask(__name__)
app.secret_key = 'Stock'  # Replace with a secure key in production

# Configure database connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="@Sp@sql123",
    database="Stock"
)

# Route for the login page
@app.route('/')
def login_page():
    return render_template('signin.html')  # Renders signin.html from the templates folder

# Route to handle login form submission
@app.route('/signin', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']

    cursor = db.cursor(dictionary=True)
    query = "SELECT * FROM users WHERE username = %s AND password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()
    cursor.close()

    if user:
        # Redirect to the dashboard or home page if login is successful
        return redirect(url_for('dashboard'))
    else:
        # Show error message if login fails
        flash('Invalid username or password')
        return redirect(url_for('login_page'))

# Route for a dashboard or home page after login
@app.route('/dashboard')
def dashboard():
    return "<h1>Welcome to the Stock Market Dashboard!</h1>"

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
