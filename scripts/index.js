//  Javascript program for the website

    
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

 setTimeout(() => {
       appendAlert('Welcome to the signup page','success')
        }, 2000)
 
  
  

appendAlert('Welcome user!','success')

window.addEventListener('online', () => {
   appendAlert('Network Connection Establiched','success')
})

window.addEventListener('offline', () => {
    appendAlert('Network Connection Lost','danger')
})




 /* async  function startprimaryTest() {
    async  function countDown(){
        // Set the countdown time (in seconds)
        let countdownTime = 20;
        isRunning = true;
        
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
            if(isRunning) {
                countdownTime--;

                 // Update the timer display
            document.getElementById("timer").textContent = formatTime(countdownTime);
        
            // Stop the timer when countdown reaches zero
            if (countdownTime <= 0) {
                clearInterval(countdownInterval);
                showScore();
            }
            }
        

            
            
        }, 1000);

        const response = await fetch('public\\json files\\primarypretestquestions.json')
        const questions = await response.json();
            console.log(questions);
            let appdemotest = document.querySelector('.app');
            appdemotest.style.display = 'block';
            const questionElement = document.getElementById("question");
            const answerButtons = document.getElementById("answer-buttons");
            const nextButton = document.getElementById("next-btn");
            const title = document.getElementById('title');
            
            let currentQuestionIndex = 0;
            let score = 0;
            /* let lengthOfQuestion = questions.length;
            lengthOfQuestion = 2;
        
            function startQuiz() {
                currentQuestionIndex = 0;
                score = 0;
                nextButton.innerText = "Next";
                title.innerHTML = 'Challengehub Primary Category';
                showQuestion();
            }
        
            function showQuestion() {
                shuffledQuestionIndex = Math.floor(Math.random(currentQuestionIndex) * questions.length);
                resetState();
                let currentQuestion = questions[shuffledQuestionIndex];
                let questionNo = currentQuestionIndex + 1;
                questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

               answerButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        answerButtons.forEach(btn => {
                            btn.classList.add('focus');
                            button.classList.remove('focus');
                        })
                    })
                }) 
               

                currentQuestion.answers.forEach(answer => {
                    let button = document.createElement('button');
                    button.innerHTML = answer.text;
                    button.classList.add('btn');
                    answerButtons.appendChild(button);
                    button.addEventListener('click', selectAnswer);
                    if (answer.correct) {
                        button.dataset.correct = answer.correct;
                    }
                })


            }
        
            function resetState() {
                nextButton.style.display = "none";
                while (answerButtons.firstChild) {
                    answerButtons.removeChild(answerButtons.firstChild);
                }
            }
        
             function selectAnswer(e) {
                const selectedBtn = e.target;
                nextButton.style.display = 'block';
                const isCorrect = selectedBtn.dataset.correct === "true";
                selectedBtn.classList.add('focus');
                let activeButton  = null;
               answerButtons.addEventListener('click', (e) => {
                console.log(e.target.tagName);
                if(e.target.tagName === 'BUTTON') {
                    if(activeButton) {

                        activeButton.classList.remove('focus');
                        e.target.disabled = false;
                    }
                     activeButton = e.target;
                    activeButton.disabled = true;
                    activeButton.classList.add('focus');
                }
               })
                if (isCorrect) {
                 selectedBtn.classList.add('correct'); 
                    score++;
                    e.target.disabled = true;
                }
                else {
                     selectedBtn.classList.add('incorrect'); 
                       score--;
                       e.target.disabled=  true;
                }
                Array.from(answerButtons.children).forEach(button => {
                    if (button.dataset.correct === "true") {
                        
                        console.log('working...'); 
                     button.classList.add('correct'); 
                    }
                    /* button.disabled = true; 
                });
            }
        
            function showScore() {
                resetState();
                const percentScore = ((score / 7) * 100);
                    questionElement.innerHTML = `
Number of correct questions: ${score}/ 7;
Percent score:  ${percentScore}%
Time Remaining: ${countdownTime}Secs; `;
                nextButton.innerHTML = "Play Again";
                nextButton.style.display = "block";
            }
        
            function handleNextButton() {
                currentQuestionIndex++;
                if (currentQuestionIndex < 2) {
                    showQuestion();
                }
                else {
                    showScore();
                    isRunning = false;
                    clearInterval(countdownInterval);
                    console.log(countdownTime);
                }
            }
        
            nextButton.addEventListener('click', () => {
                if (currentQuestionIndex < 2) {
                    handleNextButton();
                } else {
                    currentQuestionIndex = 0;
                    startQuiz();
                    countDown();
                }
            })
        
            startQuiz();
        
        
        
    } 
    countDown();
      

    } */
