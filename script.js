// Game State Management - Simplified and Clear
const GameState = {
  // Core game state
  score: 0,
  currentProblem: null,
  userAnswer: null,
  difficulty: 'easy',
  
  // UI state
  isProcessing: false,
  isInitialized: false,
  
  // Game flow state
  gamePhase: 'INIT' // INIT → FIRST_PROBLEM → WAITING_FOR_ANSWER → PROCESSING_ANSWER → NEXT_PROBLEM
};

// DOM Elements
const elements = {
  loadingScreen: null,
  gameInterface: null,
  errorScreen: null,
  monsterEmoji: null,
  monsterMouth: null,
  particleContainer: null,
  speechBubble: null,
  speechContent: null,
  problemText: null,
  answerInput: null,
  submitBtn: null,
  scoreValue: null,
  scoreStars: null,
  progressFill: null,
  errorMessage: null,
  retryBtn: null
};

// ============================================================================
// MAIN APPLICATION FLOW
// ============================================================================

// Initialize the application
async function init() {
  try {
    console.log('🚀 Initializing Monster Math Helper...');
    
    // Initialize DOM elements
    initializeElements();
    
    // Show loading screen
    showLoadingScreen();
    
    // Validate API configuration
    if (!validateConfig()) {
      throw new Error('Invalid API configuration');
    }
    
    // Simulate loading time for better UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Start the game flow
    await startGame();
    
    console.log('✅ Application initialized successfully');
    
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    showErrorScreen(error.message);
  }
}

// Start the game flow
async function startGame() {
  try {
    // Phase 1: Generate first problem
    GameState.gamePhase = 'FIRST_PROBLEM';
    await generateFirstProblem();
    
    // Show game interface
    hideLoadingScreen();
    GameState.isInitialized = true;
    
    // Welcome message
    await speakMessage("Hi there! I'm your Monster Math Helper! 🎉 Let's solve some fun math problems together!");
    
    // Phase 2: Wait for user input
    GameState.gamePhase = 'WAITING_FOR_ANSWER';
    
  } catch (error) {
    console.error('Failed to start game:', error);
    throw new Error('Failed to start the game. Please check your connection and try again.');
  }
}

// ============================================================================
// PROBLEM GENERATION
// ============================================================================

// Generate first math problem (no previous answer)
async function generateFirstProblem() {
  try {
    console.log('🎯 Generating first problem...');
    GameState.isProcessing = true;
    updateUI();
    
    // API call: Generate problem only (no previous answer)
    const response = await callMathAPI(null, null);
    
    if (response && response.next_problem) {
      // Set the problem
      GameState.currentProblem = response.next_problem;
      GameState.difficulty = response.difficulty || 'easy';
      
      // Display it
      displayProblem(GameState.currentProblem);
      
      console.log('✅ First problem generated:', GameState.currentProblem);
      
    } else {
      throw new Error('Failed to generate first problem');
    }
    
  } catch (error) {
    console.error('Error generating first problem:', error);
    
    // Fallback to demo problem with word scenario
    if (CONFIG.DEMO_MODE) {
      const demoProblems = [
        "Emma has 5 apples and buys 3 more. How many does she have now?",
        "There are 8 dogs in the park and 2 more arrive. How many dogs are there now?",
        "Jake has 10 pencils and gives 4 to his friend. How many does he have left?",
        "Alex has 6 toy cars and gets 2 more for his birthday. How many cars does he have now?",
        "The team scores 7 points in the first half and 5 points in the second half. How many total points?"
      ];
      GameState.currentProblem = demoProblems[Math.floor(Math.random() * demoProblems.length)];
      GameState.difficulty = 'easy';
      displayProblem(GameState.currentProblem);
      console.log('✅ Using fallback problem:', GameState.currentProblem);
    } else {
      throw error;
    }
  } finally {
    GameState.isProcessing = false;
    updateUI();
  }
}

