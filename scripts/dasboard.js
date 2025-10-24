// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
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



onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "./login.html"; // redirect if not signed in
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
    localStorage.removeItem("LoggedInUserId");
    localStorage.removeItem("LoggedInEmail");
    

    // Redirect to login page
    window.location.href = "./index.html";

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
  let challengeCategory = document.getElementById('dashboard-category');
  let challengeEmail = document.getElementById('dashboard-email');
  let challengePaymentStatus = document.getElementById('dashboard-payment-status');
  let challengePaymentStatusTwo = document.getElementById('dashboard-payment-status-2');
  let challengeExamCount = document.getElementById('dashboard-challengecount');
  let challengeScore = document.getElementById('challenge-score');
  let challengeIsQualified = document.getElementById('challenge-qualified');
  let welcomeMessage = document.getElementById('dashboard-welcome');
  let challengeWelcome = document.getElementById('dashboard-welcome');
  let dashboardId = document.getElementById('dashboard-id');
  let dashboardName = document.getElementById('dashboard-name');


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
        var Challengecategory = userData.category;
        var score = userData.result;
        var paymentStatus = userData.paymentStatus;
        let examCount = 2;


       
        /* challengeScore.innerText = `Score: ${score}`;*/
        challengePaymentStatusTwo.innerText = `Payment status: ${paymentStatus}`;
        challengePaymentStatus.innerText = `Payment status: ${paymentStatus}`;
        welcomeMessage.innerText = `Hi ${firstName}`;
        dashboardName.innerText = `FullName: ${surName} ${firstName} ${otherNames}`;
        challengeWelcome.innerText = `Hi ${firstName}`;
        challengeCategory.innerText = `Category: ${Challengecategory}`;
    
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


/*
<script>
  let questionsData = [];

  async function loadQuestions() {
    const form = document.getElementById("answerForm");
    form.innerHTML = "<p>Loading questions...</p>";

    try {
      const snapshot = await db.collection("examQuestions").where("examStatus", "==", true).get();
      questionsData = [];

      if (snapshot.empty) {
        form.innerHTML = "<p>No active questions found.</p>";
        return;
      }

      form.innerHTML = "";

      snapshot.forEach((doc, index) => {
        const data = doc.data();
        questionsData.push({ id: doc.id, ...data });

        const questionHtml = `
          <div class="question-block">
            <p><strong>Q${index + 1}: ${data.question}</strong></p>
            ${Object.entries(data.options)
              .map(([key, value]) => `
                <label>
                  <input type="radio" name="q${index}" value="${key}" required />
                  ${key}: ${value}
                </label><br>
              `)
              .join("")}
            <br>
          </div>
        `;

        form.innerHTML += questionHtml;
      });
    } catch (error) {
      console.error("Error loading questions:", error);
      form.innerHTML = "<p>Error loading questions.</p>";
    }
  }

  loadQuestions();
</script>


<script>
  function submitAnswers() {
    const form = document.getElementById("answerForm");
    const resultDiv = document.getElementById("result");

    let score = 0;
    let total = questionsData.length;

    questionsData.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${index}"]:checked`);
      if (selected && selected.value === q.correctAnswer) {
        score++;
      }
    });

    resultDiv.innerHTML = `<h3>You scored ${score} out of ${total}</h3>`;
  }
</script>


<body>
  <h2>Answer Exam Questions</h2>
  <form id="answerForm"></form>

  <button onclick="submitAnswers()">Submit Answers</button>

  <div id="result"></div>
</body>

 */



