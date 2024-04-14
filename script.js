function Strength(password, commonPasswords) {
  let i = 0;
  if (password.length > 6) {
    i++;
  }
  if (password.length >= 10) {
    i++;
  }

  if (/[A-Z]/.test(password)) {
    i++;
  }

  if (/[0-9]/.test(password)) {
    i++;
  }

  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    i++;
  }

  // Check if password is common
  if (commonPasswords.includes(password)) {
    i = 0; // Consider common passwords as weak regardless of other criteria
  }

  return i;
}

let commonPasswords = [];
// Fetch the list of common passwords from the server
fetch('passwords.txt')
  .then(response => response.text())
  .then(data => {
    commonPasswords = data.split('\n'); // Assuming each password is on a new line
  })
  .catch(error => {
    console.error('Error fetching the passwords file:', error);
  });

let container = document.querySelector(".container");
document.addEventListener("keyup", function (e) {
  let password = document.querySelector("#YourPassword").value;

  let strength = Strength(password, commonPasswords);
  if (strength <= 2) {
    container.classList.add("weak");
    container.classList.remove("moderate");
    container.classList.remove("strong");
  } else if (strength > 2 && strength <= 4) {
    container.classList.remove("weak");
    container.classList.add("moderate");
    container.classList.remove("strong");
  } else {
    container.classList.remove("weak");
    container.classList.remove("moderate");
    container.classList.add("strong");
  }
});

let password = document.querySelector("#YourPassword");
let show = document.querySelector(".show");
show.onclick = function () {
  if (password.type === "password") {
    password.setAttribute("type", "text");
    show.classList.add("hide");
  } else {
    password.setAttribute("type", "password");
    show.classList.remove("hide");
  }
};