// Generate next problem (after processing an answer)
async function generateNextProblem() {
  try {
    console.log('🎯 Generating next problem...');
    GameState.isProcessing = true;
    updateUI();
    
    // API call: Generate problem only (no previous answer)
    const response = await callMathAPI(null, null);
    
    if (response && response.next_problem) {
      // Set the problem
      GameState.currentProblem = response.next_problem;
      GameState.difficulty = response.difficulty || 'easy';
      
      // Display it
      displayProblem(GameState.currentProblem);
      
      console.log('✅ Next problem generated:', GameState.currentProblem);
      
    } else {
      throw new Error('Failed to generate next problem');
    }
    
  } catch (error) {
    console.error('Error generating next problem:', error);
    
    // Fallback to demo problem with word scenarios
    if (CONFIG.DEMO_MODE) {
      const demoProblems = [
        "Mom buys 4 oranges and 3 bananas. How many pieces of fruit did she buy?",
        "There are 9 flowers in the garden and 3 more bloom. How many flowers are there now?",
        "The library has 12 books and 5 more are donated. How many books are there now?",
        "Sarah has 7 stickers and gets 4 more. How many stickers does she have now?",
        "Tom has 15 crayons and gives 6 to his friend. How many does he have left?"
      ];
      GameState.currentProblem = demoProblems[Math.floor(Math.random() * demoProblems.length)];
      GameState.difficulty = 'easy';
      displayProblem(GameState.currentProblem);
      console.log('✅ Using fallback problem:', GameState.currentProblem);
    } else {
      throw error;
    }
  } finally {
    GameState.isProcessing = false;
    updateUI();
  }
}

// ============================================================================
// ANSWER PROCESSING
// ============================================================================

// Handle submit button click
async function handleSubmit() {
  if (GameState.isProcessing || GameState.gamePhase !== 'WAITING_FOR_ANSWER') {
    return;
  }
  
  const answer = elements.answerInput.value.trim();
  
  if (!answer) {
    showInputError('Please enter an answer!');
    return;
  }
  
  const numericAnswer = parseInt(answer);
  if (isNaN(numericAnswer)) {
    showInputError('Please enter a valid number!');
    return;
  }
  
  // Process the answer
  await processAnswer(numericAnswer);
}

// Process user's answer
async function processAnswer(userAnswer) {
  try {
    console.log('📝 Processing answer:', { problem: GameState.currentProblem, answer: userAnswer });
    
    GameState.gamePhase = 'PROCESSING_ANSWER';
    GameState.isProcessing = true;
    GameState.userAnswer = userAnswer;
    updateUI();
    
    // Step 1: Check if answer is correct locally
    const isCorrect = checkAnswerCorrectness(GameState.currentProblem, userAnswer);
    console.log('✅ Local answer check:', { isCorrect, problem: GameState.currentProblem, answer: userAnswer });
    
    // Step 2: Get AI feedback and next problem in ONE API call
    const response = await callMathAPI(GameState.currentProblem, userAnswer);
    
    // Step 3: Handle the result
    await handleAnswerResult(isCorrect, response);
    
    // Step 4: Set next problem from API response (no additional API call needed)
    if (response && response.next_problem) {
      const nextProblem = response.next_problem;
      
      // Check if the next problem is different from the current one
      if (nextProblem === GameState.currentProblem) {
        console.log('⚠️ API returned same problem, generating fallback...');
        await generateNextProblem();
      } else {
        GameState.currentProblem = nextProblem;
        GameState.difficulty = response.difficulty || 'easy';
        displayProblem(GameState.currentProblem);
        console.log('✅ Next problem set from API response:', GameState.currentProblem);
      }
    } else {
      // Fallback: generate new problem
      console.log('⚠️ No next_problem in API response, generating fallback...');
      await generateNextProblem();
    }
    
    // Step 5: Reset for next round
    GameState.gamePhase = 'WAITING_FOR_ANSWER';
    GameState.userAnswer = null;
    elements.answerInput.value = '';
    elements.answerInput.classList.remove('error');
    
  } catch (error) {
    console.error('Error processing answer:', error);
    
    // Fallback handling
    const isCorrect = checkAnswerCorrectness(GameState.currentProblem, userAnswer);
    await handleAnswerResult(isCorrect, null);
    
    // Generate next problem
    await generateNextProblem();
    GameState.gamePhase = 'WAITING_FOR_ANSWER';
    GameState.userAnswer = null;
    elements.answerInput.value = '';
    elements.answerInput.classList.remove('error');
    
  } finally {
    GameState.isProcessing = false;
    updateUI();
  }
}

