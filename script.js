const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const cat = document.getElementById('cat');
const catFace = cat.querySelector('.cat-face');
const speechBubble = document.getElementById('speechBubble');
const pawLeft = document.getElementById('pawLeft');
const pawRight = document.getElementById('pawRight');
const eyes = cat.querySelectorAll('.cat-eye');
const blushes = cat.querySelectorAll('.cat-blush');

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetInput = false;

// ===== Web Audio API 사운드 =====
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const now = audioCtx.currentTime;

  if (type === 'number') {
    // 짧고 귀여운 '뿅' 사운드
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.12);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.start(now);
    osc.stop(now + 0.15);
  } else if (type === 'operator') {
    // 두 음짜리 '삐빅' 사운드
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523, now);
    osc.frequency.setValueAtTime(659, now + 0.08);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.start(now);
    osc.stop(now + 0.18);
  } else if (type === 'equals') {
    // 성공! 세 음 올라가는 '빠바밤'
    [523, 659, 784].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);
      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.15);
      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.15);
    });
  } else if (type === 'clear') {
    // 내려가는 '뿌웅' 사운드
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.25);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

// ===== 고양이 리액션 =====
const reactions = [
  '앙!', '냥!', '뿅!', '앙~', '먀옹!', '끄응..', '냥냥!', '앙앙!'
];

let reactionTimeout = null;

function triggerReaction(type) {
  // 말풍선
  clearTimeout(reactionTimeout);
  const msg = reactions[Math.floor(Math.random() * reactions.length)];
  speechBubble.textContent = msg;
  speechBubble.classList.add('show');
  reactionTimeout = setTimeout(() => speechBubble.classList.remove('show'), 600);

  // 입 벌리기
  catFace.classList.add('open-mouth');
  setTimeout(() => catFace.classList.remove('open-mouth'), 400);

  // 눈 반짝
  eyes.forEach(eye => {
    eye.classList.remove('sparkle');
    void eye.offsetWidth;
    eye.classList.add('sparkle');
    setTimeout(() => eye.classList.remove('sparkle'), 450);
  });

  // 볼터치 반짝
  blushes.forEach(b => {
    b.classList.remove('glow');
    void b.offsetWidth;
    b.classList.add('glow');
    setTimeout(() => b.classList.remove('glow'), 500);
  });

  // 포즈: 타입에 따라 다른 애니메이션
  cat.classList.remove('bounce', 'tilt-left', 'tilt-right', 'jump');
  pawLeft.classList.remove('wave-left');
  pawRight.classList.remove('wave-right');
  void cat.offsetWidth;

  if (type === 'number') {
    cat.classList.add('bounce');
    setTimeout(() => cat.classList.remove('bounce'), 400);
  } else if (type === 'operator') {
    const dir = Math.random() > 0.5;
    cat.classList.add(dir ? 'tilt-left' : 'tilt-right');
    if (dir) {
      pawLeft.classList.add('wave-left');
      setTimeout(() => pawLeft.classList.remove('wave-left'), 500);
    } else {
      pawRight.classList.add('wave-right');
      setTimeout(() => pawRight.classList.remove('wave-right'), 500);
    }
    setTimeout(() => cat.classList.remove('tilt-left', 'tilt-right'), 450);
  } else if (type === 'equals') {
    cat.classList.add('jump');
    pawLeft.classList.add('wave-left');
    pawRight.classList.add('wave-right');
    setTimeout(() => {
      cat.classList.remove('jump');
      pawLeft.classList.remove('wave-left');
      pawRight.classList.remove('wave-right');
    }, 500);
  } else if (type === 'clear') {
    cat.classList.add('bounce');
    setTimeout(() => cat.classList.remove('bounce'), 400);
  }
}

// ===== 계산기 로직 =====
function updateDisplay() {
  resultEl.textContent = currentInput;
  expressionEl.textContent = previousInput + (operator ? ' ' + getOperatorSymbol(operator) : '');
}

