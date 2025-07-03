//  Javascript program for the website


// All constant variables

const mainPage = document.querySelector(".main-page");
const gradeInput = document.querySelector(".grade-input");
const primaryCategorywebsite = document.querySelector(".primarycategory");
const juniorCategoryWebsite = document.querySelector(".juniorcategory");
const seniorCategoryWebsite = document.querySelector(".seniorcategory");
const questionbank = document.querySelector('.questionsbank');
const guildLines = document.getElementById('guildlines');
const registerForm = document.querySelector('.register-form');
const loginForm = document.querySelector('.login-form');
const resultPage  = document.querySelector('.result-page');
const messageDiv = document.querySelector('.messageDiv');
const returnRegisterlink = document.getElementById('return-register-btn');
const returnLoginLink = document.getElementById('return-login-btn');
const returnquestionbankLink = document.getElementById('return-questionbank-btn');
const returnGuildlinesLink = document.getElementById('return-guildline-btn');
const welcomMessage = document.getElementById('welcome-message');
const primaryBody = document.querySelector('.primary-body');
const juniorBody = document.querySelector('.junior-body');
const seniorBody = document.querySelector('.senior-body');
const primaryBodyText = document.querySelector('.primary-body-text');
const juniorBodyText = document.querySelector('.primary-body-text');
const seniorBodyText = document.querySelector('.primary-body-text');
const dropMenu = document.querySelector('.drop-down-menu');
const dropDown = document.querySelector('.drop-down');



window.addEventListener('online', () => {
    alert('Network connection established');
})

window.addEventListener('offline', () => {
    alert('Network connection lost');
})


function submitGrade() {

    setTimeout(() => {
        if (gradeInput.value >= 4 && gradeInput.value <= 6) {
            mainPage.style.display = "none";
            primaryCategorywebsite.style.display = "flex";
            document.title = 'Challengehub primary category';
            primaryBody.style.display = 'block';
        }
        else if (gradeInput.value >= 7 && gradeInput.value <= 9) {
            mainPage.style.display = "none";
            juniorCategoryWebsite.style.display = "flex";
            document.title = 'Challengehub junior category'
            juniorBody.style.display = 'block';
        }
        else if (gradeInput.value >= 10 && gradeInput.value <= 12) {
            mainPage.style.display = "none";
            seniorCategoryWebsite.style.display = "flex";
            document.title = 'Challengehub senior category'
            seniorBody.style.display = 'block';
        }
        else {
           showPopUpMessage("Enter a value between 4 - 12");
        }
    }, 1000);
}

 /* Register container*/
/* registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    confirmDialog('Are you sure you want to submit form')
    .then((confirmed) => {
        if(confirmed) {
            signUp();
            messageDiv.style.display= 'block';
            messageDiv.style.opacity = 1;
            messageDiv.innerHTML = "Account created successffully"
            setTimeout(() => {
                messageDiv.style.display = "none";
            },2000)
        }
        else{
            return 0;
        }
    })
    
})  */

/*Clicking the homelink*/

function goToPrimaryHomePage() {

    primaryBody.style.display = 'none';    
    questionbank.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    mainPage.style.display = 'flex';
    guildLines.style.display = 'none';
    gradeInput.value = '';
    primaryCategorywebsite.style.display = 'none';
    document.title = 'Challengehub.com';
    
}

function goToJuniorHomePage() {

    juniorBody.style.display = 'none';
    questionbank.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    mainPage.style.display = 'flex';
    guildLines.style.display = 'none';
    gradeInput.value = '';
    juniorCategoryWebsite.style.display = 'none';
    document.title = 'Challengehub.com';
    
}

function goToSeniorHomePage() {

    seniorBody.style.display = 'none';
    questionbank.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    mainPage.style.display = 'flex';
    guildLines.style.display = 'none';
    gradeInput.value = '';
    seniorCategoryWebsite.style.display = 'none';
    document.title = 'Challengehub.com';
    
}

/* The drop down menu*/
dropMenu.addEventListener('click', () => {
    dropDown.style.display = "flex";
})

/* Display the body*/
function displayBody() {
     if(gradeInput.value >= 4 && gradeInput.value <= 6) {
        dropDown.style.display = 'none';
        primaryBody.style.display = 'block';     
    }
    else if(gradeInput.value >= 7 && gradeInput.value <= 9) {
        dropDown.style.display = 'none';
        juniorBody.style.display = 'block';
    }
    else if(gradeInput.value >= 10 && gradeInput.value <= 12) {
        dropDown.style.display = 'none';
        seniorBody.style.display = 'block';
    }

}