// Handle the result of an answer
async function handleAnswerResult(isCorrect, apiResponse) {
  // Update score
  if (isCorrect) {
    GameState.score += 10;
    await celebrateCorrectAnswer();
  }
  
  // Show feedback
  let localFeedback = isCorrect ? 
    "Great job! That's correct! 🎉" : 
    "Not quite right, but keep trying! You're doing great! 💪";
  
  let apiTip = apiResponse && apiResponse.feedback ? apiResponse.feedback : '';
  
  await speakMessage(localFeedback, apiTip);
  updateScore();
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Initialize DOM element references
function initializeElements() {
  elements.loadingScreen = document.getElementById('loading-screen');
  elements.gameInterface = document.getElementById('game-interface');
  elements.errorScreen = document.getElementById('error-screen');
  elements.monsterEmoji = document.getElementById('monster-emoji');
  elements.monsterMouth = document.getElementById('monster-mouth');
  elements.particleContainer = document.getElementById('particle-container');
  elements.speechBubble = document.getElementById('speech-bubble');
  elements.speechContent = document.getElementById('speech-content');
  elements.problemText = document.getElementById('problem-text');
  elements.answerInput = document.getElementById('answer-input');
  elements.submitBtn = document.getElementById('submit-btn');
  elements.scoreValue = document.getElementById('score-value');
  elements.scoreStars = document.getElementById('score-stars');
  elements.progressFill = document.getElementById('progress-fill');
  elements.errorMessage = document.getElementById('error-message');
  elements.retryBtn = document.getElementById('retry-btn');
  
  // Add event listeners
  addEventListeners();
}

// Add event listeners
function addEventListeners() {
  // Submit button
  elements.submitBtn.addEventListener('click', handleSubmit);
  
  // Enter key on input
  elements.answerInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  });
  
  // Input validation
  elements.answerInput.addEventListener('input', validateInput);
  
  // Retry button
  elements.retryBtn.addEventListener('click', () => {
    hideErrorScreen();
    init();
  });
}

// Validate API configuration
function validateConfig() {
  if (!CONFIG.API_KEY || CONFIG.API_KEY === 'PASTE_YOUR_IO_NET_API_KEY_HERE') {
    return false;
  }
  
  if (!CONFIG.API_ENDPOINT || !CONFIG.MODEL) {
    return false;
  }
  
  return true;
}

// Show loading screen
function showLoadingScreen() {
  elements.loadingScreen.classList.remove('hidden');
  elements.gameInterface.classList.add('hidden');
  elements.errorScreen.classList.add('hidden');
}

// Hide loading screen
function hideLoadingScreen() {
  elements.loadingScreen.classList.add('hidden');
  elements.gameInterface.classList.remove('hidden');
}

// Show error screen
function showErrorScreen(message) {
  elements.errorMessage.textContent = message;
  elements.loadingScreen.classList.add('hidden');
  elements.gameInterface.classList.add('hidden');
  elements.errorScreen.classList.remove('hidden');
}

// Hide error screen
function hideErrorScreen() {
  elements.errorScreen.classList.add('hidden');
}

// Display problem in UI
function displayProblem(problem) {
  elements.problemText.textContent = problem;
  
  // Add entrance animation
  elements.problemText.style.animation = 'none';
  elements.problemText.offsetHeight; // Trigger reflow
  elements.problemText.style.animation = 'slideIn 0.5s ease-out';
}

