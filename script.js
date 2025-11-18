
// Questions du quiz
const questions = [
    {
        question: "Que signifie HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Quelle propriété CSS est utilisée pour changer la couleur d'arrière-plan?",
        options: [
            "color",
            "bgcolor",
            "background-color",
            "background"
        ],
        correct: 2
    },
    {
        question: "Comment déclarer une fonction en JavaScript?",
        options: [
            "function = myFunction()",
            "function myFunction()",
            "function:myFunction()",
            "function => myFunction()"
        ],
        correct: 1
    },
    {
        question: "Quelle balise HTML est utilisée pour créer un lien?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correct: 1
    },
    {
        question: "Quelle propriété CSS permet d'ajouter de l'espace entre le contenu et la bordure?",
        options: [
            "margin",
            "spacing",
            "padding",
            "border-spacing"
        ],
        correct: 2
    },
    {
        question: "Comment ajouter un commentaire en JavaScript?",
        options: [
            "// Ceci est un commentaire",
            "<!-- Ceci est un commentaire -->",
            "/* Ceci est un commentaire */",
            "** Ceci est un commentaire **"
        ],
        correct: 0
    },
    {
        question: "Quelle méthode JavaScript permet de sélectionner un élément par son ID?",
        options: [
            "document.querySelector()",
            "document.getElementById()",
            "document.getElementByClass()",
            "document.findElement()"
        ],
        correct: 1
    },
    {
        question: "Quelle propriété CSS est utilisée pour changer la police de texte?",
        options: [
            "text-style",
            "font-family",
            "font-style",
            "text-font"
        ],
        correct: 1
    },
    {
        question: "Quelle balise HTML est utilisée pour créer une liste non ordonnée?",
        options: [
            "<ul>",
            "<ol>",
            "<li>",
            "<list>"
        ],
        correct: 0
    },
    {
        question: "Comment déclarer une variable en JavaScript ES6?",
        options: [
            "var myVar",
            "variable myVar",
            "let myVar",
            "const myVar"
        ],
        correct: 2
    },
    {
        question: "Quelle propriété CSS est utilisée pour centrer un élément horizontalement?",
        options: [
            "align: center",
            "text-align: center",
            "margin: 0 auto",
            "center: true"
        ],
        correct: 2
    },
    {
        question: "Quelle méthode JavaScript permet d'ajouter un élément à la fin d'un tableau?",
        options: [
            "array.push()",
            "array.pop()",
            "array.add()",
            "array.append()"
        ],
        correct: 0
    },
    {
        question: "Quelle balise HTML est utilisée pour créer un tableau?",
        options: [
            "<table>",
            "<tab>",
            "<grid>",
            "<tr>"
        ],
        correct: 0
    },
    {
        question: "Comment appliquer un style CSS à un élément avec l'ID 'monElement'?",
        options: [
            ".monElement { }",
            "#monElement { }",
            "element.monElement { }",
            "id.monElement { }"
        ],
        correct: 1
    },
    {
        question: "Quelle méthode JavaScript permet de convertir une chaîne en nombre entier?",
        options: [
            "Number.parseInt()",
            "String.toInteger()",
            "parseInt()",
            "convertToInt()"
        ],
        correct: 2
    }
];

// Variables globales
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let score = 0;
let timer;
let timeLeft = 900; // 15 minutes en secondes
let quizCompleted = false;

// Éléments DOM
const welcomeScreen = document.getElementById('welcome-screen');
const questionScreen = document.getElementById('question-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const saveBtn = document.getElementById('save-btn');
const currentQuestionElement = document.getElementById('current-question');
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressElement = document.getElementById('progress');
const timeElement = document.getElementById('time');
const finalScoreElement = document.getElementById('final-score');
const scoreMessageElement = document.getElementById('score-message');
const resultsDetailsElement = document.getElementById('results-details');
const savedResultsElement = document.getElementById('saved-results');
const scoresListElement = document.getElementById('scores-list');
// Événements
startBtn.addEventListener('click', startQuiz);
prevBtn.addEventListener('click', showPreviousQuestion);
nextBtn.addEventListener('click', showNextQuestion);
submitBtn.addEventListener('click', showResults);
restartBtn.addEventListener('click', restartQuiz);
saveBtn.addEventListener('click', saveResults);

// Fonctions
function startQuiz() {
    welcomeScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    
    // Initialiser le timer
    startTimer();
    
    // Afficher la première question
    showQuestion(currentQuestionIndex);
}

function startTimer() {
    updateTimerDisplay();
    
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResults();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Changer la couleur quand il reste peu de temps
    if (timeLeft < 60) {
        timeElement.style.color = 'var(--danger-color)';
    }
}

function showQuestion(index) {
    // Mettre à jour l'indicateur de progression
    progressElement.style.width = `${((index + 1) / questions.length) * 100}%`;
    currentQuestionElement.textContent = index + 1;
    
    // Afficher la question
    const question = questions[index];
    questionTextElement.textContent = question.question;
    
    // Afficher les options
    optionsContainer.innerHTML = '';
    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        
        // Marquer l'option sélectionnée si elle existe
        if (userAnswers[index] === optionIndex) {
            optionElement.classList.add('selected');
        }
        
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(optionIndex));
        optionsContainer.appendChild(optionElement);
    });
    
    // Gérer l'affichage des boutons de navigation
    prevBtn.classList.toggle('hidden', index === 0);
    nextBtn.classList.toggle('hidden', index === questions.length - 1);
    submitBtn.classList.toggle('hidden', index !== questions.length - 1);
}

