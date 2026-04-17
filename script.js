const startScreen = document.getElementById('startScreen');
const lessonScreen = document.getElementById('lessonScreen');
const challengeScreen = document.getElementById('challengeScreen');
const completionScreen = document.getElementById('completionScreen');
const helpModal = document.getElementById('helpModal');
const lessonContent = document.getElementById('lessonContent');
const lessonProgress = document.getElementById('lessonProgress');
const methodChoices = document.getElementById('methodChoices');
const dropZone = document.getElementById('dropZone');
const challengeCard = document.getElementById('challengeCard');
const resultMessage = document.getElementById('resultMessage');

const startLessons = document.getElementById('startLessons');
const startChallenges = document.getElementById('startChallenges');
const backToMenuFromLesson = document.getElementById('backToMenuFromLesson');
const backToMenuFromChallenge = document.getElementById('backToMenuFromChallenge');
const prevLesson = document.getElementById('prevLesson');
const nextLesson = document.getElementById('nextLesson');
const submitOrder = document.getElementById('submitOrder');
const shuffleChallenge = document.getElementById('shuffleChallenge');
const reviewLessons = document.getElementById('reviewLessons');
const playAgain = document.getElementById('playAgain');
const helpButton = document.getElementById('helpButton');
const closeHelp = document.getElementById('closeHelp');

const lessons = [
  {
    title: 'Filtration',
    description: 'Use a filter to remove large particles and visible debris from water. Filtration is often the first step when water contains sand, leaves, or dirt.',
    example: 'Good for muddy pond water, cloudiness, and pieces of trash.',
  },
  {
    title: 'Aeration',
    description: 'Add air to water to help remove bad smells and gases. Aeration can improve taste and prepare the water for later treatment.',
    example: 'Use aeration when water smells stale or has a sour odor from standing still.',
  },
  {
    title: 'Activated Carbon',
    description: 'Activated carbon absorbs chemicals, odors, and colors from water. It is essential for removing contaminants that filtration alone cannot capture.',
    example: 'Use activated carbon when water tastes or smells bad even after filtering.',
  },
  {
    title: 'Boiling',
    description: 'Heat water until it boils to kill bacteria, viruses, and most germs. Boiling is a powerful way to make water safe when it is biologically contaminated.',
    example: 'Use boiling when the water may contain disease-causing microorganisms.',
  },
  {
    title: 'UV Treatment',
    description: 'Light kills germs without changing the taste or smell of water. UV treatment is faster than boiling and works well for clear water that may still contain microbes.',
    example: 'Use UV when you want a quick way to disinfect water after it has already been filtered.',
  },
];

const challenges = [
  {
    title: 'Stagnant pond water with smell',
    story: 'Water is still and smells stale. Choose the right purifier steps to make it fresher and safe.',
    methods: ['Filtration', 'Aeration', 'Activated Carbon', 'UV Treatment'],
    answer: ['Filtration', 'Aeration', 'Activated Carbon', 'UV Treatment'],
    feedback: 'Filter out debris first, aerate to remove odor, use activated carbon to absorb chemicals, then UV to kill germs.',
  },
  {
    title: 'Polluted rainwater with dust',
    story: 'Rainwater has collected dust and leaves. Pick the best order to make it drinkable.',
    methods: ['Activated Carbon', 'Filtration', 'Aeration', 'Boiling'],
    answer: ['Filtration', 'Aeration', 'Activated Carbon', 'Boiling'],
    feedback: 'First filter dust and leaves, aerate for stale smell, absorb chemicals with activated carbon, then boil to kill germs.',
  },
  {
    title: 'Local well water with bad taste',
    story: 'Well water looks clear but tastes strange. Choose the purifier steps that fix smell and taste.',
    methods: ['Filtration', 'Activated Carbon', 'UV Treatment'],
    answer: ['Filtration', 'Activated Carbon'],
    feedback: 'Filter first, then activated carbon to remove taste and odor. UV is useful for germs, but the main issue here is taste.',
  },
  {
    title: 'Runoff water with dirt and chemicals',
    story: 'Water from runoff contains dirt and harmful chemicals from the road. Select the correct cleaning order.',
    methods: ['Filtration', 'Activated Carbon', 'Boiling'],
    answer: ['Filtration', 'Activated Carbon'],
    feedback: 'Filter first to remove debris, then activated carbon to absorb roadside chemicals. Boiling does not remove chemical contamination.',
  },
];

let currentLesson = 0;
let currentChallenge = 0;
let activeDrops = [];

function switchScreen(activeScreen) {
  [startScreen, lessonScreen, challengeScreen, completionScreen].forEach(screen => {
    screen.classList.toggle('active', screen === activeScreen);
  });
  resultMessage.textContent = '';
  resultMessage.className = 'result-message';
}

