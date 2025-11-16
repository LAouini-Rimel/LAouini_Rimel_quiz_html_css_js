
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

