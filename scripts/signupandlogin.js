// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

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
const signupButton = document.querySelector('.signup-button')
const loginButton = document.querySelector('.login-button')
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


signupButton.addEventListener('click', (e) => {

                const reference = 'REF-' + Math.random().toString(36).substring(2, 9) + Date.now();
                 e.preventDefault();

                //storing user's email and password
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                const auth = getAuth();
                const db = getFirestore();

                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredentail) => {
                        const user = userCredentail.user;
                        const userData = {
                            email: email,
                            paymentStatus: false,
                            examCount: 0,
                            userResult: "0%",
                            reference: `${reference}`,
                        };
                        showPopUpMessage("Account Created Successfully");
                        setTimeout(() => {
                            showPopUpMessage('You are redirected to pay!!!');
                            payWithPaystack(reference);
                        }, 2000);

                        const docRef = doc(db, "users", user.uid);
                        setDoc(docRef, userData)
                            .then(() => {
                                showPopUpMessage('Document has been written!!!');

                            })
                            .catch((error) => {
                                showPopUpMessage("error writing document");
                            })
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        if (errorCode == 'auth/email-already-in-use') {
                            showPopUpMessage('Email Address Already Exists!!!');
                        }
                        else {
                            showPopUpMessage('Unable to create user check your network connection or fill in all details');
                        }
                    })

})



loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const auth = getAuth();


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            const user = userCredentail.user;
            showPopUpMessage('Login Successful');
            loginForm.style.display = 'none';
            localStorage.setItem('loggedInUserRef', user.reference);
            location.href = 'exampage.html';

        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/invalid-credential") {
                showPopUpMessage("Incorrect Email or password");
            }
            else {
                showPopUpMessage("Account does not Exist !!! or check your internet connection");
            }
        })




})



//Check the number of users
const usersRef = collection(db, 'users');

getDocs(usersRef)
    .then((QuerySnapshot) => {
        const userCount = QuerySnapshot.size;
        console.log(`Users count: ${userCount}`);
    })

//Delete all users at my decision
/* db.collection('users').get()
.then((QuerySnapshot) => {
    QuerySnapshot.forEach(doc => {
        doc.ref.delete();
    });
})
.then(() => {
    alert('Users deleted');
})
.catch(error => {
    console.error('Error deleting users', error);
}) 
 */
const startExamButton = document.getElementById('startExam');


/*  startExamButton.addEventListener('click', () => {
    
    const auth = getAuth();
    const db = getFirestore();

    onAuthStateChanged(auth, (user) => {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if(loggedInUserId) {
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap) => {
            if(docSnap.exists()) {
                const userData = docSnap.data();
                let examCount = userData.examCount;
                
                if(userData.examCount >= 2) {
                     alert('you have reached the limit for your exam')
                    
                }
                else  {
             updateDoc(docRef, {
                examCount: examCount++,
             })
             alert('You can start your test till you reached your limit')
             console.log(examCount);
                }
        
            }
            else {
                alert('No documnent found matching Id');
            }
        })
        .catch((error) => {
            console.log(error);
        })
       
    }
    else {
        alert('User Id not found in local storage')
    }
})
}) 
 */



startExamButton.addEventListener('click', async () => {
    const loggedInUserRef = localStorage.getItem('loggedInUserRef');

    try {
        const docRef = doc(db, "users", loggedInUserRef);
        //Get current examCount
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const examCount = docSnap.data().examCount;

            //check if the exacount exceeds 2
            if (examCount >= 2) {
                showPopUpMessage('You have exceeded the maximum attempts');
                return;
            }

            //increment examcount
            await updateDoc(docRef, {
                examCount: increment(1),
            });

            //upload successful
            alert('Exam uploaded successfully');
            console.log(examCount);
        }
        else {
            //handle user document not found
            console.log('User document not found');
        }

    } catch (error) {
        console.error('Error uploading exam', error);
    }
}) 