function renderLesson(index) {
  const lesson = lessons[index];
  const isFirstLesson = index === 0;
  const isLastLesson = index === lessons.length - 1;

  lessonContent.innerHTML = `
    <article class="lesson-card animated">
      <div class="lesson-card-header">
        <h3>${lesson.title}</h3>
      </div>
      <p class="lesson-description">${lesson.description}</p>
      <div class="lesson-detail-grid">
        <div class="lesson-detail">
          <span class="lesson-detail-label">Best used for</span>
          <p>${lesson.example}</p>
        </div>
        <div class="lesson-detail">
          <span class="lesson-detail-label">Tip</span>
          <p>Think about what this method removes before placing it in the purification order.</p>
        </div>
      </div>
    </article>
  `;

  lessonProgress.textContent = `${index + 1} / ${lessons.length}`;
  prevLesson.disabled = isFirstLesson;
  nextLesson.disabled = isLastLesson;
}

function renderChallenge(index) {
  const challenge = challenges[index];
  activeDrops = [];
  dropZone.innerHTML = '';
  dropZone.classList.add('empty');
  resultMessage.textContent = '';
  resultMessage.className = 'result-message';

  challengeCard.innerHTML = `
    <div class="challenge-card">
      <h3>${challenge.title}</h3>
      <p>${challenge.story}</p>
      <p><strong>Methods available:</strong> ${challenge.methods.join(', ')}</p>
      <p><em>Tip: Choose the correct order, not just the correct methods.</em></p>
    </div>
  `;

  methodChoices.innerHTML = '';
  challenge.methods.forEach(method => {
    const card = document.createElement('div');
    card.className = 'method-card animated';
    card.draggable = true;
    card.textContent = method;
    card.dataset.method = method;
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    methodChoices.append(card);
  });
}

function handleDragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.method);
  event.target.classList.add('dragging');
}

function handleDragEnd(event) {
  event.target.classList.remove('dragging');
}

function handleDragOver(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const method = event.dataTransfer.getData('text/plain');
  if (!method || activeDrops.includes(method)) {
    return;
  }

  activeDrops.push(method);
  renderDropCards();
}

function renderDropCards() {
  dropZone.innerHTML = '';
  if (activeDrops.length === 0) {
    dropZone.classList.add('empty');
    return;
  }

  dropZone.classList.remove('empty');
  activeDrops.forEach((method, index) => {
    const card = document.createElement('div');
    card.className = 'order-card animated';
    card.textContent = `${index + 1}. ${method}`;
    card.dataset.index = index;
    card.addEventListener('click', () => removeDrop(index));
    dropZone.append(card);
  });
}

function removeDrop(index) {
  activeDrops.splice(index, 1);
  renderDropCards();
}

function checkAnswer() {
  const answer = challenges[currentChallenge].answer;
  const ordered = activeDrops;
  if (ordered.length === 0) {
    showResult('Pick at least one method before submitting.', false);
    return;
  }

  const isCorrect = answer.length === ordered.length && answer.every((method, idx) => ordered[idx] === method);
  const feedback = challenges[currentChallenge].feedback;
  if (isCorrect) {
    showResult(`Correct! ${feedback}`, true);
  } else {
    showResult(`Not quite. ${feedback}`, false);
  }
}

function showResult(text, success) {
  resultMessage.textContent = text;
  resultMessage.className = success ? 'result-message result-success show' : 'result-message result-failure show';
}

function startLessonsMode() {
  currentLesson = 0;
  renderLesson(currentLesson);
  switchScreen(lessonScreen);
}

function startChallengesMode() {
  currentChallenge = 0;
  renderChallenge(currentChallenge);
  switchScreen(challengeScreen);
}

function nextLessonStep() {
  if (currentLesson >= lessons.length - 1) {
    return;
  }

  currentLesson += 1;
  renderLesson(currentLesson);
}

function prevLessonStep() {
  if (currentLesson <= 0) {
    return;
  }

  currentLesson -= 1;
  renderLesson(currentLesson);
}

function nextChallenge() {
  currentChallenge = (currentChallenge + 1) % challenges.length;
  renderChallenge(currentChallenge);
}

function bindEvents() {
  startLessons.addEventListener('click', startLessonsMode);
  startChallenges.addEventListener('click', startChallengesMode);
  backToMenuFromLesson.addEventListener('click', () => switchScreen(startScreen));
  backToMenuFromChallenge.addEventListener('click', () => switchScreen(startScreen));
  prevLesson.addEventListener('click', prevLessonStep);
  nextLesson.addEventListener('click', nextLessonStep);
  submitOrder.addEventListener('click', checkAnswer);
  shuffleChallenge.addEventListener('click', nextChallenge);
  reviewLessons.addEventListener('click', startLessonsMode);
  playAgain.addEventListener('click', startChallengesMode);
  helpButton.addEventListener('click', () => helpModal.classList.remove('hidden'));
  closeHelp.addEventListener('click', () => helpModal.classList.add('hidden'));
  dropZone.addEventListener('dragover', handleDragOver);
  dropZone.addEventListener('drop', handleDrop);
}

bindEvents();
