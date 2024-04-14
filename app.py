import os
import re
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

# Function to check if the password is used
def is_password_used(password, password_list):
    return password in password_list

# Function to calculate the strength of the password
def password_strength(password):
    strength = 0
    length = len(password)

    # Check length
    if length >= 8:
        strength += 1
    if length >= 12:
        strength += 1
    if length >= 16:
        strength += 1

    # Check if it contains numbers, lowercase, uppercase, and special characters
    if re.search(r"\d", password):
        strength += 1
    if re.search(r"[a-z]", password):
        strength += 1
    if re.search(r"[A-Z]", password):
        strength += 1
    if re.search(r"[!@#$%^&*()-_=+{};:,<.>]", password):
        strength += 1

    return strength

# Function to suggest stronger passwords
def suggest_passwords(password):
    suggestions = [
        password + "123",
        password + "!",
        password + "2023",
        "!" + password + "!",
        "!" + password + "123",
        password.upper(),
        password.lower(),
        password.capitalize()
    ]
    return suggestions

# Main route for password strength checker
@app.route('/check_password', methods=['POST'])
def check_password():
    data = request.form
    password = data.get('password')
    
    # Get path to the Downloads directory
    downloads_path = os.path.join(os.path.expanduser("~"), "Downloads")
    
    # Construct the full path to the passwords file
    passwords_file = os.path.join(downloads_path, "passwords.txt")

    # Check if the passwords file exists
    if not os.path.exists(passwords_file):
        return jsonify({'message': 'Passwords file not found in the Downloads directory.'}), 404

    # Load password list from file
    with open(passwords_file, "r") as file:
        password_list = file.read().splitlines()

    # Check if password is used
    if is_password_used(password, password_list):
        return jsonify({'message': 'Your password has been compromised! Please choose a different one.'}), 400
    else:
        # Calculate password strength
        strength = password_strength(password)
        if strength < 3:
            # If password is not strong enough, suggest stronger passwords
            suggestions = suggest_passwords(password)
            return jsonify({'message': 'Your password is not strong enough.', 'suggestions': suggestions}), 200
        else:
            return jsonify({'message': 'Your password is strong enough.'}), 200

# Route for rendering the index HTML template
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
