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

/*  if (docSnap.exists()) {
                         const paymentStatus = docSnap.data().paymentStatus;
                         console.log(paymentStatus);
                         if (paymentStatus) {
                             showPopUpMessage('Login Successful');
                             loginForm.style.display = 'none';
                             location.href = 'exampage.html';
                         } else {
                             showPopUpMessage("You haven't paid 😗. Oops your access is restricted😐");
                         }
                     }else {
                         showPopUpMessage('Account does not Exist !!!😐')
                     } */

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

  /* <div class="primary-body-text">
        This is the junior category page.
        The primary category subjects includes only Mathematics and General studies also known as basic science.
        This competition is a weekly based competition and it provides opportunity for smart students to explore their
        talents in the academic world.
        To bring out the genuis in them and reject low self esteem among students.
        I believe every student in Nigeria has what it takes to academically prosper.
        The problem in Nigeria is the economic distraction towards students which prevents most of them from focusing on
        their dreams.
        Go to the guidelines page first before handling any page.
        You can also join the group if you're confused
        Challengehub junior group <a href="https://chat.whatsapp.com/KtTEjGkizMV3bSvQB2Hb69">junior category
                    whatsapp link</a>
      </div>

       <div class="junior-image">
        <img src="./images/children reading.jpg" alt="">
      </div>
    </div>
  </div> */   
  

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
    
})  
    

