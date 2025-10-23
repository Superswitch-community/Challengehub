// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { appendAlert } from "./alert.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbFVn9wUxFnqrW8qDD09hlcPebkPShDuY",
  authDomain: "login-project-3e591.firebaseapp.com",
  projectId: "login-project-3e591",
  storageBucket: "login-project-3e591.firebasestorage.app",
  messagingSenderId: "415326082872",
  appId: "1:415326082872:web:fd9918e92abc81a6ba53cd"
};

//accessing the singup and login buttons
var signupButton = document.getElementById('signup-button')
var loginButton = document.getElementById('login-button')
var adminSubmitbtn = document.getElementById('admin-button');
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

import { startDemo } from "./examcode.js";

startDemo('/json files/juniorexamination.json', 20, 'submit-btn', 'exampleModal1');

window.addEventListener('beforeunload', (e) => {
    const confirmationMessage = 'Are you sure you want to leave this page to end the exam?';
    e.preventDefault();
    e.returnValue = '';
   return confirmationMessage;
})



// Listen for auth state
onAuthStateChanged(auth, async (user) => {

  //Assume the category is saved in localStorage during login
  let category = localStorage.getItem("category");
  if (user) {
      const uid = user.uid;
      if (!category) {
          appendAlert("No category info found. Please login again.", 'danger');
          return;
      }

      try {
          // Get user's data from the category collection
          const docRef = doc(db, category, uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            //increment examcount
            updateDoc(docRef, {
               challengeCount: increment(1),
           });


          } else {
              appendAlert("User data not found in Firestore.", 'danger');
          }
      } catch (error) {
          console.error("Error fetching user data:", error.message);

      }
  } else {
      // Not logged in
      window.location.href = "login.html"; // redirect to login
  }
});
