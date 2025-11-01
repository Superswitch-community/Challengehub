// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Handle login form
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  loginButton.innerHTML = `
  <div class="spinner-border-sm spinner-border-md spinner-border-lg spinner-border-xl spinner-border" role="status">
  <span class="sr-only"></span>
</div>`
  loginButton.disabled = true;

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const category = document.getElementById("login-category").value;

  if (!category) {
    appendAlert("Please select a category.", 'danger');
    return;
  }

  try {
    // Step 1: Sign in with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    var userId = user.id;

    // Step 2: Check if user exists in selected category collection
    const userDocRef = doc(db, category, user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      // ✅ Login successful and category match
      localStorage.setItem("category", category);
      localStorage.setItem('LoggedInEmail', email);
      localStorage.getItem('LoggedInUserId', userId);
      appendAlert("Login successful!", 'success);
      location.href = './dashboard.html'
      // Continue to dashboard or homepage
    } else {
      // ❌ User exists in Auth but not in the selected category
      await signOut(auth);
      appendAlert("Login failed: User does not belong to selected category.", 'danger');
      loginButton.innerHTML = "Login"
      loginButton.disabled = false;
    }
  } catch (error) {
    appendAlert(`Login error: ${error.message}`, 'danger');
    loginButton.innerHTML = "Login"
    loginButton.disabled = false;
  }
});


