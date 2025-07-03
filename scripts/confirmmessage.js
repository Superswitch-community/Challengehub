   function confirmDialog(message) {
            const confirmMessage = document.getElementById('confirm-message');
            const confirmContainer = document.querySelector('.confirm-container');
            const okButton = document.getElementById('confirm-ok');
            const noButton = document.getElementById('confirm-no');


            confirmMessage.textContent = message;
            confirmContainer.style.display = 'flex';


            return new Promise((resolve) => {
                okButton.addEventListener('click', () => {
                    confirmContainer.style.display = 'none';

                    resolve(true);
                })

                noButton.addEventListener('click', () => {
                    confirmContainer.style.display = 'none';

                    resolve(false)
                })
            })
         }


      /*    confirmDialog('Are you sure want to submit?')
         .then((confirmed) => {
            if(confirmed) {
                console.log('Submitted');
            }else {
                console.log('Not submitted, still taking exam')
            }
         }) */
const popupDisplay = document.querySelector('.popup');
const popupMessage = document.getElementById('popup-message');

function showPopUpMessage(message) {
    
    popupDisplay.style.display = 'block';
    popupMessage.textContent = message;
    popupDisplay.classList.add('show-popup');
    console.log('poppedup')

    popupDisplay.addEventListener('animationend', () => {
         popupDisplay.classList.remove('show-popup');
         popupDisplay.style.display = 'none';
    }, {once: true});
      

    
}