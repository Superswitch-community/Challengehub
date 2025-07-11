//For payment requests

async function payWithPaystack() {
    const email = document.getElementById('email').value;
    const loggedInUserId = localStorage.getItem('loggedInUserId');

   
    const payloadData = {
        "currency": "NGN",
        "amount": 1050 * 100,
        "email": email,
        "callback_url": "https://superswitch-community.github.io/Challengehub/",
        "reference": reference,
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
                //redirect the user to the authorization URL
                window.location.href = authorizationUrl;

            const docRef = doc(db, "users", loggedInUserId);
            
            const docSnap =  getDoc(docRef);
            if (docSnap.exists()) {

                
                //update user's reference
                 updateDoc(docRef, {
                    reference: reference,
                });
    
          }
            else {
                //handle user document not found
                console.log('User document not found');
            }    
                
            }
            else {
                console.error("Authorization URL not found in response");
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        })
}

const urlParams = new  URLSearchParams(window.location.search);
const reference = urlParams.get('reference')

async function verifyPayment(reference) {
    /* const urlParams = new URLSearchParams(window.location.search);
    const reference = urlParams.get('reference'); */

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

                     //Check user's reference

                    const loggedInUserRef = localStorage.getItem('loggedInUserRef');
                    const docRef = doc(db, "users", loggedInUserRef);

                    //Check whether user's data exist
                    const docSnap = getDoc(docRef);
                    if (docSnap.exists()) {
                        //Update user's payment status
                        updateDoc(docRef, {
                            paymentStatus: true,
                        });
                    }
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
        showPopUpMessage('Refrence not found please singup again');
    }
}

verifyPayment(reference);