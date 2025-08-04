/* import firebase from "firebase/compat/app"; */
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

const email = localStorage.getItem('useremail');
console.log(email);

document.getElementById('usersname').textContent = `User: ${email}`
document.getElementById('welcome-portal').textContent =  `This is your portal ${email}`;

function displayUsername() {
    document.getElementById('user-name').textContent = `👥 User: ${email}`;
}

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
    }, { once: true });



}

async function startPrimaryExam() {

    displayUsername();


    function countDown() {
        // Set the countdown time (in seconds)
        let countdownTime = 600;
        let isRunning = true;
        // Function to format time as MM:SS
        function formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor(seconds / 60) % 60;
            const remainingSeconds = seconds % 60;
            return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        // Display initial countdown time
        document.getElementById("timer").textContent = `Remaining Time:${formatTime(countdownTime)}`;

        // Start the countdown timer
        const countdownInterval = setInterval(() => {
            if (isRunning) {
                countdownTime--;

                // Update the timer display
                document.getElementById("timer").textContent = `Remaining Time:${formatTime(countdownTime)}`;

                // Stop the timer when countdown reaches zero
                if (countdownTime <= 0) {
                    clearInterval(countdownInterval);
                    showScore();
                } else if (countdownTime === "300") {
                    document.getElementById("timer").style.color = "red";
                    showPopUpMessage('🤨Oops!! your time remains 5 minutes');
                }
            }

        }, 1000);

    }


    let response = await fetch('./json files/primarypretestquestions.json');
    let questions = await response.json();


    function getRandomQuestions(questions, numQuestions) {
        let randomQuestions = [];
        let questionCopy = questions;

        for (let i = 0; i < numQuestions; i++) {
            let randomIndex = Math.floor(Math.random() * questionCopy.length);

            randomQuestions.push(questionCopy.splice(randomIndex, 1));
        }

        return randomQuestions;
    }

    let randomQuestions = getRandomQuestions(questions, 20);
    /*         console.log(`${randomQuestions.length} questions available for demotest`);
     */

    let correctAnswers = [];
    let incorrectAnswers = 0;
    let score = 0;
    let answerQuestion = [];
    let currentQuestionElementIndex = 0;
    let currentQuestionIndex = 0;
    /* console.log(randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options); */

    function loadQuestion() {

        let navButtons = document.querySelectorAll('.button');
        navButtons.forEach((button, index) => {
            button.classList.remove('current', 'answered');
            if (index === currentQuestionIndex) {
                button.classList.add('current');
            }
            if (answerQuestion[index]) {
                button.classList.add('answered');
            }
        })
        let questionElement = document.getElementById('question');
        let optionElement = document.getElementById('options');

        let currentQuestion = randomQuestions[currentQuestionIndex][currentQuestionElementIndex]
        let questionNo = currentQuestionIndex + 1;
        questionElement.textContent = questionNo + ". " + currentQuestion.question;
        optionElement.innerHTML = "";
        if (currentQuestionIndex === 0) {
            document.getElementById('prev-btn').style.visibility = 'hidden'
            document.getElementById('next-btn').style.visibility = 'visible'
        }
        else if (currentQuestionIndex === randomQuestions.length - 1) {
            document.getElementById('next-btn').style.visibility = 'hidden'
            document.getElementById('prev-btn').style.visibility = 'visible'
        }
        else {
            document.getElementById('next-btn').style.visibility = 'visible'
            document.getElementById('prev-btn').style.visibility = 'visible'
        }

        randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options.forEach((option, index) => {
            let li = document.createElement('li');
            let input = document.createElement('input');
            input.type = "radio";
            input.value = String.fromCharCode(65 + index);
            input.checked = answerQuestion[currentQuestionIndex] === input.value;
            input.name = "option";
            input.addEventListener('click', () => {
                checkAnswer();
                checkAnswer();
            })
            li.appendChild(input);
            li.appendChild(document.createTextNode(option));
            optionElement.appendChild(li);
        });


    }


    function checkAnswer() {

        let selectedOption = document.querySelector('input[name="option"]:checked');
        let correctAnswer = randomQuestions[currentQuestionIndex][currentQuestionElementIndex].answer;
        correctAnswers.length = randomQuestions.length;


        try {

            if (!answerQuestion[currentQuestionIndex]) {
                answerQuestion[currentQuestionIndex] = selectedOption.value;
                if (selectedOption.value === correctAnswer) {
                    correctAnswers[currentQuestionIndex] = true;
                    score++;
                }

            } else if (answerQuestion[currentQuestionIndex] !== selectedOption.value) {
                answerQuestion[currentQuestionIndex] = selectedOption.value;
                if (selectedOption.value === correctAnswer && !correctAnswers[currentQuestionIndex]) {
                    correctAnswers[currentQuestionIndex] = true;
                    score++;
                }
            } else if (selectedOption.value !== correctAnswer && correctAnswers[currentQuestionIndex]) {
                correctAnswers[currentQuestionIndex] = false;
                score--;
            }
            /*  console.log(correctAnswers);
             console.log(score); */

        } catch (error) {
            console.log(error);
        }


    }
    function showScore() {
        let resultPage = document.querySelector('.result-page');
        let result = document.querySelector('.question-number');
        let incorrectquestions = document.querySelector('.incorrect-questions');
        let percentScore = document.querySelector('.percentscore');
        let examcontainer = document.getElementById('examination-container');
        examcontainer.style.display = 'none';
        resultPage.style.display = 'block';
        incorrectAnswers = randomQuestions.length - score;


        percentScore.classList.add('percentscore');
        result.classList.add('question-number');
        incorrectquestions.innerHTML = `Incorrect questions: ${incorrectAnswers}/${randomQuestions.length}`;
        result.innerHTML = `correct questions: ${score}/${randomQuestions.length}`;
        percentScore.innerHTML = `Percent Score: ${((score / (randomQuestions.length)) * 100).toFixed(2)}%`;


        const user = auth.currentUser;


        if (user) {
            const userId = user.uid;
            const courseDocRef = doc(db, 'users', userId);
            getDoc(courseDocRef)
                .then((docSnap) => {
                    //Check whether user's data exist
                    if (docSnap.exists()) {
                        //Update user's payment status
                        updateDoc(courseDocRef, {
                            userResult: `${((score / (randomQuestions.length)) * 100).toFixed(2)}%`,
                        });
                    }
                });

        }

        /*  onAuthStateChanged(auth, (user) => {
             const userId = user.uid;
             if (userId) {
                 const docRef = doc(db, "users", userId);
                 getDoc(docRef)
                     .then((docSnap) => {
                         if (docSnap.exists()) {
 
                             //Update user's payment status
                             updateDoc(docRef, {
                                 userResult: `${Math.round((score / (randomQuestions.length)) * 100)}%`,
                             });
                         }
 
                     })
             }
 
         }) */
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex--;
        loadQuestion();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex++;
        loadQuestion();
    });


    document.getElementById('submit-btn').addEventListener('click', () => {
        confirmDialog('Are you sure you want to submit')
            .then((confirmed) => {
                if (confirmed) {
                    setTimeout(() => {
                        showScore();
                    }, 2000)
                }
                else {
                    return 0;
                }
            })
    });


    //Initialize question navigation

    randomQuestions.forEach((question, index) => {
        let button = document.createElement('button');
        button.textContent = index + 1;
        button.classList.add("button");


        button.addEventListener('click', () => {
            checkAnswer();
            currentQuestionIndex = index;
            loadQuestion();
        });
        document.getElementById('question-nav').appendChild(button);
    });

    countDown();
    loadQuestion();
    document.querySelector('.main-exam-page').style.display = 'block';
    document.querySelector('.user-portal').style.display = 'none';

    document.addEventListener('DOMContentLoaded', () => {
        showScore();
    })
}
async function startJuniorExam() {
    displayUsername();

    function countDown() {
        // Set the countdown time (in seconds)
        let countdownTime = 600;
        let isRunning = true;
        // Function to format time as MM:SS
        function formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor(seconds / 60) % 60;
            const remainingSeconds = seconds % 60;
            return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        // Display initial countdown time
        document.getElementById("timer").textContent = `Remaining Time:${formatTime(countdownTime)}`;

        // Start the countdown timer
        const countdownInterval = setInterval(() => {
            if (isRunning) {
                countdownTime--;

                // Update the timer display
                document.getElementById("timer").textContent = `Remaining Time:${formatTime(countdownTime)}`;

                // Stop the timer when countdown reaches zero
                if (countdownTime <= 0) {
                    clearInterval(countdownInterval);
                    showScore();
                } else if (countdownTime === "300") {
                    document.getElementById("timer").style.color = "red";
                    showPopUpMessage('🤨Oops!! your time remains 5 minutes');
                }
            }

        }, 1000);

    }


    let response = await fetch('./json files/juniorpretestquestions.json');
    let questions = await response.json();


    function getRandomQuestions(questions, numQuestions) {
        let randomQuestions = [];
        let questionCopy = questions;

        for (let i = 0; i < numQuestions; i++) {
            let randomIndex = Math.floor(Math.random() * questionCopy.length);

            randomQuestions.push(questionCopy.splice(randomIndex, 1));
        }

        return randomQuestions;
    }

    let randomQuestions = getRandomQuestions(questions, 20);
    /*         console.log(`${randomQuestions.length} questions available for demotest`);
     */

    let correctAnswers = [];
    let incorrectAnswers = 0;
    let score = 0;
    let answerQuestion = [];
    let currentQuestionElementIndex = 0;
    let currentQuestionIndex = 0;
    /* console.log(randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options); */

    function loadQuestion() {

        let navButtons = document.querySelectorAll('.button');
        navButtons.forEach((button, index) => {
            button.classList.remove('current', 'answered');
            if (index === currentQuestionIndex) {
                button.classList.add('current');
            }
            if (answerQuestion[index]) {
                button.classList.add('answered');
            }
        })
        let questionElement = document.getElementById('question');
        let optionElement = document.getElementById('options');

        let currentQuestion = randomQuestions[currentQuestionIndex][currentQuestionElementIndex]
        let questionNo = currentQuestionIndex + 1;
        questionElement.textContent = questionNo + ". " + currentQuestion.question;
        optionElement.innerHTML = "";
        if (currentQuestionIndex === 0) {
            document.getElementById('prev-btn').style.visibility = 'hidden'
            document.getElementById('next-btn').style.visibility = 'visible'
        }
        else if (currentQuestionIndex === randomQuestions.length - 1) {
            document.getElementById('next-btn').style.visibility = 'hidden'
            document.getElementById('prev-btn').style.visibility = 'visible'
        }
        else {
            document.getElementById('next-btn').style.visibility = 'visible'
            document.getElementById('prev-btn').style.visibility = 'visible'
        }

        randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options.forEach((option, index) => {
            let li = document.createElement('li');
            let input = document.createElement('input');
            input.type = "radio";
            input.value = String.fromCharCode(65 + index);
            input.checked = answerQuestion[currentQuestionIndex] === input.value;
            input.name = "option";
            input.addEventListener('click', () => {
                checkAnswer();
                checkAnswer();
            })
            li.appendChild(input);
            li.appendChild(document.createTextNode(option));
            optionElement.appendChild(li);
        });


    }


    function checkAnswer() {

        let selectedOption = document.querySelector('input[name="option"]:checked');
        let correctAnswer = randomQuestions[currentQuestionIndex][currentQuestionElementIndex].answer;
        correctAnswers.length = randomQuestions.length;


        try {

            if (!answerQuestion[currentQuestionIndex]) {
                answerQuestion[currentQuestionIndex] = selectedOption.value;
                if (selectedOption.value === correctAnswer) {
                    correctAnswers[currentQuestionIndex] = true;
                    score++;
                }

            } else if (answerQuestion[currentQuestionIndex] !== selectedOption.value) {
                answerQuestion[currentQuestionIndex] = selectedOption.value;
                if (selectedOption.value === correctAnswer && !correctAnswers[currentQuestionIndex]) {
                    correctAnswers[currentQuestionIndex] = true;
                    score++;
                }
            } else if (selectedOption.value !== correctAnswer && correctAnswers[currentQuestionIndex]) {
                correctAnswers[currentQuestionIndex] = false;
                score--;
            }
            /*  console.log(correctAnswers);
             console.log(score); */

        } catch (error) {
            console.log(error);
        }


    }
    function showScore() {
        let resultPage = document.querySelector('.result-page');
        let result = document.querySelector('.question-number');
        let incorrectquestions = document.querySelector('.incorrect-questions');
        let percentScore = document.querySelector('.percentscore');
        let examcontainer = document.getElementById('examination-container');
        examcontainer.style.display = 'none';
        resultPage.style.display = 'block';
        incorrectAnswers = randomQuestions.length - score;


        percentScore.classList.add('percentscore');
        result.classList.add('question-number');
        incorrectquestions.innerHTML = `Incorrect questions: ${incorrectAnswers}/${randomQuestions.length}`;
        result.innerHTML = `correct questions: ${score}/${randomQuestions.length}`;
        percentScore.innerHTML = `Percent Score: ${((score / (randomQuestions.length)) * 100).toFixed(2)}%`;


        const user = auth.currentUser;

        if (user) {
            const userId = user.uid;
            const courseDocRef = doc(db, 'users', userId);
            getDoc(courseDocRef)
                .then((docSnap) => {
                    //Check whether user's data exist
                    if (docSnap.exists()) {
                        //Update user's payment status
                        updateDoc(courseDocRef, {
                            userResult: `${((score / (randomQuestions.length)) * 100).toFixed(2)}%`,
                        });
                    }
                });

        }

        /*     onAuthStateChanged(auth, (user) => {
                const userId = user.uid;
                if (userId) {
                    const docRef = doc(db, "users", userId);
                    getDoc(docRef)
                        .then((docSnap) => {
                            if (docSnap.exists()) {
    
                                //Update user's payment status
                                updateDoc(docRef, {
                                    userResult: `${Math.round((score / (randomQuestions.length)) * 100)}%`,
                                });
                            }
    
                        })
                }
    
            }) */
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex--;
        loadQuestion();
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        checkAnswer();
        currentQuestionIndex++;
        loadQuestion();
    });


    document.getElementById('submit-btn').addEventListener('click', () => {
        confirmDialog('Are you sure you want to submit')
            .then((confirmed) => {
                if (confirmed) {
                    setTimeout(() => {
                        showScore();
                    }, 2000)
                }
                else {
                    return 0;
                }
            })
    });


    //Initialize question navigation

    randomQuestions.forEach((question, index) => {
        let button = document.createElement('button');
        button.textContent = index + 1;
        button.classList.add("button");


        button.addEventListener('click', () => {
            checkAnswer();
            currentQuestionIndex = index;
            loadQuestion();
        });
        document.getElementById('question-nav').appendChild(button);
    });

    countDown();
    loadQuestion();
    document.querySelector('.main-exam-page').style.display = 'block';
    document.querySelector('.user-portal').style.display = 'none';

     document.addEventListener('DOMContentLoaded', () => {
        showScore();
    })
}
async function startSeniorExam() {

    displayUsername();

    function countDown() {
        // Set the countdown time (in seconds)
        let countdownTime = 900;
        let isRunning = true;
        // Function to format time as MM:SS
        function formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor(seconds / 60) % 60;
            const remainingSeconds = seconds % 60;
            return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }

        // Display initial countdown time
        document.getElementById("timer").textContent = `Remaining Time:${formatTime(countdownTime)}`;

        // Start the countdown timer
        const countdownInterval = setInterval(() => {
            if (isRunning) {
                countdownTime--;

                // Update the timer display
                document.getElementById("timer").textContent = `Remaining Time:${formatTime(countdownTime)}`;

                // Stop the timer when countdown reaches zero
                if (countdownTime <= 0) {
                    clearInterval(countdownInterval);
                    showScore();
                } else if (countdownTime === "300") {
                    document.getElementById("timer").style.color = "red";
                    showPopUpMessage('🤨Oops!! your time remains 5 minutes');
                }
            }

        }, 1000);

    }


    let response = await fetch('./json files/seniorpretestquestions.json');
    let questions = await response.json();


    function getRandomQuestions(questions, numQuestions) {
        let randomQuestions = [];
        let questionCopy = questions;

        for (let i = 0; i < numQuestions; i++) {
            let randomIndex = Math.floor(Math.random() * questionCopy.length);

            randomQuestions.push(questionCopy.splice(randomIndex, 1));
        }

        return randomQuestions;
    }

    let randomQuestions = getRandomQuestions(questions, 20);
    /*         console.log(`${randomQuestions.length} questions available for demotest`);
     */

    let correctAnswers = [];
    let incorrectAnswers = 0;
    let score = 0;
    let answerQuestion = [];
    let currentQuestionElementIndex = 0;
    let currentQuestionIndex = 0;
    /* console.log(randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options); */

    function loadQuestion() {

        let navButtons = document.querySelectorAll('.button');
        navButtons.forEach((button, index) => {
            button.classList.remove('current', 'answered');
            if (index === currentQuestionIndex) {
                button.classList.add('current');
            }
            if (answerQuestion[index]) {
                button.classList.add('answered');
            }
        })
        let questionElement = document.getElementById('question');
        let optionElement = document.getElementById('options');

        let currentQuestion = randomQuestions[currentQuestionIndex][currentQuestionElementIndex]
        let questionNo = currentQuestionIndex + 1;
        questionElement.textContent = questionNo + ". " + currentQuestion.question;
        optionElement.innerHTML = "";
        if (currentQuestionIndex === 0) {
            document.getElementById('prev-btn').style.visibility = 'hidden'
            document.getElementById('next-btn').style.visibility = 'visible'
        }
        else if (currentQuestionIndex === randomQuestions.length - 1) {
            document.getElementById('next-btn').style.visibility = 'hidden'
            document.getElementById('prev-btn').style.visibility = 'visible'
        }
        else {
            document.getElementById('next-btn').style.visibility = 'visible'
            document.getElementById('prev-btn').style.visibility = 'visible'
        }

        randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options.forEach((option, index) => {
            let li = document.createElement('li');
            let input = document.createElement('input');
            input.type = "radio";
            input.value = String.fromCharCode(65 + index);
            input.checked = answerQuestion[currentQuestionIndex] === input.value;
            input.name = "option";
            input.addEventListener('click', () => {
                checkAnswer();
                checkAnswer();
            })
            li.appendChild(input);
            li.appendChild(document.createTextNode(option));
            optionElement.appendChild(li);
        });


    }


    function checkAnswer() {

        let selectedOption = document.querySelector('input[name="option"]:checked');
        let correctAnswer = randomQuestions[currentQuestionIndex][currentQuestionElementIndex].answer;
        correctAnswers.length = randomQuestions.length;


        try {

            if (!answerQuestion[currentQuestionIndex]) {
                answerQuestion[currentQuestionIndex] = selectedOption.value;
                if (selectedOption.value === correctAnswer) {
                    correctAnswers[currentQuestionIndex] = true;
                    score++;
                }

            } else if (answerQuestion[currentQuestionIndex] !== selectedOption.value) {
                answerQuestion[currentQuestionIndex] = selectedOption.value;
                if (selectedOption.value === correctAnswer && !correctAnswers[currentQuestionIndex]) {
                    correctAnswers[currentQuestionIndex] = true;
                    score++;
                }
            } else if (selectedOption.value !== correctAnswer && correctAnswers[currentQuestionIndex]) {
                correctAnswers[currentQuestionIndex] = false;
                score--;
            }
            /*  console.log(correctAnswers);
             console.log(score); */

        } catch (error) {
            console.log(error);
        }


    }
    function showScore() {
        let resultPage = document.querySelector('.result-page');
        let result = document.querySelector('.question-number');
        let incorrectquestions = document.querySelector('.incorrect-questions');
        let percentScore = document.querySelector('.percentscore');
        let examcontainer = document.getElementById('examination-container');
        examcontainer.style.display = 'none';
        resultPage.style.display = 'block';
        incorrectAnswers = randomQuestions.length - score;


        percentScore.classList.add('percentscore');
        result.classList.add('question-number');
        incorrectquestions.innerHTML = `Incorrect questions: ${incorrectAnswers}/${randomQuestions.length}`;
        result.innerHTML = `correct questions: ${score}/${randomQuestions.length}`;
        percentScore.innerHTML = `Percent Score: ${((score / (randomQuestions.length)) * 100).toFixed(2)}%`;


        const user = auth.currentUser;


        if (user) {
            const userId = user.uid;
            const courseDocRef = doc(db, 'users', userId);
            getDoc(courseDocRef)
                .then((docSnap) => {
                    //Check whether user's data exist
                    if (docSnap.exists()) {
                        //Update user's payment status
                        updateDoc(courseDocRef, {
                            userResult: `${((score / (randomQuestions.length)) * 100).toFixed(2)}%`,
                        });
                    }
                });

        }

        /*   onAuthStateChanged(auth, (user) => {
              const userId = user.uid;
              if (userId) {
                  const docRef = doc(db, "users", userId);
                  getDoc(docRef)
                      .then((docSnap) => {
                          if (docSnap.exists()) {
  
                              //Update user's payment status
                              updateDoc(docRef, {
                                  userResult: `${Math.round((score / (randomQuestions.length)) * 100)}%`,
                              });
                          }
  
                      })
              }
  
          }) */

        document.getElementById('prev-btn').addEventListener('click', () => {
            checkAnswer();
            currentQuestionIndex--;
            loadQuestion();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            checkAnswer();
            currentQuestionIndex++;
            loadQuestion();
        });


        document.getElementById('submit-btn').addEventListener('click', () => {
            confirmDialog('Are you sure you want to submit')
                .then((confirmed) => {
                    if (confirmed) {
                        setTimeout(() => {
                            showScore();
                        }, 2000)
                    }
                    else {
                        return 0;
                    }
                })
        });


        //Initialize question navigation

        randomQuestions.forEach((question, index) => {
            let button = document.createElement('button');
            button.textContent = index + 1;
            button.classList.add("button");


            button.addEventListener('click', () => {
                checkAnswer();
                currentQuestionIndex = index;
                loadQuestion();
            });
            document.getElementById('question-nav').appendChild(button);
        });

        countDown();
        loadQuestion();
        document.querySelector('.main-exam-page').style.display = 'block';
        document.querySelector('.user-portal').style.display = 'none';

         document.addEventListener('DOMContentLoaded', () => {
        showScore();
    })
    }
}
console.log(localStorage.getItem('gradeInput'))

