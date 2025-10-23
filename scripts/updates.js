
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


document.getElementById("questionForm").addEventListener("submit", async (e) => {
    e.preventDefault();

  
    const question = document.getElementById("question");
    const optionA = document.getElementById("optionA");
    const optionB = document.getElementById("optionB");
    const optionC = document.getElementById("optionC");
    const optionD = document.getElementById("optionD");
    let correctAnswer = document.getElementById("correctAnswer").value;
    const examStatus = document.getElementById("examStatus").checked;
    const postNote = document.getElementById("postNote").value;

    alert(examStatus)
  
    try {
      await db.collection("Questions").add({
        question,
        options: {
          A: optionA.value,
          B: optionB.value,
          C: optionC.value,
          D: optionD.value,
        },
        correctAnswer,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  
      await db.collection('Updates').set({
        examStatus,
        postNote,
      })
  
      alert("Question uploaded successfully!");
      document.getElementById("questionForm").reset();
    } catch (error) {
      console.error("Error uploading question:", error);
      alert("Upload failed!");
    }
  });


  const statusRef = doc(db, "examStatus", "main");
  
  document.getElementById("exam-toggle").addEventListener("change", async (e) => {
    const isChecked = e.target.checked;
  
    try {
      await setDoc(statusRef, { status: isChecked });
      alert(`Exam status set to: ${isChecked ? "Open" : "Closed"}`);
    } catch (error) {
      console.error("Error updating exam status:", error.message);
    }
  });
  
  // Optionally load initial state
  (async () => {
    const snap = await getDoc(statusRef);
    if (snap.exists()) {
      document.getElementById("exam-toggle").checked = snap.data().status;
    }
  })();


  document.getElementById("update-post-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const postId = document.getElementById("post-id").value.trim();
    const newTitle = document.getElementById("post-title").value;
    const newContent = document.getElementById("post-content").value;
  
    const postRef = doc(db, "posts", postId);
  
    try {
      await updateDoc(postRef, {
        title: newTitle,
        content: newContent,
      });
  
      alert("Post updated successfully!");
    } catch (error) {
      console.error("Failed to update post:", error.message);
      alert("Update failed.");
    }
  });
  
  