// Import the functions you need from the SDKs you need
//Creating database and storing users' data
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

//TODO: Add SDKs for Firebase products that you want to use
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();



//For payment requests

//For alerts initialization...
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


//For payment requests
document.addEventListener('DOMContentLoaded', HandleCallback);

async function payWithPaystack() {
    const email = localStorage.getItem('LoggedInEmail');
    const loggedInUserId = localStorage.getItem('LoggedInUserId');

    console.log(loggedInUserId)

    const payloadData = {
        "currency": "NGN",
        "amount": 1500 * 100,
        "email": email,
        "callback_url": "https://superswitch-community.github.io/Challengehub/dashboard.html",
        "metadata": {
            userId: loggedInUserId,
        }
    }

    //POST a request
    await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer sk_live_b33ab58790bafa96882057ab27ada6ab3b955d2e",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        body: JSON.stringify(payloadData)
    })
        .then(response => {
            //check if the response was successful
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json();
        })
        .then(data => {
            //work with the JSON data 
            //check if authorization  url is available
            if (data && data.status === true && data.data && data.data.authorization_url) {
                const authorizationUrl = data.data.authorization_url;
                const reference = data.data.reference;
                localStorage.setItem('reference', reference);
                //redirect the user to the authorization URL
                window.location.href = authorizationUrl;



            }
            else {
                console.error("Authorization URL not found in response");
            }


        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        })
}

async function HandleCallback() {
    const reference = localStorage.getItem('reference');
    verifyPayment(reference);
    localStorage.removeItem('reference');
}


async function verifyPayment(reference) {


    if (reference) {
        fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer sk_live_b33ab58790bafa96882057ab27ada6ab3b955d2e'
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.status === "success") {
                    showPopUpMessage('Payment Successful');
                    const loggedInUserId = localStorage.getItem('loggedInUserId');
                    const category = localStorage.getItem("category");
                    updateUserPaymentStatus(category, loggedInUserId, true);

                }
                else {
                    showPopUpMessage('Payment Failed');
                }
            })
            .catch(error => {
                console.error(error);
                showPopUpMessage('Verification Error');
            })
    }
    else {
        //appendAlert("If your seeing this message , this means that you haven't paid", 'danger');
    }
}


const updateUserPaymentStatus = async (category, userId, paymentStatus) => {
    try {
        // Get user's data from the category collection
        const docRef = doc(db, `${category}`, `${userId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // and update the user's payment status
            await updateDoc(docRef, {
                paymentStatus: paymentStatus
            });
            appendAlert("User payment status updated", 'success');
        }else{
            appendAlert('User data not found', 'danger')
        }

    } catch (error) {
        appendAlert("Error updating user payment status", 'danger');
    }
}


document.getElementById('payment-button').addEventListener('click', () => {
    payWithPaystack();
})

