

'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'Which two new typings were added in generation 2 of Pokemon?',
      answers: [
        'Dark, Fairy',
        'Fairy, Steel',
        'Dark, Steel',
        'Steel, Ice'
      ],
      correctAnswer: 'C'
    },
    {
      question: 'How many Gym badges do you need to face the elite four?',
      answers: [
        '10',
        '8',
        '12',
        '7'
      ],
      correctAnswer: 'B'
    },
    {
      question: 'How many times weak is a steel/grass type pokemon to a fire type move?',
      answers: [
        'x4',
        'x8',
        'x10',
        'x2'
      ],
      correctAnswer: 'A'
    },
    {
      question: 'In which region is Gen 1 based in?',
      answers: [
        'Sinnoh',
        'Johto',
        'Galar',
        'Kanto'
      ],
      correctAnswer: 'D'
    },
    {
      question: 'How many evolution paths does Eevee have in gen 8?',
      answers: [
        '8',
        '7',
        '3',
        '5'
      ],
      correctAnswer: 'A'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};


function generateMainPage() {
  console.log('Generating main...');

  return $('.mainPage').html(`<form class='startScreen'>
      <h2>Start Quiz</h2>
      <button id='submit' type='submit'>Begin</button>
    </form>`);
}



function submit() {
  $('.startScreen').submit(function (event) {
    event.preventDefault();
    store.quizStarted = true;
    render();
  });
}


function submitAnswer() {
  $('.mainPage').on('click', '#submitAnswer', function (event) {

    let answer = $('input:checked').val();
    let correct = store.questions[store.questionNumber].correctAnswer;
    if (answer !== undefined) {


      if (answer === correct) {
        $('#submitAnswer').hide();
        $('#feedbackCorrect').show();
        console.log('correct');
        store.score++;
      } else {
        $('#submitAnswer').hide();
        $('#feedbackIncorrect').show();
      }
      store.questionNumber++;
    }
  });
}

function nextQuestion() {
  $('.mainPage').on('click', '#nextQuestion', function (event) {
    if ((store.questionNumber) >= store.questions.length) {
      renderGameOver();
      console.log('gameover');
    } else {
      renderQuestion();
      console.log("moving on");
    }
  });
}




function renderQuestion() {
  console.log('rendering question');
  $('.mainPage').html(
    `<div class='questionPage'>
    <form class='question-screen'>
    <h3>#${store.questionNumber + 1} out ${store.questions.length}</h3>
  <h2>${store.questions[store.questionNumber].question}</h2>
  <ul>
  <li>
  <input type='radio' id='A' name='answer' value='A'required>
  <label for='A'>A.${store.questions[store.questionNumber].answers[0]}</label>
  </li>
  <li>
  <input type='radio' id='B' name='answer' value='B'required>
  <label for='B'>B.${store.questions[store.questionNumber].answers[1]}</label>
  </li>
  <li>
  <input type='radio' id='C' name='answer' value='C' required>
  <label for='C'>C.${store.questions[store.questionNumber].answers[2]}</label>
  </li>
  <li>
  <input type='radio' id='D' name='answer' value='D' required>
  <label for='D'>D.${store.questions[store.questionNumber].answers[3]}</label>
  </li>
  <button id='submitAnswer' type='button'>Submit Answer</button>
  <h4>Current score: ${store.score} out of ${store.questions.length}</h4>
  </form>
  <form class='feedbackCorrect' id='feedbackCorrect'>
  <h2>Congrats!!!</h2>
  <p>You got it right!</p>
  <button type='button' id='nextQuestion'>Next</button>
  </form>
  <form class='feedbackIncorrect' id='feedbackIncorrect'>
  <h2>Uh Oh!</h2>
  <p>You got it wrong! The correct answer is ${store.questions[store.questionNumber].correctAnswer} </p>
  <button type='button' id='nextQuestion'>Next</button>
  </form>
  </div>`);
  $('#feedbackCorrect').hide();
  $('#feedbackIncorrect').hide();

}


function renderGameOver() {
  $('.mainPage').html(`<form class="start-screen">
      <h2>Want to try again?</h2>
      <p>Your score was: ${store.score} out of ${store.questions.length}</p>
      <button type="submit">Try Again</button>
    </form>`)
}


function render() {
  console.log('started render');
  $('#hdr').html(headerUi());
  if (store.quizStarted === false) {
    console.log('going to main page')
    generateMainPage();
  } else {
    renderQuestion();
  }
}
function headerUi() {
  return `  <header>
<h1>Bailey's Pokemon Quiz</h1>
</header>`
}

function generateHtml() {
  $('#mainBody').html('<div id="hdr"></div><div class="startScreen"></div> <div class="mainPage"></div>')
}



$(function main() {
  generateHtml()
  render();
  submit();
  submitAnswer();
  nextQuestion();
});
