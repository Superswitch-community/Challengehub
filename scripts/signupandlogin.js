// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import {payWithPaystack} from "./payment.js";


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

    /* const reference = 'REF-' + Math.random().toString(36).substring(2, 9) + Date.now(); */
    e.preventDefault();
    signupButton.disabled = true;

    //storing user's email and password
   const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            const user = userCredentail.user;
            const userData = {
                email: email,
                paymentStatus: false,
                examCount: 0,
                userResult: "0%",
            };
            signupButton.disabled = false;
            localStorage.setItem('loggedInUserId', user.uid);
            showPopUpMessage("Account Created Successfully");
            setTimeout(() => {
                showPopUpMessage('You are redirected to pay!!!');
                payWithPaystack();
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
                signupButton.disabled = false;
            }
            else {
                showPopUpMessage('Unable to create user check your network connection or fill in all details');
                signupButton.disabled = false;
            }
        })

})



loginButton.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    localStorage.setItem('useremail', email);


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredentail) => {
            const currentUser = auth.currentUser;
            const userId = currentUser.uid;
          
           

            const docRef = doc(db, 'users', userId);
            getDoc(docRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const paymentStatus = docSnap.data().paymentStatus;
                        console.log(paymentStatus);
                        if (paymentStatus === true) {       1``
                            showPopUpMessage('Login Successful');
                            loginForm.style.display = 'none';
                            location.href = 'exampage.html';
                        } else {
                            showPopUpMessage("You haven't paid 😗. Oops your access is restricted😐");
                        }
                    }else {
                        showPopUpMessage('Account does not Exist !!!😐')
                    }
                }).catch(error => {
                    showPopUpMessage('Error checking payment status', error);
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



//Check the number of users
  const usersRef = collection(db, 'users');

getDocs(usersRef)
    .then((QuerySnapshot) => {
        const userCount = QuerySnapshot.size;
        console.log(`Users count: ${userCount}`);
    }) 

//Delete all users at my decision
/* collection('users').get()
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
})  */
  
/* const usersCol = collection(db, 'users');

const deleteAllUsers = async () => {
    const querySnapshot = await getDocs(usersCol);
    querySnapshot.forEach(async (docSnap) => {
        await deleteDoc(doc(db,'users', docSnap.id))
    });
}

deleteAllUsers();
 */
/* const usersColl = collection(db,'users')
getDocs(usersColl)
.then(querySnapshot => {
    if(querySnapshot.empty) {
        console.log('No more users in your database');
    }else {
        console.log('There are still users')
    }
}) */

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





/* startExamButton.addEventListener('click', () => {

    const isUploading = false;

    try {

        onAuthStateChanged(auth, (user) => {
            const userId = user.uid;
            if (userId) {
                const docRef = doc(db, "users", userId);
                getDoc(docRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            let examCount = userData.examCount;

                            if (isUploading) {
                                showPopUpMessage('Oops!! 😮Examination will not upload till the date of Examination');

                            }
                             else {
                                    //increment examcount
                                    updateDoc(docRef, {
                                        examCount: increment(1),
                                    });

                                    if (gradeInput.value >= 4 && gradeInput <= 6) {
                                        startPrimaryExam();
                                    } else if (gradeInput.value >= 7 && gradeInput <= 9) {
                                        startJuniorExam();
                                    } else if (gradeInput.value >= 10 && gradeInput <= 12) {
                                        startSeniorExam();
                                    }
                                    //check if the exacount exceeds 2
                                    else if (examCount >= 2) {
                                        showPopUpMessage('You have exceeded the maximum attempts');
                                        return;
                                    }

                                    //upload successful
                                    showPopUpMessage('Exam uploaded successfully');
                                    showPopUpMessage('Check your connection');
                                    console.log(examCount);
                                }

                        }
                        else {
                            //handle user document not found
                            console.log('User document not found');
                        }


                    })
            }

        })
    }
    catch (error) {
        showPopUpMessage('Error uploading exam', error);
    }
}); 
 */

/*  onAuthStateChanged(auth, (user) => {
   const userId = user.uid;
   if(userId) {
       const docRef = doc(db, "users", userId);
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

}); */