function getOperatorSymbol(op) {
  const symbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
  return symbols[op] || '';
}

function inputNumber(value) {
  if (shouldResetInput) {
    currentInput = value === '.' ? '0.' : value;
    shouldResetInput = false;
  } else {
    if (value === '.' && currentInput.includes('.')) return;
    if (currentInput === '0' && value !== '.') {
      currentInput = value;
    } else {
      currentInput += value;
    }
  }
  updateDisplay();
  triggerReaction('number');
  playSound('number');
}

function handleOperator(action) {
  const current = parseFloat(currentInput);

  if (operator && !shouldResetInput) {
    const prev = parseFloat(previousInput);
    const result = calculate(prev, current, operator);
    currentInput = formatResult(result);
    previousInput = currentInput;
  } else {
    previousInput = currentInput;
  }

  operator = action;
  shouldResetInput = true;
  updateDisplay();
  triggerReaction('operator');
  playSound('operator');
}

function calculate(a, b, op) {
  switch (op) {
    case 'add': return a + b;
    case 'subtract': return a - b;
    case 'multiply': return a * b;
    case 'divide': return b === 0 ? 'Error' : a / b;
    default: return b;
  }
}

function formatResult(value) {
  if (value === 'Error') return 'Error';
  if (typeof value !== 'number') return String(value);

  const str = String(value);
  if (str.length > 12) {
    return parseFloat(value.toPrecision(10)).toString();
  }
  return str;
}

function handleEquals() {
  if (operator === null) return;

  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  const result = calculate(prev, current, operator);

  expressionEl.textContent = previousInput + ' ' + getOperatorSymbol(operator) + ' ' + currentInput + ' =';
  currentInput = formatResult(result);
  resultEl.textContent = currentInput;

  previousInput = '';
  operator = null;
  shouldResetInput = true;
  triggerReaction('equals');
  playSound('equals');
}

function handleClear() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetInput = false;
  updateDisplay();
  triggerReaction('clear');
  playSound('clear');
}

function handleSign() {
  if (currentInput === '0' || currentInput === 'Error') return;
  currentInput = currentInput.startsWith('-')
    ? currentInput.slice(1)
    : '-' + currentInput;
  updateDisplay();
  triggerReaction('operator');
  playSound('operator');
}

function handlePercent() {
  if (currentInput === 'Error') return;
  currentInput = formatResult(parseFloat(currentInput) / 100);
  updateDisplay();
  triggerReaction('operator');
  playSound('operator');
}

// 버튼 클릭 이벤트
document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('.btn');
  if (!btn) return;

  // AudioContext resume (브라우저 정책 대응)
  if (audioCtx.state === 'suspended') audioCtx.resume();

  if (currentInput === 'Error' && !btn.dataset.action?.includes('clear')) {
    handleClear();
  }

  if (btn.dataset.value !== undefined) {
    inputNumber(btn.dataset.value);
  } else {
    switch (btn.dataset.action) {
      case 'clear': handleClear(); break;
      case 'sign': handleSign(); break;
      case 'percent': handlePercent(); break;
      case 'add':
      case 'subtract':
      case 'multiply':
      case 'divide': handleOperator(btn.dataset.action); break;
      case 'equals': handleEquals(); break;
    }
  }
});

// 키보드 입력 지원
document.addEventListener('keydown', (e) => {
  if (audioCtx.state === 'suspended') audioCtx.resume();

  if (e.key >= '0' && e.key <= '9') inputNumber(e.key);
  else if (e.key === '.') inputNumber('.');
  else if (e.key === '+') handleOperator('add');
  else if (e.key === '-') handleOperator('subtract');
  else if (e.key === '*') handleOperator('multiply');
  else if (e.key === '/') { e.preventDefault(); handleOperator('divide'); }
  else if (e.key === 'Enter' || e.key === '=') handleEquals();
  else if (e.key === 'Escape') handleClear();
  else if (e.key === '%') handlePercent();
});
