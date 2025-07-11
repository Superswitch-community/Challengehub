

async function startseniorsecondaryTest() {
    document.getElementById('animation-gif').style.display = 'flex';
    document.getElementById('examination-container').style.display = 'none';


       // Set the countdown time (in seconds)
       let countdownTime = 600;
       isRunning = true;
       

    function countDown() {
       
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
       const  countdownInterval = setInterval(() => {
           if (isRunning) {
               countdownTime--;
   
               // Update the timer display
               document.getElementById("timer").textContent = formatTime(countdownTime);
              
   
               // Stop the timer when countdown reaches zero
               if (countdownTime <= 0) {
                   clearInterval(countdownInterval);
                   showScore();
               } else if(countdownTime === "300") {
                document.getElementById("timer").style.color = "red";
                showPopUpMessage('Oops!! your remains 5 minutes');
               }
           }
   
           
       }, 1000);
       return countdownInterval;
   }


   document.getElementById('question-nav').innerHTML = '';
   
   
   let response = await fetch('./json files/seniorpretestquestions.json');
      let questions = await response.json();
      
   
      function getRandomQuestions(questions, numQuestions) {
           let randomQuestions = [];
           let questionCopy = questions;

           for(let i = 0; i < numQuestions; i++) {
               let randomIndex = Math.floor(Math.random() * questionCopy.length);

               randomQuestions.push(questionCopy.splice(randomIndex, 1));
           }

           return randomQuestions;
        }
     
        let randomQuestions = getRandomQuestions(questions, 30);
        console.log(`${randomQuestions.length} questions available for demotest`);
       

       let correctAnswers = [];
       let incorrectAnswers = 0;
       let unansweredQuestion = 0;
       let score = 0;
       let answerQuestion = [];
       let currentQuestionElementIndex = 0;
       let currentQuestionIndex = 0;
       /* console.log(randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options); */
        
       function loadQuestion() {
        
        
           let navButtons = document.querySelectorAll('.button');
           navButtons.forEach((button, index) => {
               button.classList.remove('current', 'answered');
               if(index === currentQuestionIndex){
                   button.classList.add('current');
               }
               if(answerQuestion[index]){
                   button.classList.add('answered');
               }
           })
           let questionElement = document.getElementById('question');
           let optionElement = document.getElementById('options');
   
           let currentQuestion = randomQuestions[currentQuestionIndex][currentQuestionElementIndex]
           let questionNo = currentQuestionIndex + 1;
           questionElement.textContent = questionNo + ". " + currentQuestion.question;
           optionElement.innerHTML = "";
           if(currentQuestionIndex === 0){
               document.getElementById('prev-btn').style.visibility = 'hidden'
                document.getElementById('next-btn').style.visibility = 'visible'
           }
           else if(currentQuestionIndex === randomQuestions.length - 1){
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

            if(!answerQuestion[currentQuestionIndex]) {
                answerQuestion[currentQuestionIndex] = selectedOption.value;
                if(selectedOption.value === correctAnswer) {
                correctAnswers[currentQuestionIndex] = true;
                score++;
                }

               }else if(answerQuestion[currentQuestionIndex] !== selectedOption.value) {
               answerQuestion[currentQuestionIndex] = selectedOption.value;
               if(selectedOption.value === correctAnswer && !correctAnswers[currentQuestionIndex]){
               correctAnswers[currentQuestionIndex] = true;
               score++;
               }
               } else if(selectedOption.value !== correctAnswer && correctAnswers[currentQuestionIndex]){
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
           let resultPage  = document.querySelector('.result-page');
           let result = document.querySelector('.question-number');
           let incorrectquestions = document.querySelector('.incorrect-questions');
           let percentScore = document.querySelector('.percentscore');
           let examcontainer = document.getElementById('examination-container');
           let unansweredQuestionHtml = document.querySelector('.unansweredquestions');
           examcontainer.style.display = 'none';
           resultPage.style.display = 'block';
           incorrectAnswers = randomQuestions.length - score;


           percentScore.classList.add('percentscore');
           result.classList.add('question-number');
           incorrectquestions.innerHTML = `Incorrect questions: ${incorrectAnswers}/${randomQuestions.length}`;
           unansweredQuestionHtml.innerHTML = `Unanswered questions: ${unansweredQuestion}/${randomQuestions.length}`;
           result.innerHTML = `correct questions: ${score}/${randomQuestions.length}`;
           percentScore.innerHTML = `Percent Score: ${Math.round((score/(randomQuestions.length)) * 100)}%`;
           console.log(incorrectAnswers);
           console.log(correctAnswers);

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
            if(confirmed) {
                setTimeout(() => {
                     showScore();
                     countdownTime = 0;
                    const timer = countDown();
                    clearInterval(timer);
              }, 2000)
            }
            else {
                return 0;
            }
        })
         
           /* stopCamera(); */
       });

       /* Check unanwered questions*/
       function checkUnansweredQuestion(element) {
        return element = questions[currentQuestionIndex] === "";
       }

       unansweredQuestion = questions.filter(checkUnansweredQuestion);
       console.log(unansweredQuestion);
   
    
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
       

       setTimeout(() => {
       loadQuestion();
        countDown();
        /* accessCamera(); */
       document.getElementById('animation-gif').style.display = 'none';
       document.getElementById('examination-container').style.display = 'block';
       }, 5000);
 
    }
