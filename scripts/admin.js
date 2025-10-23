
// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";


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



adminSubmitbtn.addEventListener('click', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('admin-email').value;
    const password = document.getElementById('admin-password').value;
  
  
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentail) => {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
  
  
  
        const docRef = doc(db, 'users', userId);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              location.href = "updates.html"
            } else {
              showPopUpMessage('Account does not Exist !!!😐')
            }
          }).catch(error => {
            showPopUpMessage('No Account Found', error);
          })
  
  
  
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/invalid-credential") {
          showPopUpMessage("Invalid Email or password");
        }
        else {
          showPopUpMessage("check your internet connection");
        }
      })
  
  
  })