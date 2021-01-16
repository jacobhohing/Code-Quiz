var startButton = document.querySelector("#start-button");
var timerEl = document.getElementById("countdown-container");
var holderEl = document.getElementById("question-holder");
var scoreList = document.getElementById("scoreList");
var questionCount = 0;

var correctAnswers = 0;

var timeLeftMintues = 3;
var timeLeftSeconds = 59;

var minusTime = false;

var hScores = [];

renderScores();

var rDial =
[
    "'Elementary, my dear Watson' - Sherlock Holmes",
    "With stunning grace, you prevailed against all odds and answered the question correct.",
    "It was tough, but this question was no match for you.",
    "'Here, in this world, the bad guys can win!' - Benedict",
    "It was tough, but this question was no match for you.",
    "'They may take our lives, but they'll never take our freedom!' - William Wallace"
];

var wDial =
[
    "I'll explain and I'll use small words so that you'll be sure to understand, you warthog faced buffoon.",
    "You are a sad strange little man, and you have my pity.",
    "Does Barry Manilow know that you raid his wardrobe?",
    "You clinking, clanking, clattering collection of caliginous junk!",
    "I don’t want to talk to you no more, you empty-headed animal food trough wiper. I fart in your general direction! Your mother was a hamster and your father smelt of elderberries!",
    "You dirt-eating piece of slime, you scum-sucking pig, you son of a motherless goat!"
];



var QuizObj = [

    question1 = {
        question:"What is Javascript?",
        correctAnswerIndex: 4,
        questionAnswers:
        [
            "Javascript is a bean imported from the island Java in Indonesia",
            "Javascript is what you need to purchase a behind-the-counter prescription.",
            "A prescription for coffee.",
            "Just coffee.",
            "An object-oriented computer programming language."
        ],
    },
    question2 = {
        question:"What is HTML?",
        correctAnswerIndex: 2,
        questionAnswers:
        [
            "Happy Tabetan Makes Lunch.",
            "Huge Tall Medium Large measurment system.",
            "Hyper Text Markup Language.",
            "A misspelling.",
            "Texting acronym for Hang Tight My Lady."
           
        ],
    },
    question3 = {
        question:"What does CSS stand for?",
        correctAnswerIndex: 1,
        questionAnswers:
        [
            "I'll take 'Snake Sounds' for 400 hundred",
            "Cascading Style Sheets",
            "Crappy system Setup",          
            "Custard Self Serve",
            "Nothing. It stands for absolutley nothing."
        ],
    },
    question4 = {
        question:"What is HTML?",
        correctAnswerIndex: 2,
        questionAnswers:
        [
            "Wait, we already saw this question?",
            "Right? Am I imagining things?",
            "I think the answer was the second option...right?",
            "But why would I?",
            "This Quiz doesn't matter."
        ],
    },
    question5 = {
        question:"I'm sorry about the last question, here is a freebie!",
        correctAnswerIndex: 3,
        questionAnswers:
        [
            "Wrong",
            "Wrong",
            "Wrong",
            "Right Answer! I swear!",
            "Wrong"
        ],
    }
]

function renderScores() {
    
    scoreList.innerHTML = '';
    
    var storedScores = JSON.parse(localStorage.getItem("hScores"));
    if (storedScores !== null) {
        hScores = storedScores;
      }

      for (var i = 0; i < hScores.length; i++) {
        var theScore = hScores[i];
    
        var li = document.createElement("li");
        li.textContent = theScore;
        li.className = "list-group-item";
        scoreList.appendChild(li);
      }
  }