// Check if answer is correct (improved evaluation for word problems)
function checkAnswerCorrectness(problem, answer) {
  try {
    const problemText = problem.toLowerCase();
    
    // Handle simple math expressions (e.g., "What is 5 + 3?")
    if (problemText.includes('what is') && (problemText.includes('+') || problemText.includes('-') || problemText.includes('×') || problemText.includes('*'))) {
      if (problemText.includes('+')) {
        const numbers = problemText.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
          const expected = parseInt(numbers[0]) + parseInt(numbers[1]);
          return answer === expected;
        }
      } else if (problemText.includes('-')) {
        const numbers = problemText.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
          const expected = parseInt(numbers[0]) - parseInt(numbers[1]);
          return answer === expected;
        }
      } else if (problemText.includes('×') || problemText.includes('*')) {
        const numbers = problemText.match(/\d+/g);
        if (numbers && numbers.length >= 2) {
          const expected = parseInt(numbers[0]) * parseInt(numbers[1]);
          return answer === expected;
        }
      }
    }
    
    // Handle word problems (e.g., "Sarah has 5 pencils, adds 2 more...")
    if (problemText.includes('add') || problemText.includes('plus') || problemText.includes('more') || problemText.includes('gets') || problemText.includes('buys')) {
      const numbers = problemText.match(/\d+/g);
      if (numbers && numbers.length >= 2) {
        const expected = parseInt(numbers[0]) + parseInt(numbers[1]);
        return answer === expected;
      }
    } else if (problemText.includes('give') || problemText.includes('take away') || problemText.includes('left') || problemText.includes('loses') || problemText.includes('uses')) {
      const numbers = problemText.match(/\d+/g);
      if (numbers && numbers.length >= 2) {
        const expected = parseInt(numbers[0]) - parseInt(numbers[1]);
        return answer === expected;
      }
    }
    
    console.log('⚠️ Could not parse problem:', problemText);
    return false;
  } catch (error) {
    console.error('Error checking answer:', error);
    return false;
  }
}

// Validate input
function validateInput() {
  const value = elements.answerInput.value;
  const numericValue = parseInt(value);
  
  if (value && isNaN(numericValue)) {
    elements.answerInput.classList.add('error');
  } else {
    elements.answerInput.classList.remove('error');
  }
}

// Show input error
function showInputError(message) {
  elements.answerInput.classList.add('error');
  speakMessage(message);
}

// Update UI based on game state
function updateUI() {
  // Update submit button
  elements.submitBtn.disabled = GameState.isProcessing;
  elements.submitBtn.textContent = GameState.isProcessing ? 'Processing...' : 'Submit Answer';
  
  // Update input field
  elements.answerInput.disabled = GameState.isProcessing;
  
  // Update monster state
  if (GameState.isProcessing) {
    setMonsterState('thinking');
  } else {
    setMonsterState('idle');
  }
}

// Set monster animation state
function setMonsterState(state) {
  const monster = elements.monsterEmoji;
  const mouth = elements.monsterMouth;
  
  // Remove all state classes
  monster.className = 'monster-emoji';
  mouth.className = 'monster-mouth-overlay';
  
  switch (state) {
    case 'idle':
      monster.style.animation = 'bounce 2s infinite ease-in-out';
      break;
    case 'talking':
      monster.style.animation = 'bounce 1s infinite ease-in-out';
      mouth.classList.add('talking');
      break;
    case 'thinking':
      monster.style.animation = 'bounce 1.5s infinite ease-in-out, sway 3s infinite ease-in-out';
      break;
    case 'happy':
      monster.style.animation = 'bounce 0.8s infinite ease-in-out, pulse 0.5s infinite';
      break;
  }
}