const startButton = document.querySelector('.start-button')

startButton.addEventListener('click', () => {

    startButton.disabled = true;
    startButton.style.animation = "none";
    const auth = getAuth();

    const currentUser = auth.currentUser;
    const userId = currentUser.uid;

    const docRef = doc(db, 'users', userId);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                let examCount = userData.examCount;
                const isNotUploading = false;
               /*  console.log(userData); */

                if (isNotUploading) {
                    showPopUpMessage('Oops!!😮 Examination will not upload till the date of Examination');
                     startButton.disabled = false;
                } else {
                    //increment examcount
                    updateDoc(docRef, {
                        examCount: increment(1),
                    });

                    //check if the exacount exceeds 2
                    if (examCount >= 2) {
                        showPopUpMessage('You have exceeded the maximum attempts');
                         startButton.disabled = false;
                        return;
                    }
                    else {

                        //upload successful
                        showPopUpMessage('Exam uploaded successfully');
                        const gradeInput = localStorage.getItem('gradeInput');

                        if (gradeInput >= 4 && gradeInput <= 6) {
                            startPrimaryExam();
                        } else if (gradeInput >= 7 && gradeInput <= 9) {
                            startJuniorExam();
                        } else if (gradeInput >= 10 && gradeInput <= 12) {
                            startSeniorExam();
                        }
                    }


                }

            }
        }).catch(error => {
            showPopUpMessage("Error Unhealthy Network Connection", error);
            startButton.disabled = false;
        })


    /*  catch (error) {
         showPopUpMessage('Error uploading exam', error);
     } */
})


document.getElementById('logout-btn').addEventListener('click', () => {
    location.href= "exampage.html"; 
})

  /*    else {
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
                   }  */

/*  onAuthStateChanged(auth, (user) => {
            const userId = user.uid;
            if (userId) {
                const docRef = doc(db, "users", userId);
                getDoc(docRef)
                    .then((docSnap) => {
                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            let examCount = userData.examCount;

                            if (isUploading) {
                                showPopUpMessage('Oops!!😮 Examination will not upload till the date of Examination');

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
                            showPopUpMessage('User document not found');
                        }


                    })
            }

        }) */
/* function reloadExam() {
   
}
 */
/* const reloadExam = () => {
  
} */
