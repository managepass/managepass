function Strength(password) {
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
  
    if (/[A-Za-z0-8]/.test(password)) {
      i++;
    }
  
    return i;
  }
  
  let container = document.querySelector(".container");
  document.addEventListener("keyup", function (e) {
    let password = document.querySelector("#YourPassword").value;
  
    let strength = Strength(password);
    if (strength <= 2) {
      container.classList.add("weak");
      container.classList.remove("moderate");
      container.classList.remove("strong");
    } else if (strength >= 2 && strength <= 4) {
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
    updateStatus("Password has been previously cracked!");
  } else {
    updateStatus("");
  }

  return i;
}

function updateStatus(message) {
  document.getElementById('status').textContent = message;
}

let commonPasswords = [];
fetch('passwords.txt')
  .then(response => response.text())
  .then(data => {
    commonPasswords = data.split('\n');
  })
  .catch(error => {
    console.error('Error fetching the passwords file:', error);
  });

let container = document.querySelector(".container");
document.getElementById("YourPassword").addEventListener("keyup", function (e) {
  let password = e.target.value;
  let strength = Strength(password, commonPasswords);
  container.className = "container"; // Reset class list
  if (strength <= 2) {
    container.classList.add("weak");
  } else if (strength > 2 && strength <= 4) {
    container.classList.add("moderate");
  } else if (strength > 4) {
    container.classList.add("strong");
  }
});

let show = document.querySelector(".show");
show.onclick = function () {
  let password = document.getElementById("YourPassword");
  if (password.type === "password") {
    password.type = "text";
    show.classList.add("hide");
  } else {
    password.type = "password";
    show.classList.remove("hide");
  }
};

