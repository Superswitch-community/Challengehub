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



document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  signupButton.innerHTML = `<div class="spinner-border-sm spinner-border-md spinner-border-lg spinner-border-xl spinner-border" role="status">
        <span class="sr-only"></span>
      </div>`

  const firstname = document.getElementById("firstname").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const othernames = document.getElementById("othernames").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const category = document.getElementById("category").value;


  if (!category) {
    appendAlert("Please select a category.", 'danger');
    return;
  }

  try {
    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save to dynamic collection (primary/junior/senior)
    await setDoc(doc(db, category, user.uid), {
      firstname,
      surname,
      othernames,
      email,
      category,
      paymentStatus: false,
      challengeCount: 0,
      result: 0,
      qualified: null,
      createdAt: new Date().toISOString()
    });

    appendAlert("User registered successfully in " + category + " category!", 'success');
     signupButton.innerHTML = `signup`
    document.getElementById("signup-form").reset();
  } catch (error) {
    const errorCode = error.code;
    if (errorCode == 'auth/email-already-in-use') {
      appendAlert('Email Address Already Exists!!!', 'danger');
      signupButton.disabled = false;
      signupButton.innerHTML = `signup`
    }
    else {
      appendAlert('Unable to create user check your network connection', 'danger');
      signupButton.innerHTML = `signup`
      signupButton.disabled = false;
    }
  }

  return false;
});


/*
//Check the number of users
const usersRef = collection(db, 'junior');

getDocs(usersRef)
  .then((QuerySnapshot) => {
    const userCount = QuerySnapshot.size;
    console.log(`Users count: ${userCount}`);
  })

 
//Check the number of users
const usersRef = collection(db, 'senior');

getDocs(usersRef)
  .then((QuerySnapshot) => {
    const userCount = QuerySnapshot.size;
    console.log(`Users count: ${userCount}`);
  })

  */



