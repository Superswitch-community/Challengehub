///For payment requests

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
                    updateUserPaymentStatus(loggedInUserId, true);

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
        appendAlert("If your seeing this message , this means that you haven't paid", 'danger');
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


document.getElementById('payment-button').addEventListener('click', () => {

    payWithPaystack();
})