//For payment requests
document.addEventListener('DOMContentLoaded', HandleCallback);

export async function payWithPaystack() {
    const email = document.getElementById('email').value;
    const loggedInUserId = localStorage.getItem('loggedInUserId');


    const payloadData = {
        "currency": "NGN",
        "amount": 1050 * 100,
        "email": email,
        "callback_url": "https://superswitch-community.github.io/Challengehub/",
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



                /*   const docRef = doc(db, "users", loggedInUserId);
                  
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
                  }     */

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

/* const urlParams = new  URLSearchParams(window.location.search);
const reference = urlParams.get('reference') */


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
                    const loggedInUserId = localStorage.getItem('loggedInUserId');
                    updateUserPaymentStatus(loggedInUserId, "true");

                    //Check user's Id

                    /*    const loggedInUserId = localStorage.getItem('loggedInUserId');
                       const docRef = doc(db, "users", loggedInUserId);
   
                       //Check whether user's data exist
                       const docSnap = getDoc(docRef);
                       if (docSnap.exists()) {
                           const paymentstatus = docSnap.data().paymentStatus;
                           //Update user's payment sta7tus
                           updateDoc(docRef, {
                               paymentStatus: true,
                           });
                           return paymentstatus
                       } */
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
        showPopUpMessage('Your reference has not been generated please signup and pay at the same time or else 😮 the account you created will be useless and will not be used again');
    }
}


const updateUserPaymentStatus = async (userId, paymentStatus) => {
    try {
        const userRef = doc('users', userId);
        await updateDoc(userRef, {
            paymentStatus: paymentStatus
        });
        showPopUpMessage("User payment status updated");
    } catch (error) {
        showPopUpMessage("Error updating user payment status");
    }
}