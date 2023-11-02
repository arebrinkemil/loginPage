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

var storage = firebase.storage();
const auth = firebase.auth();
const database = firebase.database();
const uploadButton = document.getElementById("uploadButton");

auth.onAuthStateChanged((user) => {
  if (user) {
    var userRef = database.ref("users/" + user.uid);
    userRef.on("value", (snapshot) => {
      var data = snapshot.val();
      if (data) {
        document.getElementById("userName").textContent = data.full_name;
        document.getElementById("userEmail").textContent = data.email;

        var userImagesRef = database.ref("users/" + user.uid + "/images");
        userImagesRef.on("value", function (snapshot) {
          // Clear previous images
          var imageContainer = document.getElementById("userImagesContainer");
          imageContainer.innerHTML = "";

          snapshot.forEach(function (childSnapshot) {
            var imageMetadata = childSnapshot.val();
            var imageUrl = imageMetadata.url;

            var img = document.createElement("img");
            img.src = imageUrl;

            imageContainer.appendChild(img);
          });
        });
      }

      // Add the upload button event listener here
      var uploadButton = document.getElementById("uploadButton");
      if (uploadButton) {
        uploadButton.addEventListener("click", function () {
          var fileInput = document.getElementById("fileInput");
          var file = fileInput.files[0];
          if (file) {
            var storageRef = storage.ref("images/" + file.name);

            var uploadTask = storageRef.put(file);

            uploadTask.on(
              "state_changed",
              function (snapshot) {
                // Update progress here if needed
              },
              function (error) {
                console.error(error);
              },
              function () {
                uploadTask.snapshot.ref
                  .getDownloadURL()
                  .then(function (downloadURL) {
                    console.log("File available at", downloadURL);

                    // Create a reference to the user's images in the database
                    var userImagesRef = database.ref(
                      "users/" + user.uid + "/images"
                    );

                    // Create image metadata
                    var imageMetadata = {
                      url: downloadURL,
                      timestamp: firebase.database.ServerValue.TIMESTAMP,
                    };

                    // Push the image metadata to the user's images in the database
                    userImagesRef.push(imageMetadata);
                  });
              }
            );
          }
        });
      }

      // Continue your code here, including the logout functionality
      // You can access the `user` variable here
    });
  } else {
    console.log("User logged out");
    window.location.href = "index.html";
  }
});

const logoutButton = document.getElementById("logoutButton");

if (logoutButton) {
  logoutButton.addEventListener("click", function () {
    auth
      .signOut()
      .then(() => {
        window.location.href = "index.html";
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
var user = firebase.auth().currentUser;
if (user) {
  if (uploadButton) {
    uploadButton.addEventListener("click", function () {
      var fileInput = document.getElementById("fileInput");
      var file = fileInput.files[0];
      if (file) {
        var storageRef = storage.ref("images/" + file.name);

        var uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          function (snapshot) {
            // Update progress here if needed
          },
          function (error) {
            console.error(error);
          },
          function () {
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function (downloadURL) {
                console.log("File available at", downloadURL);

                // Create a reference to the user's images in the database
                var userImagesRef = database.ref(
                  "users/" + user.uid + "/images"
                );

                // Create image metadata
                var imageMetadata = {
                  url: downloadURL,
                  timestamp: firebase.database.ServerValue.TIMESTAMP,
                };

                // Push the image metadata to the user's images in the database
                userImagesRef.push(imageMetadata);
              });
          }
        );
      }
    });
  }
} else {
  // No user is signed in, handle this case
}