/*Do not display the body*/
function unDisplay() {
      if(gradeInput.value >= 4 && gradeInput.value <= 6) {
        primaryBody.style.display = 'none';       
    }
    else if(gradeInput.value >= 7 && gradeInput.value <= 9) {
        juniorBody.style.display = 'none';
    }
    else if(gradeInput.value >= 10 && gradeInput.value <= 12) {
        seniorBody.style.display = 'none';  
    }
    
}


/*demotest javascript program*/
function displayQuestionbank() {
    dropDown.style.display = 'none';
    questionbank.style.display = 'flex';
    registerForm.style.display = "none";
    loginForm.style.display = "none";
    welcomMessage.style.display = 'none';
    guildLines.style.display = "none";
    unDisplay();
    showPopUpMessage('This is the demotest page for your pretest');
    
}

/* Guildlines page */
function openGuildlines() {
    dropDown.style.display = 'none';
    questionbank.style.display = 'none';
    registerForm.style.display = "none";
    loginForm.style.display = "none";
    guildLines.style.display = "block";
    unDisplay();
    showPopUpMessage('You are in the guildlines page currently');
}



/* Starting the demotest*/
function startTest() {
    let questionbank = document.querySelector('.questionsbank');
    const timer = document.getElementById('timer');
    questionbank.style.display = 'none';
    let quizApp = document.getElementById('examination-container');
    quizApp.style.display = 'block';
    timer.style.display = 'block';
    primaryCategorywebsite.style.display = 'none';
    juniorCategoryWebsite.style.display = 'none';
    seniorCategoryWebsite.style.display = 'none';
    document.body.backgroundColor = 'green';

    if (gradeInput.value >= 4 && gradeInput.value <= 6) {
        startprimaryTest();
    } else if (gradeInput.value >= 7 && gradeInput.value <= 9) {
        startjuniorsecondaryTest();
    } else if (gradeInput.value >= 10 && gradeInput.value <= 12) {
        startseniorsecondaryTest();
    }
    else {
        return 0;
    }
}

/* returning back to page*/
returnGuildlinesLink.addEventListener('click', () => {
    if (gradeInput.value >= 4 && gradeInput.value <= 6) {
    guildLines.style.display = 'none';
    primaryBody.style.display = 'block';
    } else if (gradeInput.value >= 7 && gradeInput.value <= 9) {
    guildLines.style.display = 'none';
    juniorBody.style.display = 'block';
    } else if (gradeInput.value >= 10 && gradeInput.value <= 12) {
    guildLines.style.display = 'none';
    seniorBody.style.display = 'block'
    }
})

returnRegisterlink.addEventListener('click', () => {
    registerForm.style.display = 'none';
    displayBody();
})

returnquestionbankLink.addEventListener('click', () => {
    questionbank.style.display = 'none';
    displayBody();
})

returnLoginLink.addEventListener('click', () => {
      loginForm.style.display = 'none';
      displayBody();
})


document.getElementById('logout-btn').addEventListener('click', () => {
    
    if (gradeInput.value >= 4 && gradeInput.value <= 6) {
        dropDown.style.display = 'none';
        primaryCategorywebsite.style.display = "flex";
        resultPage.style.display = 'none';
        primaryBody.style.display = 'block'
        showPopUpMessage('You logged out!!!');
    } else if (gradeInput.value >= 7 && gradeInput.value <= 9) {
        dropDown.style.display = 'none';
        juniorCategoryWebsite.style.display = "flex";
        resultPage.style.display = 'none';
        juniorBody.style.display = 'block'
        showPopUpMessage('You logged out!!!');
    } 
    else if (gradeInput.value >= 10 && gradeInput.value <= 12) {
        dropDown.style.display = 'none';
        seniorCategoryWebsite.style.display = "flex";
        resultPage.style.display = 'none';
        seniorBody.style.display = 'block'
        showPopUpMessage('You logged out!!!');
    }
    else {
        return 0;
    }
})


/* opening the signup and login form*/

function OpenSignupForm() {
    setTimeout(() => {
    registerForm.style.display = 'flex';
    questionbank.style.display = 'none';
    loginForm.style.display = "none";
    guildLines.style.display = "none";
    unDisplay();
    showPopUpMessage('Your signup form has opened!!!');
    }, 2000)
}
function OpenLoginForm() {
    setTimeout(() => {
    registerForm.style.display = 'none';
    questionbank.style.display = 'none';
    loginForm.style.display = "flex";
    guildLines.style.display = "none";
    unDisplay();
    showPopUpMessage('Your login form has opened!!!');
    }, 2000)
}