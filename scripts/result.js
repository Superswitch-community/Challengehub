// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment, deleteDoc, getCountFromServer } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { startDemo } from './examcode.js'

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

/* document.getElementById('submit-btn').addEventListener('click', () => {
  location.href = "primaryexam.js";
  startDemo('/public/json files/primaryexamination.json', 30, 'submit-btn', 'demo-score', 'exampleModal1')
}) */


/* onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html"; // redirect if not signed in
  }
});

 */

const appendAlert = (message, type) => {

    let wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')
    let alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    alertPlaceholder.append(wrapper);
}



// Handle sign out button click
document.getElementById("signout-button").addEventListener("click", async (e) => {
    e.preventDefault();
    
    try {
        await signOut(auth);

        // Clear any stored data (like category in localStorage)
        localStorage.removeItem("category");

        // Redirect to login page
        window.location.href = "index.html";

        appendAlert("User signed out successfully.", 'danger');
    } catch (error) {
        console.error("Error signing out:", error.message);
        appendAlert("Sign out failed. Please try again.", 'danger');
    }
});

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

                const userData = docSnap.data();
                var score = userData.result;
                var paymentStatus = userData.paymentStatus;

                //Check the number of users
                const usersRef = collection(db, `${category}`);
                var challengePaymentStatus = document.getElementById('dashboard-payment-status');



                getDocs(usersRef)
                    .then((QuerySnapshot) => {
                        const userCount = QuerySnapshot.size;
                        let challengeTotalUsers = document.getElementById('challenge-total-users');
                        challengeTotalUsers.innerText = `Total Users: ${userCount}`;
                    })



                let challengeScore = document.getElementById('challenge-score');


                challengeScore.innerText = `User's score: ${score}`;
                challengePaymentStatus.innerText = `Payment status: ${paymentStatus}`;

            } else {
                appendAlert("User data not found in Firestore.", 'danger');
            }
        } catch (error) {
            console.error("Error fetching user data:", error.message);

        }
    } else {
        // Not logged in
        window.location.href = "./login.html"; // redirect to login
    }
});

