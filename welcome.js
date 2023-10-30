// Your web app's Firebase configuration
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

// Listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User logged in: ", user);
    // Fetch additional details from Firebase Database
    var userRef = database.ref("users/" + user.uid);
    userRef.on("value", (snapshot) => {
      var data = snapshot.val();
      if (data) {
        document.getElementById("userName").textContent = data.full_name;
        document.getElementById("userEmail").textContent = data.email;
      }
    });
  } else {
    console.log("User logged out");
    // Redirect to login page
    window.location.href = "index.html";
  }
});

// Get logout button
const logoutButton = document.getElementById("logoutButton");

// Add logout event
if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful, redirect to login page.
        window.location.href = "index.html";
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  });
}