// Speak message with typewriter effect
async function speakMessage(message, apiTip) {
  setMonsterState('talking');
  
  const content = elements.speechContent;
  content.textContent = '';
  
  // Typewriter effect
  for (let i = 0; i < message.length; i++) {
    content.textContent += message[i];
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  
  // Show API tip if provided
  let tipElem = document.getElementById('api-tip');
  if (!tipElem) {
    tipElem = document.createElement('div');
    tipElem.id = 'api-tip';
    tipElem.style.fontSize = '14px';
    tipElem.style.color = '#2196F3';
    tipElem.style.marginTop = '8px';
    tipElem.style.textAlign = 'center';
    elements.speechBubble.appendChild(tipElem);
  }
  tipElem.textContent = apiTip ? `💡 Monster tip: ${apiTip}` : '';

  // Stop talking after delay
  setTimeout(() => {
    setMonsterState('idle');
  }, 1000);
}

// Celebrate correct answer
async function celebrateCorrectAnswer() {
  setMonsterState('happy');
  
  // Create celebration particles
  createCelebrationParticles();
  
  // Flash background
  document.body.style.animation = 'colorFlash 0.5s ease-out';
  
  setTimeout(() => {
    document.body.style.animation = '';
  }, 500);
}

// Create celebration particles
function createCelebrationParticles() {
  const particles = ['⭐', '✨', '🎉', '💝', '🌟'];
  const container = elements.particleContainer;
  
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
    particle.style.position = 'absolute';
    particle.style.left = Math.random() * 200 + 'px';
    particle.style.top = Math.random() * 200 + 'px';
    particle.style.fontSize = '20px';
    particle.style.animation = 'fall 2s ease-out forwards';
    particle.style.zIndex = '1';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 2000);
  }
}

// Update score display
function updateScore() {
  elements.scoreValue.textContent = GameState.score;
  
  // Update stars based on score
  const starCount = Math.floor(GameState.score / 10);
  elements.scoreStars.textContent = '⭐'.repeat(Math.min(starCount, 5));
  
  // Update progress bar
  const progress = Math.min((GameState.score % 50) / 50 * 100, 100);
  elements.progressFill.style.width = progress + '%';
}

// ============================================================================
// API INTEGRATION
// ============================================================================