function selectOption(optionIndex) {
    // Enregistrer la réponse de l'utilisateur
    userAnswers[currentQuestionIndex] = optionIndex;
    
    // Mettre à jour l'affichage des options
    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.classList.toggle('selected', index === optionIndex);
    });
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function showNextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function showResults() {
    clearInterval(timer);
    quizCompleted = true;
    
    // Calculer le score
    score = 0;
    questions.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    // Afficher l'écran des résultats
    questionScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Afficher le score
    finalScoreElement.textContent = `${score}/${questions.length}`;
    
    // Afficher un message selon le score
    const percentage = (score / questions.length) * 100;
    let message = "";
    if (percentage >= 80) {
        message = "Excellent ! Vous maîtrisez bien ces technologies.";
    } else if (percentage >= 60) {
        message = "Bon travail ! Vous avez de bonnes connaissances.";
    } else if (percentage >= 40) {
        message = "Pas mal ! Continuez à vous améliorer.";
    } else {
        message = "Il y a encore du travail, mais ne vous découragez pas !";
    }
    scoreMessageElement.textContent = message;
    
    // Afficher les détails des réponses
    resultsDetailsElement.innerHTML = '';
    questions.forEach((question, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        
        const questionElement = document.createElement('div');
        questionElement.classList.add('result-question');
        questionElement.textContent = `Question ${index + 1}: ${question.question}`;
        resultItem.appendChild(questionElement);
        
        const userAnswerElement = document.createElement('div');
        userAnswerElement.classList.add('result-answer');
        
        const isCorrect = userAnswers[index] === question.correct;
        const icon = document.createElement('span');
        icon.classList.add(isCorrect ? 'correct-icon' : 'incorrect-icon');
        icon.textContent = isCorrect ? '✓' : '✗';
        userAnswerElement.appendChild(icon);
        
        const answerText = document.createElement('span');
        answerText.textContent = `Votre réponse: ${userAnswers[index] !== null ? question.options[userAnswers[index]] : 'Aucune réponse'}`;
        userAnswerElement.appendChild(answerText);
        resultItem.appendChild(userAnswerElement);
        
        if (!isCorrect) {
            const correctAnswerElement = document.createElement('div');
            correctAnswerElement.classList.add('result-answer');
            
            const correctIcon = document.createElement('span');
            correctIcon.classList.add('correct-icon');
            correctIcon.textContent = '✓';
            correctAnswerElement.appendChild(correctIcon);
            
            const correctText = document.createElement('span');
            correctText.textContent = `Réponse correcte: ${question.options[question.correct]}`;
            correctAnswerElement.appendChild(correctText);
            resultItem.appendChild(correctAnswerElement);
        }
        
        resultsDetailsElement.appendChild(resultItem);
    });
    
    // Charger les résultats sauvegardés
    loadSavedResults();
}

function restartQuiz() {
    // Réinitialiser les variables
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    timeLeft = 900;
    quizCompleted = false;
    
    // Réinitialiser l'interface
    resultsScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    timeElement.style.color = '';
}

function saveResults() {
    if (!quizCompleted) return;
    
    // Récupérer les résultats existants
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    // Ajouter le nouveau résultat
    const result = {
        date: new Date().toLocaleString(),
        score: score,
        total: questions.length,
        percentage: Math.round((score / questions.length) * 100)
    };
    
    savedResults.push(result);
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('quizResults', JSON.stringify(savedResults));
    
    // Afficher un message de confirmation
    alert('Résultats sauvegardés avec succès !');
    
    // Recharger l'affichage des résultats sauvegardés
    loadSavedResults();
}

function loadSavedResults() {
    // Récupérer les résultats sauvegardés
    const savedResults = JSON.parse(localStorage.getItem('quizResults') || '[]');
    
    if (savedResults.length > 0) {
        savedResultsElement.classList.remove('hidden');
        
        // Trier par date (du plus récent au plus ancien)
        savedResults.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Afficher les résultats
        scoresListElement.innerHTML = '';
        savedResults.forEach((result, index) => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result-item');
            resultElement.innerHTML = `
                <strong>${result.date}</strong> - Score: ${result.score}/${result.total} (${result.percentage}%)
            `;
            scoresListElement.appendChild(resultElement);
        });
    } else {
        savedResultsElement.classList.add('hidden');
    }
}