startButton.addEventListener("click", function() {
   
    startButton.disabled = true;

    var quizTimer = setInterval(function() {
        timerEl.textContent = timeLeftMintues + " Minutes and " + timeLeftSeconds + " seconds remaining";
        timeLeftSeconds--;
        
        if (questionCount == 5)
        {
            clearInterval(quizTimer);
        }

        if (minusTime) 
        {
            if (timeLeftSeconds < 10)
            {
                var theDiff = 10 - timeLeftSeconds;
                timeLeftSeconds = 60 - theDiff;
                timeLeftMintues--;
            }
            else
            {
                timeLeftSeconds = timeLeftSeconds - 10;
                minusTime = false;
            }           
        }


        if (timeLeftMintues === 0 && timeLeftSeconds ===0) {          
            timerEl.textContent = "Time's Up! You didn't finish, better luck next time!";
            clearInterval(quizTimer);
            document.querySelectorAll('.form-check').forEach(function(el) {
                el.style.display = 'none';
             });
            
            holderEl.innerHTML = '';
            questionCount = 0;
            correctAnswers = 0;        
            timeLeftMintues = 3;
            timeLeftSeconds = 59;

            startButton.disabled = false;
        }
        else if (timeLeftSeconds === 0)
        {
            timeLeftMintues--;
            timeLeftSeconds = 59;
        }
      
    
    }, 1000);

    displayQuestions();

});

function displayQuestions()
{
    if (questionCount == 5)
    {
                
        var theUser = prompt('The Quiz has ended! You scored ' + correctAnswers + ' out of 5! Please enter your Initials to save your score.');
       

        if (theUser.length > 0 && theUser !== null ) 
            {
                
                hScores.push(theUser + ' : ' + correctAnswers);
                localStorage.setItem("hScores", JSON.stringify(hScores));


                
            }
        else
            {
                alert('Your Input was not acceptable, your results will not be saved. Sorry!');
            }
        
        questionCount = 0;
        correctAnswers = 0;        
        timeLeftMintues = 3;
        timeLeftSeconds = 59;

        startButton.disabled = false;

        renderScores();


    }
    else {
        var createQuestionDiv = document.createElement("h4");
        createQuestionDiv.className = "question-div";
        createQuestionDiv.id = "question-div";
        holderEl.appendChild(createQuestionDiv);
        createQuestionDiv.textContent = QuizObj[questionCount].question;

        
        
        for (var i = 0; i < QuizObj[questionCount].questionAnswers.length; i++) 
        {     

            var createQuestionBox = document.createElement("div");
            createQuestionBox.className = "form-check";
        
            holderEl.appendChild(createQuestionBox);
            
            var createQuestionInput = document.createElement("input");
            createQuestionInput.type = "radio";
            createQuestionInput.val = "answer" + i;
            createQuestionInput.id = "question" + i;
            createQuestionInput.className = "form-check-input";
            createQuestionInput.name = "questionInput";
            createQuestionBox.appendChild(createQuestionInput);

            var createQuestionLabel = document.createElement("label");
            createQuestionLabel.className = "form-check-label";
            createQuestionLabel.htmlFor = "question" + i;
            createQuestionLabel.textContent = QuizObj[questionCount].questionAnswers[i];
            createQuestionBox.appendChild(createQuestionLabel);

            createQuestionInput.addEventListener("click", getAnswers); 
        }
    }

   
    
    function getAnswers(event){


        var resultEl = document.createElement("div"); 
        var resultQuote = document.createElement("div"); 
        resultQuote.className = 'theQuote';

        if ("answer" + QuizObj[questionCount].correctAnswerIndex == event.target.val)
        {
            resultEl.className = 'alert alert-success mt-2';
            resultEl.textContent = 'Correct!'           
            resultQuote.textContent = rDial[Math.floor(Math.random() * rDial.length)];
            resultEl.appendChild(resultQuote);
            
            document.getElementById("question-div").appendChild(resultEl);           
           
            correctAnswers++;
        }
        else
        {
            resultEl.className = 'alert alert-danger mt-2';
            resultEl.textContent = 'Wrong!'
            
            resultQuote.textContent = wDial[Math.floor(Math.random() * wDial.length)];
            resultEl.appendChild(resultQuote);

            document.getElementById("question-div").appendChild(resultEl);
            minusTime = true;
        }

        document.querySelectorAll('.form-check').forEach(function(el) {
            el.style.display = 'none';
         });
    
        
        questionCount++;


        setTimeout(function()
        { 
            holderEl.innerHTML = '';
            displayQuestions();
        }, 3000);
    };

}

