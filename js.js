const startbtn = document.querySelector('.btn');
const popupinfo = document.querySelector('.popup-info');
const exitbtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continuebtn = document.querySelector('.continue-btn');
const quizsection = document.querySelector('.quiz-section');
const quizbox = document.querySelector('.quiz-box');
const resultbox = document.querySelector('.result-box');
const tryAgain = document.querySelector('.tryAgain-btn');
const goHome = document.querySelector('.goHome-btn');

startbtn.addEventListener('click', () => {
    popupinfo.classList.add('activate');
    main.classList.add('activate');
});
exitbtn.addEventListener('click', () => {
    popupinfo.classList.remove('activate');
    main.classList.remove('activate');

});
continuebtn.addEventListener('click', () => {
    quizsection.classList.add('activate');
    popupinfo.classList.remove('activate');
    main.classList.remove('activate');
    quizbox.classList.add('activate');

    showQuestions(0);
    questionCounter(1);
    headerScore();
});

tryAgain.addEventListener('click', () => {
    quizbox.classList.add('activate');
    resultbox.classList.remove('activate');
    nextbtn.classList.remove('activate');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
            showQuestions(questionCount);
        questionCounter(questionNumb);
headerScore();
});
goHome.addEventListener('click', () => {
    quizsection.classList.remove('activate');
    resultbox.classList.remove('activate');
    nextbtn.classList.remove('activate');

    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
            showQuestions(questionCount);
        questionCounter(questionNumb);
});

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextbtn = document.querySelector('.next-btn');
nextbtn.addEventListener('click', () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        questionNumb++;
        questionCounter(questionNumb);

        nextbtn.classList.remove('activate');

    }
    else {
        showResultBox();
    }
});

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-test');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optiontag = `
      <div class="option"><span>${questions[index].options[0]}</span></div>
     <div class="option"><span>${questions[index].options[1]}</span></div>
      <div class="option"><span>${questions[index].options[2]}</span></div>
       <div class="option"><span>${questions[index].options[3]}</span></div>
    `;

    optionList.innerHTML = optiontag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let alloptions = optionList.children.length;
    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    }
    else {
        answer.classList.add('incorrect');
        for (let i = 0; i < alloptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }

    }
    for (let i = 0; i < alloptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextbtn.classList.add('activate');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`
}

function showResultBox() {
    quizbox.classList.remove('activate');
    resultbox.classList.add('activate');

    const ScoreText = document.querySelector('.score-text');
    ScoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;

    const circularProgress = document.querySelector('.circular-progress');
    const ProgressValue = document.querySelector('.progress-value');

    let progressValueStart = -1;
    let progressValueEnd = (userScore / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() => {
        progressValueStart++;

        ProgressValue.textContent = `${progressValueStart}%`
        circularProgress.style.background = ` conic-gradient(darkmagenta ${progressValueStart * 3.6}deg, rgba(255,255,255,.1) 0deg)`

        if (progressValueStart == progressValueEnd) {
            clearInterval(progress);
        }
    }, speed);
}