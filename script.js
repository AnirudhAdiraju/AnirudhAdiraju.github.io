(function(){
    function buildQuiz(){
      // variable to store the HTML output
      var output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          var answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter}:
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      var numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = `input[name=question${questionNumber}]:checked`;
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
        var student = sessionStorage.getItem('usernamea')
        var quiz = sessionStorage.getItem("quiz")
        const Http = new XMLHttpRequest();
        const url ='https://script.google.com/macros/s/AKfycbzMxHnjjPKcUcb2ffDyef10slO3-E9GtxPXG5k_EvJv1Jdod3E/exec'
        var data = "?student="+student+"&quiz="+quiz+"&username="+student+"&action=finishquiz";
        Http.open("GET", String(url+data));
        Http.send();
            Http.onreadystatechange = (e) => {
              ok = Http.responseText;
              console.log(String(ok))
              console.log(Http.readyState);
              
            if (Http.readyState == 4)
            {
                if(String(ok)=='false'){
                  alert('Server Error')

                }
                else{
                  sessionStorage.setItem("specifictutors",ok)
                  alert('Quiz Done!')
                  console.log(ok)
                  window.location = "yourtutors.html"
                }
            }
          }
    }
  

  
    var quizContainer = document.getElementById('quiz');
    var resultsContainer = document.getElementById('results');
    var submitButton = document.getElementById('submit');
    var myQuestions = JSON.parse(sessionStorage.getItem("quiz"))
  
    // Kick things off
    buildQuiz();
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
  })();