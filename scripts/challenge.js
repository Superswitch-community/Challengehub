// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment, deleteDoc, getCountFromServer } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { startDemo } from './democode.js'

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



onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html"; // redirect if not signed in
    }
});



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
        window.location.href = "/index.html";

        console.log("User signed out successfully.");
    } catch (error) {
        console.error("Error signing out:", error.message);
        appendAlert("Sign out failed. Please try again.", 'danger');
    }
});


// Listen for auth state
onAuthStateChanged(auth, async (user) => {


    //Initiializing challengeboard and results board

    let challengeName = document.getElementById('challenge-name');
    let challengeCategory = document.getElementById('challenge-category');
    let challengeEmail = document.getElementById('challenge-email');
    let challengePaymentStatus = document.getElementById('challenge-payment-status');
    let challengeExamCount = document.getElementById('challenge-challengecount');
    let welcomeMessage = document.getElementById('challenge-welcome');
    var dashboardPaymentStatus = document.getElementById('dashboard-payment-status');

    //Assume the category is saved in localStorage during login
    let category = localStorage.getItem("category");
    if (user) {
        const uid = user.uid;

        /*     dashboardId.innerText = `UserId: ${uid}`; */

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
                let challengeCount = userData.challengeCount;
                var surName = userData.surname
                let firstName = userData.firstname;
                let otherNames = userData.othernames;
                let email = userData.email;
                var userCategory = userData.category;
                var paymentStatus = userData.paymentStatus;
                var examCount = 2;


                challengeName.innerText = `Username: ${surName} ${firstName} ${otherNames}`;
                challengeCategory.innerText = `Category: ${userCategory}`;
                challengeEmail.innerText = `Email: ${email}`;
                challengePaymentStatus.innerText = `Paid: ${paymentStatus}`;
                welcomeMessage.innerText = `Welcome ${firstName}`;
                challengeExamCount.innerText = `Attempts: ${challengeCount}/2`;
                dashboardPaymentStatus.innerText = `Payment status: ${paymentStatus}`;




                //Initialize exam status
                const isNotUploading = false;

                var beginButton = document.getElementById('start-button');


                beginButton.addEventListener('click', () => {

                    beginButton.disabled = true;
                    beginButton.innerHTML = `
        <div class="spinner-border-sm spinner-border-md spinner-border-lg spinner-border-xl spinner-border" role="status">
        <span class="sr-only"></span>
      </div>`
                    if (isNotUploading) {
                        appendAlert('Oops!! 😮Examination will not upload till the date of Examination', 'danger');
                        beginButton.disabled = false;
                        beginButton.innerHTML = 'Begin Test';
                    }
                    else {

                        if (paymentStatus === false) {
                            appendAlert("Oops!! 😮You can't take till you complete your payment", 'danger')
                        }
                        else { 
                            if (challengeCount >= examCount) {
                                appendAlert('You have exceeded the maximum attempts', 'danger');
                                beginButton.innerHTML = 'Maximum attempts reached';
                                beginButton.disabled = false;
                                beginButton.classList.add('btn');
                                beginButton.classList.add('btn-danger')
                            }
                            else {


                                let category = localStorage.getItem("category");
                                if (category === "primary") {
                                    location.href = './primaryexam.html'
                                }
                                else if (category === "junior") {
                                    location.href = './juniorexam.html'
                                }
                                else if (category === "senior-science") {
                                    location.href = './seniorexam.html'
                                }

                            }
                             } 


                    }

                })

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


