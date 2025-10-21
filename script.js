const quizData = {
  math: {
    easy: [
      { question: "What is 5 + 3?", options: ["6", "7", "8", "9"], answer: "8" },
      { question: "What is 9 - 4?", options: ["6", "5", "4", "3"], answer: "5" },
      { question: "What is 2 × 3?", options: ["4", "5", "6", "7"], answer: "6" },
      { question: "What is 10 ÷ 2?", options: ["4", "5", "6", "8"], answer: "5" },
      { question: "What is 7 + 2?", options: ["8", "9", "10", "11"], answer: "9" },
    ],
    medium: [
      { question: "What is 12 × 3?", options: ["30", "33", "36", "39"], answer: "36" },
      { question: "What is 81 ÷ 9?", options: ["7", "8", "9", "10"], answer: "9" },
      { question: "What is (5 × 5) + 10?", options: ["20", "25", "30", "35"], answer: "35" },
      { question: "What is 7²?", options: ["49", "42", "56", "64"], answer: "49" },
      { question: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: "30" },
    ],
    hard: [
      { question: "What is the square root of 256?", options: ["14", "15", "16", "18"], answer: "16" },
      { question: "What is (8 × 6) ÷ 4?", options: ["10", "11", "12", "13"], answer: "12" },
      { question: "Simplify: 3² + 4²", options: ["24", "25", "26", "27"], answer: "25" },
      { question: "What is 2³ × 3²?", options: ["48", "36", "72", "24"], answer: "72" },
      { question: "Solve for x: 2x + 6 = 14", options: ["3", "4", "5", "6"], answer: "4" },
    ]
  },
  webdev: {
    easy: [
      { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyperlink Markup Language", "None"], answer: "Hyper Text Markup Language" },
      { question: "What is CSS used for?", options: ["Styling", "Structure", "Logic", "Database"], answer: "Styling" },
      { question: "Which tag is used for links?", options: ["<link>", "<a>", "<href>", "<url>"], answer: "<a>" },
      { question: "Which file extension is used for JavaScript?", options: [".js", ".java", ".py", ".html"], answer: ".js" },
      { question: "Which HTML tag is used for images?", options: ["<img>", "<image>", "<src>", "<pic>"], answer: "<img>" },
    ],
    medium: [
      { question: "Which CSS property controls text size?", options: ["font-size", "text-style", "font-weight", "size"], answer: "font-size" },
      { question: "Which HTML tag defines a table row?", options: ["<td>", "<tr>", "<th>", "<row>"], answer: "<tr>" },
      { question: "In JavaScript, which symbol is used for comments?", options: ["//", "/*", "#", "<!--"], answer: "//" },
      { question: "What is the correct way to write a function in JS?", options: ["function myFunc()", "def myFunc()", "func myFunc()", "declare myFunc()"], answer: "function myFunc()" },
      { question: "Which tag is used for an unordered list?", options: ["<ul>", "<ol>", "<li>", "<list>"], answer: "<ul>" },
    ],
    hard: [
      { question: "Which CSS layout module uses 'display: flex'?", options: ["Grid", "Flexbox", "Float", "Block"], answer: "Flexbox" },
      { question: "Which method converts JSON to a JS object?", options: ["JSON.parse()", "JSON.stringify()", "parse.JSON()", "convert.JSON()"], answer: "JSON.parse()" },
      { question: "What does DOM stand for?", options: ["Document Object Model", "Data Object Module", "Display Object Management", "Document Order Model"], answer: "Document Object Model" },
      { question: "Which React hook is used for state management?", options: ["useState", "useEffect", "useRef", "useMemo"], answer: "useState" },
      { question: "Which tag is used to include JS in HTML?", options: ["<script>", "<js>", "<javascript>", "<code>"], answer: "<script>" },
    ]
  }
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;

function startQuiz() {
  const category = document.getElementById("category").value;
  const difficulty = document.getElementById("difficulty").value;

  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  currentQuiz = shuffle([...quizData[category][difficulty]]).slice(0, 5);
  currentIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const container = document.getElementById("question-container");
  container.innerHTML = "";

  const currentQ = currentQuiz[currentIndex];
  const shuffledOptions = shuffle([...currentQ.options]);

  const qEl = document.createElement("h3");
  qEl.textContent = currentQ.question;
  container.appendChild(qEl);

  shuffledOptions.forEach(opt => {
    const btn = document.createElement("div");
    btn.textContent = opt;
    btn.classList.add("option");
    btn.onclick = () => checkAnswer(btn, currentQ.answer);
    container.appendChild(btn);
  });

  document.getElementById("progress").textContent = `Question ${currentIndex + 1} of 5`;
}

function checkAnswer(selected, correct) {
  const options = document.querySelectorAll(".option");
  options.forEach(opt => {
    if (opt.textContent === correct) {
      opt.classList.add("correct");
    } else {
      opt.classList.add("wrong");
    }
    opt.onclick = null;
  });

  if (selected.textContent === correct) score++;
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < 5) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  document.getElementById("score").textContent = score;
}

function restartQuiz() {
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

