
export async function startDemo(url, numQuestions, submitButton, scoredisplayer, modalId) {

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

/*     let closeButton = document.querySelector(closeMdal);
    closeButton.classList.remove('show');
    closeButton.style.display = 'none';
    console.log(closeButton) */

    // Set the countdown time (in seconds)
    let countdownTime = 900;
    let isRunning = true;


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
                    let modal = document.getElementById(modalId)
                    modal.classList.add('show');
                    modal.style.display = 'block';
                    let scoreDisplayer = document.getElementById(scoredisplayer);
                    scoreDisplayer.textContent = `Score: ${((score / (randomQuestions.length)) * 100).toFixed(2)}%`;
                    isRunning = false;
                }
                else if (countdownTime === 300) {
                    document.getElementById("timer").classList.add('text-danger');
                    appendAlert('Oops! 5 minutes to go', 'danger')
                }
            }


        }, 1000);
        return countdownInterval;
    }

    const response = await fetch(url);
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

    let randomQuestions = getRandomQuestions(questions, numQuestions);
    console.log(`${randomQuestions.length} questions available for demotest`);


    let correctAnswers = [];
    let incorrectAnswers = 0;
    /*  let unansweredQuestion = 0; */
    let score = 0;
    let answerQuestion = [];
    let currentQuestionElementIndex = 0;
    let currentQuestionIndex = 0;
    /* console.log(randomQuestions[currentQuestionIndex][currentQuestionElementIndex].options); */

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
    /*   function showScore() {
          let resultPage = document.querySelector('.result-page');
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
          percentScore.innerHTML = `Percent Score: ${((score / (randomQuestions.length)) * 100).toFixed(2)}%`;
          console.log(incorrectAnswers);
           console.log(correctAnswers); 
  
      } */

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


    document.getElementById(submitButton).addEventListener('click', () => {
        let scoreDisplayer = document.getElementById(scoredisplayer);
        scoreDisplayer.textContent = `Score: ${((score / (randomQuestions.length)) * 100).toFixed(2)}%`;
        isRunning = false;
        
    });

    /* Check unanwered questions*/
    /* function checkUnansweredQuestion(element) {
     return element = questions[currentQuestionIndex] === "";
    }
 
    unansweredQuestion = questions.filter(checkUnansweredQuestion);
    console.log(unansweredQuestion); */


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
}


