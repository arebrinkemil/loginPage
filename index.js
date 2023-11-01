var firebaseConfig = {
  apiKey: "AIzaSyDqVxDsnFHOIRIRUySZW3yngUCoSaHbl3w",
  authDomain: "loginpage-5820f.firebaseapp.com",
  databaseURL:
    "https://loginpage-5820f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "loginpage-5820f",
  storageBucket: "loginpage-5820f.appspot.com",
  messagingSenderId: "465705589202",
  appId: "1:465705589202:web:5c17d45c9122945889d00b",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

function register() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  passwordCheck = document.getElementById("passwordCheck").value;
  full_name = document.getElementById("full_name").value;

  if (
    validate_email(email) == false ||
    validate_password(password, passwordCheck) == false
  ) {
    alert("Email or Password is Outta Line!!");
    return;
  }
  if (validate_field(full_name) == false) {
    alert("One Field is Outta Line!!");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      var user = userCredential.user;
      var database_ref = database.ref();
      var user_data = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).set(user_data);
      alert("User Created!!");
      window.location.href = "index.html";
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

function login() {
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  if (
    validate_email(email) == false ||
    validate_password_login(password) == false
  ) {
    alert("Email or Password is Outta Line!!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      var user = auth.currentUser;
      var database_ref = database.ref();
      var user_data = {
        last_login: Date.now(),
      };
      database_ref.child("users/" + user.uid).update(user_data);
      alert("User Logged In!!");
      window.location.href = "welcome.html";
    })
    .catch(function (error) {
      var error_code = error.code;
      var error_message = error.message;
      alert(error_message);
    });
}

function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    return true;
  } else {
    return false;
  }
}

function validate_password_login(password) {
  if (password.length >= 6) {
    return true;
  } else {
    return false;
  }
}

function validate_password(password, passwordCheck) {
  if (password.length >= 6 && password === passwordCheck) {
    return true;
  } else {
    return false;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }
  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

function regPage() {
  window.location.href = "register.html";
}

function logPage() {
  window.location.href = "index.html";
}