function goToPrimaryHomePage() {

    primaryBody.style.display = 'none';    
    questionbank.style.display = 'none';
    loginForm.style.display = 'none';
    registerForm.style.display = 'none';
    mainPage.style.display = 'flex';
    guildLines.style.display = 'none';
    gradeInput.value = '';
    primaryCategorywebsite.style.display = 'none';
    juniorCategoryWebsite.style.display = 'none';
    seniorCategoryWebsite.style.display = 'none';
    document.title = 'Challengehub.com';
    primaryDropDown.style.display = 'none';
    juniorDropDown.style.display = 'none';
    seniorDropDown.style.display = 'none';
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
    primaryCategorywebsite.style.display = 'none';
    seniorCategoryWebsite.style.display = 'none';
    document.title = 'Challengehub.com';
    juniorDropDown.style.display = 'none'; 
    primaryDropDown.style.display = 'none';
    seniorDropDown.style.display = 'none';
}

           <li>Challengehub primary group <a href="https://chat.whatsapp.com/FqpxJGuNd7u7Wl8u2nNaHf">primary category
                    whatsapp link</a></li> */

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

      /*     async function startPrimaryDemo() {

            console.log('primary')
            
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
            
            
                // Set the countdown time (in seconds)
                let countdownTime = 900;
                isRunning = true;
            
            
                function countDown() {
                    console.log('hello')
            
                    // Function to format time as MM:SS
                    function formatTime(seconds) {
                        const hours = Math.floor(seconds / 3600);
                        const minutes = Math.floor(seconds / 60) % 60;
                        const remainingSeconds = seconds % 60;
                        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
                    }
            
            
                    // Display initial countdown time
                    document.getElementById("timer").textContent = formatTime(countdownTime);
            
                    // Start the countdown timer
                    const countdownInterval = setInterval(() => {
                        if (isRunning) {
                            countdownTime--;
            
                            // Update the timer display
                            document.getElementById("timer").textContent = formatTime(countdownTime);
            
            
                            // Stop the timer when countdown reaches zero
                            if (countdownTime <= 0) {
                                clearInterval(countdownInterval);
                                appendAlert("Time's Up", 'danger')
                            }
                            else if (countdownTime === 300) {
                                document.getElementById("timer").classList.add('text-danger');
                                appendAlert('Oops! 5 minutes to go', 'danger')
                            }
                        }
            
            
                    }, 1000);
                    return countdownInterval;
                }
            
                const response = await fetch('/public/json files/primarypretestquestions.json');
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
            
                let randomQuestions = getRandomQuestions(questions, 50);
                console.log(`${randomQuestions.length} questions available for demotest`);
            
            
                let correctAnswers = [];
                let incorrectAnswers = 0;
                /*  let unansweredQuestion = 0; */
                let score = 0;
                let answerQuestion = [];
                let currentQuestionElementIndex = 0;
                let currentQuestionIndex = 0;
                console.log(randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options); 
            
                function loadQuestion() {
            
            
                    let navButtons = document.querySelectorAll('.m-1');
                    navButtons.forEach((button, index) => {
                        button.classList.remove('text-danger', 'bg-success');
                        if (index === currentQuestionIndex) {
                            button.classList.add('text-danger');
                            button.classList.remove('text-success');
                        }
                        if (answerQuestion[index]) {
                            button.classList.add('bg-success');
                            button.classList.add('text-white');
                            button.classList.remove('text-danger');
                        }
                    })
            
                    /*    let navButtons = document.querySelectorAll('.button');
                       navButtons.forEach((button, index) => {
                           button.classList.remove('current', 'answered');
                           if (index === currentQuestionIndex) {
                               button.classList.add('current');
                           }
                           if (answerQuestion[index]) {
                               button.classList.add('answered');
                           }
                       }) */
            
                    console.log(navButtons);
                    let questionElement = document.getElementById('question');
                    let optionElement = document.getElementById('options');
            
                    let currentQuestion = randomQuestions[currentQuestionIndex][currentQuestionElementIndex];
                    let questionNo = currentQuestionIndex + 1;
                    questionElement.textContent = questionNo + ". " + currentQuestion.question;
            
                    if (currentQuestionIndex === 0) {
                        document.getElementById('prev-btn').disabled = true;
                    }
                    else if (currentQuestionIndex === randomQuestions.length - 1) {
                        document.getElementById('next-btn').disabled = true;
                    }
                    else {
                        document.getElementById('prev-btn').disabled = false;
                        document.getElementById('next-btn').disabled = false;
                    }
            
            
                    optionElement.innerHTML = "";
            
                    randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options.forEach((option, index) => {
                        let li = document.createElement('li');
                        li.classList.add('text-success')
                        li.style.listStyleType = "none";
                        let input = document.createElement('input');
                        input.classList.add('m-2')
                        input.type = "radio";
                        input.value = String.fromCharCode(65 + index);
                        input.checked = answerQuestion[currentQuestionIndex] === input.value;
                        input.name = "option";
                        input.style.cursor = 'pointer';
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
            
                        /* console.log(correctAnswers);
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
                    /*   let unansweredQuestionHtml = document.querySelector('.unansweredquestions'); */
                    examcontainer.style.display = 'none';
                    resultPage.style.display = 'block';
                    incorrectAnswers = randomQuestions.length - score;
            
            
                    percentScore.classList.add('percentscore');
                    result.classList.add('question-number');
                    incorrectquestions.innerHTML = `Incorrect questions: ${incorrectAnswers}/${randomQuestions.length}`;
                    /*  unansweredQuestionHtml.innerHTML = `Unanswered questions: ${unansweredQuestion}/${randomQuestions.length}`; */
                    result.innerHTML = `correct questions: ${score}/${randomQuestions.length}`;
                    percentScore.innerHTML = `Percent Score: ${((score / (randomQuestions.length)) * 100).toFixed(2)}%`;
                    /*  console.log(incorrectAnswers);
                     console.log(correctAnswers); */
            
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
            
            
              /*   document.getElementById('submit-btn').addEventListener('click', () => {
            
                }); 
            
                Check unanwered questions
               function checkUnansweredQuestion(element) {
                 return element = questions[currentQuestionIndex] === "";
                }
            
                unansweredQuestion = questions.filter(checkUnansweredQuestion);
                console.log(unansweredQuestion); 
            
            
                //Initialize question navigation
            
                randomQuestions.forEach((question, index) => {
                    let button = document.createElement('button');
                    button.textContent = index + 1;
                    button.classList.add("btn");
                    button.classList.add('m-1')
                    button.classList.add('text-dark')
                    button.classList.add('border-1')
                    button.classList.add('rounded-1')
                    button.classList.add('btn-outline-success')
            
            
                    button.addEventListener('click', () => {
                        checkAnswer();
                        currentQuestionIndex = index;
                        loadQuestion();
                    });
                    document.getElementById('question-nav').appendChild(button);
                });
            
            
              
                loadQuestion();
                countDown();
            } */

            /* onAuthStateChanged(auth, (user) => {
  const loggedInUserId = user.uid;
  const collection = user.category;
  if (loggedInUserId) {
    const docRef = doc(db, `${collection}`, loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          let challengeCount = userData.challengeCount;
          var surName = userData.surName
          let firstName = userData.firstName;
          let otherNames = userData.otherNames;
          var category = userData.category;
          var score = userData.result;
          var paymentStatus = userData.paymentStatus;
          let welcomeMessage = document.querySelector('.dashboard-welcome');
          let examCount = 0;

          //Initialize welcome message
          welcomeMessage.textContent = `Hi ${firstName}`;

          //Initiializing challengeboard and results board
          const challengeName = document.getElementById('challenge-name');
          const challengeCategory = document.getElementById('dashboard-category');
          const challengeEmail = document.getElementById('dashboard-email');
          const challengePaymentStatus = document.getElementById('dashboard-payment-status');
          const challengeExamCount = document.getElementById('dashboard-challengecount');
          const challengeScore = document.getElementById('challenge-score');
          const challengeIsQualified = document.getElementById('challenge-qualified');
          const startButton = document.getElementById('start-button');
          const challengeRank = document.getElementById('challenge-rank');
          const challengeTotalUsers = document.getElementById('challenge-total-users');

          challengeName.textContent = `Name: ${surName} + " " + ${firstName} + " " + ${otherNames}`;
          challengeCategory.innerText = `Category: ${category}`;
          challengeCount.innerText = `Attempts: ${examCount}/2`;
          challengeEmail.textContent = `Email: ${challengeEmail}`;
          challengePaymentStatus.innerText = `Payment status: ${paymentStatus}`;
          challengeScore.innerText = `${score}`;

          
          startButton.addEventListener('click', () => {

           examCount >= 2 ?
            alert('You have reached your limits')
            : 
            updateDoc(docRef, {
              challengeCount: examCount++,
            }) 
          })
               //saving tokens, emails etc to localstorage temporary
      localStorage.setItem('LoggedInUserId', loggedInUserId);
      localStorage.setItem('LoggedInEmail', loggedInEmail);
      localStorage.setItem('loggedInCategory', category);

      //Fetching users and results implementation
      const usersRef = collection(db, 'users');

      getCountFromServer(usersRef)
      .then((count) => {
        alert(`Total users: ${count.data().count}`)
      })
      .catch((error) => {
        console.error('Error getting count');
      }) 

      // Fetching total number of users
    async function getTotalusers() {
      const usersRef = collection(db, `${category}`);

      try {
        const querySnapshot = await usersRef.get();

        return querySnapshot;

      } catch (error) {
        console.log(error)
      }
    }

      async function RenderUsers() {
        try {
          const totalUsers = await getTotalusers();
          challengeTotalUsers.innerText = `Total Users: ${totalUsers}`;
        } catch (error) {
          console.log(error)
        }
      }

      RenderUsers();

      // Rank users by their scores

      const usersRef = collection(db, `${category}`);


      usersRef.doc(loggedInUserId).omSnapshot(doc => {
        const userScore = doc.data().result;

        usersRef.where('result', '>', userScore).get()
        .then(querySnapshot => {
          const rank = querySnapshot + 1;
     
          challengeRank.innerText = `Rank: ${rank}`;
        })
      })
       usersRef.orderBy('result', 'desc').get()
      .then((querySnapshot) => {
        let rank = 1;
        let userRank = null;

        querySnapshot.forEach(doc => {
          if (doc.id === loggedInUserId) {
            userRank = rank;
          }
          const userData = doc.data();
        challengeRank.innerText = `Rank: ${rank} ${userData.name} - Score: ${userData.score}`;
        doc.ref.update({rank: rank}); 
        rank++;
        });

        if (userRank !== null) {
          console.log(`User's rank: ${userRank}`)
        }
      })
      .catch(error => {
        console.log(error)
      }) 

        }
      })

 
  }

}) */

/* 

/* 
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { getFirestore, setDoc, doc, getDoc, getDocs, collection, updateDoc, increment, deleteDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqBHdZDuG_fAW9pkZoO7JOmSIJchFCuyw",
  authDomain: "challengehub-database-27c14.firebaseapp.com",
  projectId: "challengehub-database-27c14",
  storageBucket: "challengehub-database-27c14.firebasestorage.app",
  messagingSenderId: "908650979331",
  appId: "1:908650979331:web:956142a3de58281fb52e36",
  measurementId: "G-5CBFTSF9FS"
};

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
 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();
const auth = getAuth();

const signupButton = document.getElementById('signup-button');
 //storing user's email and password

 const firstName = document.getElementById('firstname');
 const surName = document.getElementById('surname');
 const lastName = document.getElementById('lastname');
 const otherNames = document.getElementById('othernames');
 const selectedOption = document.querySelector('.select');
 const email = document.getElementById('email').value;
 const password = document.getElementById('password').value;


signupButton.addEventListener('click', (e) => {


  e.preventDefault();
 
signupButton.innerHTML = `
  <div class="spinner-border-sm spinner-border-md spinner-border-lg spinner-border-xl spinner-border" role="status">
  <span class="sr-only"></span>
</div>`

 
if(email === "" || password === "") {
  alert('pleas fill in all fields')
}

else {
  
  createUserWithEmailAndPassword(auth, email, password,)
    .then((userCredentail) => {
      const user = userCredentail.user;
      const userData = {
        firstName: firstName.value,
        surName: surName.value,
        otherNames: otherNames.value,
        category: selectedOption.value,
        email: email.value,
        paymentStatus: false,
        challengeCount: 0,
        result: result,
        qualified: null,
      };


      alert(selectedOption.value)
      alert("Account Created Successfully", 'success');
      signupButton.disabled = false;

      const docRef = doc(db, `${selectedOption.value}`, user.uid);
      setDoc(docRef, userData)
        .then(() => {
          alert('Document has been saved to database', 'success');
        })
        .catch((error) => {
          alert(`Error writing document: ${error}`, 'danger');
        })
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        alert('Email Address Already Exists', 'danger');
        signupButton.disabled = false;
      }
      else {
        alert('Unable to create user check your network connection or fill in all details');
        signupButton.disabled = false;
      }
    })
}



})

const loginButton = document.getElementById('login-button');

loginButton.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const selectedOption = document.querySelector('.select');


  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentail) => {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;
      localStorage.setItem('LoggedInUserId', userId);

     
      const docRef = doc(db, `${selectedOption.value}`, userId);
      getDoc(docRef)
        .then((docSnap) => {

          appendAlert('Login Successful', 'success');
          location.href = '../public/scripts/pages/dashboard.html';
        }).catch(error => {
          appendAlert('Error Authenticating...', 'danger');
        })


    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == "auth/invalid-credential") {
        appendAlert("Invalid Email or password", 'danger');
      }
      else {
        appendAlert("check your internet connection", 'danger');
      }
    })


})


/* signupButton.addEventListener('click', () => {

  signupButton.disabled = true;
  signupButton.innerHTML = `
  <div class="spinner-border-sm spinner-border-md spinner-border-lg spinner-border-xl spinner-border" role="status">
  <span class="sr-only"></span>
</div>`

  //storing user's email and password
  const firstName = document.getElementById('firstname').value;
  const surName = document.getElementById('surname').value;
  const otherNames = document.getElementById('othernames').value; 
  var selectedOption = document.querySelector('.form-select');
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  var category = selectedOption.value;

  createUserWithEmailAndPassword(auth, email, password, surName, firstName, otherNames, category)
    .then((userCredentail) => {
      const user = userCredentail.user;
      const userData = {
        firstName: firstName,
        surName: surName,
        otherNames: otherNames,
        selectedOption: category, 
        email: email,
        paymentStatus: false,
        challengeCount: 0,
        result: result,
        qualified: null,
      };
      signupButton.disabled = false;
      localStorage.setItem('loggedInUserId', user.uid);
      alert(category)
      alert("Account Created Successfully");

      const docRef = doc(db, 'users', user.uid);
      setDoc(docRef, userData)
        .then(() => {
          alert('Document has been written!!!');
        })
        .catch((error) => {
          alert("error writing document");
        })
        

    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode == 'auth/email-already-in-use') {
        alert('Email Address Already Exists!!!');
        signupButton.disabled = false;
        signupButton.innerHTML = `signup`
      }
      else {
        alert('Unable to create user check your network connection');
        signupButton.innerHTML = `signup`
        signupButton.disabled = false;
      }
    })

})
 */

/* 
import { getAuth, signOut } from "firebase/auth";

// Initialize Firebase Auth
const auth = getAuth();

// Handle sign out button click
document.getElementById("signout-btn").addEventListener("click", async () => {
  try {
    await signOut(auth);

    // Clear any stored data (like category in localStorage)
    localStorage.removeItem("category");

    // Redirect to login page
    window.location.href = "/login.html";

    console.log("User signed out successfully.");
  } catch (error) {
    console.error("Error signing out:", error.message);
    alert("Sign out failed. Please try again.");
  }
});
 */

/* import { onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/login.html"; // redirect if not signed in
  }
});
 */

/*
  
      <!--   <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="../images/children reading.jpg" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Aims..</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="../images/children reading.jpg" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Prices...</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div class="carousel-item">
              <img src="../images/a teenage girl reading.jpg" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Competitions...</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div> -->

         <!--      <div id="carouselExampleCaptions" class="carousel slide m-3">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={require("../images/perez2.jpg")} class="d-block w-100" alt="..." />
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide label</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require("../images/worship logo.jpg")} class="d-block w-100" alt="..." />
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src={require("../images/perez6.jpg")} class="d-block w-100" alt="..." />
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide label</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

  -->

    <!--    <div id="carouselExampleAutoplaying" class="carousel slide m-3" data-bs-ride="carousel">
            <div class="carousel-inner ">
              <div class="carousel-item active">
                <img src="../images/a girl reading.jpg" class="d-block  img-fluid" alt="pic-1"  />
              </div>
              <div class="carousel-item">
                <img src="../images/a teenage girl reading.jpg" class="d-block  img-fluid" alt="pic-2"  />
              </div>
              <div class="carousel-item">
                <img src="../images/chimg4.png" class="d-block img-fluid" alt="pic-3"  />
              </div>
              <div class="carousel-item">
                <img src="" class="d-block img-fluid" alt="pic-4" />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
 -->
 loginButton.addEventListener('click', (e) => {
    e.preventDefault();
  
    loginButton.disabled = true;
    loginButton.innerHTML = `
     <div class="spinner-border-sm spinner-border-md spinner-border-lg spinner-border-xl spinner-border" role="status">
     <span class="sr-only"></span>
   </div>`
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    var selectedOption = document.querySelector('.form-select');
  
    var category = selectedOption.value;
    alert(category)
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentail) => {
        const currentUser = auth.currentUser;
        const userId = currentUser.uid;
  
  
  
        const docRef = doc(db, `${category}`, userId);
        getDoc(docRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              location.href = "dashboard.html"
            } else {
              alert('Account does not Exist !!!😐')
            }
          }).catch(error => {
            alert('No Account Found', error);
          })
  
  
  
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/invalid-credential") {
          alert("Invalid Email or password");
        }
        else {
          alert("check your internet connection");
        }
      })
  
  
  }) 
   */
  