// Call Math API
async function callMathAPI(prevProblem, prevAnswer) {
  try {
    console.log('🔗 Calling IO.net API...', { prevProblem, prevAnswer });
    
    const response = await fetch(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.API_KEY}`
      },
      body: JSON.stringify({
        model: CONFIG.MODEL,
        messages: [
          {
            role: 'system',
            content: `You are a friendly monster tutor for kids aged 6-12. You help with math homework in a fun, encouraging way. Always be positive and supportive. Generate simple math problems appropriate for elementary school students.`
          },
          {
            role: 'user',
            content: generatePrompt(prevProblem, prevAnswer, GameState.score, GameState.difficulty)
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const content = data.choices[0].message.content;
      
      // Try to parse JSON response
      try {
        const result = JSON.parse(content);
        console.log('✅ API response:', result);
        return result;
      } catch (e) {
        // Fallback: return simple text response
        const result = {
          feedback: content,
          next_problem: generateFallbackProblem(),
          difficulty: GameState.difficulty
        };
        console.log('⚠️ API response (fallback):', result);
        return result;
      }
    } else {
      throw new Error('Invalid API response format');
    }
    
  } catch (error) {
    console.error('❌ API call failed:', error);
    throw error;
  }
}

// Generate prompt for API
function generatePrompt(prevProblem, prevAnswer, score, difficulty) {
  let prompt = '';
  
  if (prevProblem && prevAnswer !== null && prevAnswer !== undefined) {
    // First, determine if the answer is correct locally
    const isCorrect = checkAnswerCorrectness(prevProblem, prevAnswer);
    
    prompt += `Previous problem: ${prevProblem}\n`;
    prompt += `Student's answer: ${prevAnswer}\n`;
    prompt += `Is the answer correct? ${isCorrect ? 'YES' : 'NO'}\n`;
    prompt += `Current score: ${score}\n`;
    prompt += `Current difficulty: ${difficulty}\n\n`;
    
    // Clear instructions based on whether answer is correct
    if (isCorrect) {
      prompt += `The student's answer is CORRECT! Please provide very encouraging feedback and celebrate their success. `;
      prompt += `Then generate a NEW, DIFFERENT math problem.\n\n`;
    } else {
      prompt += `The student's answer is INCORRECT. Please provide supportive and encouraging feedback. `;
      prompt += `Be kind and motivating - don't discourage them. Then generate a NEW, DIFFERENT math problem.\n\n`;
    }
    
    prompt += `Important: Generate engaging word problems for elementary school students (ages 6-12). `;
    prompt += `Use VARIED scenarios from these categories:\n`;
    prompt += `- Food: "Emma has X apples and buys Y more. How many does she have now?"\n`;
    prompt += `- Animals: "There are X dogs in the park and Y more arrive. How many dogs are there now?"\n`;
    prompt += `- Sports: "The team scores X points in the first half and Y points in the second half. How many total points?"\n`;
    prompt += `- School: "Jake has X pencils and gives Y to his friend. How many does he have left?"\n`;
    prompt += `- Toys: "Alex has X toy cars and gets Y more for his birthday. How many cars does he have now?"\n`;
    prompt += `- Nature: "There are X flowers in the garden and Y more bloom. How many flowers are there now?"\n`;
    prompt += `- Shopping: "Mom buys X oranges and Y bananas. How many pieces of fruit did she buy?"\n`;
    prompt += `- Books: "The library has X books and Y more are donated. How many books are there now?"\n\n`;
    prompt += `Use small numbers (1-20) and basic operations (addition, subtraction). `;
    prompt += `The next problem MUST be different from: "${prevProblem}"\n\n`;
    
  } else {
    // First problem generation
    prompt += `Generate an engaging word problem for elementary school students (ages 6-12). `;
    prompt += `Use VARIED scenarios from these categories:\n`;
    prompt += `- Food: "Emma has X apples and buys Y more. How many does she have now?"\n`;
    prompt += `- Animals: "There are X dogs in the park and Y more arrive. How many dogs are there now?"\n`;
    prompt += `- Sports: "The team scores X points in the first half and Y points in the second half. How many total points?"\n`;
    prompt += `- School: "Jake has X pencils and gives Y to his friend. How many does he have left?"\n`;
    prompt += `- Toys: "Alex has X toy cars and gets Y more for his birthday. How many cars does he have now?"\n`;
    prompt += `- Nature: "There are X flowers in the garden and Y more bloom. How many flowers are there now?"\n`;
    prompt += `- Shopping: "Mom buys X oranges and Y bananas. How many pieces of fruit did she buy?"\n`;
    prompt += `- Books: "The library has X books and Y more are donated. How many books are there now?"\n\n`;
    prompt += `Use small numbers (1-20) and basic operations (addition, subtraction).\n\n`;
  }
  
  prompt += `Respond in this exact JSON format:\n{\n  "feedback": "encouraging response about the answer",\n  "next_problem": "Choose from the varied scenarios above",\n  "celebration": "extra encouragement for correct answers",\n  "difficulty": "easy/medium/hard"\n}`;
  
  return prompt;
}

// Generate fallback problem
function generateFallbackProblem() {
  const problems = [
    "Emma has 3 apples and buys 5 more. How many does she have now?",
    "There are 6 dogs in the park and 4 more arrive. How many dogs are there now?",
    "Jake has 8 pencils and gives 2 to his friend. How many does he have left?",
    "Alex has 5 toy cars and gets 3 more for his birthday. How many cars does he have now?",
    "The team scores 6 points in the first half and 4 points in the second half. How many total points?"
  ];
  
  return problems[Math.floor(Math.random() * problems.length)];
}

// ============================================================================
// CSS ANIMATIONS
// ============================================================================

// Add additional CSS animations
const additionalStyles = `
@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes sway {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

@keyframes fall {
  from { transform: translateY(-50px); opacity: 1; }
  to { transform: translateY(200px); opacity: 0; }
}

@keyframes colorFlash {
  0% { background: linear-gradient(135deg, #f0f8ff 0%, #e3f2fd 100%); }
  50% { background: linear-gradient(135deg, #4CAF50 0%, #2196F3 100%); }
  100% { background: linear-gradient(135deg, #f0f8ff 0%, #e3f2fd 100%); }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 