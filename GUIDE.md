# Project Specification - Homework Helper Application

REAL CURRENT TESTING API KEY:
API_KEY=io-v2-eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvd25lciI6ImQ1OTdlZmE0LTBkZDUtNDJmOC1hMWQ2LWY0NmVmNjYxM2QwNyIsImV4cCI6NDkwNDg4NTQwNX0.l8TA4W3zz8CEuhsY6FuMEfx4yNHprLYX69WlAZvy8RkSSVFvVPoYjxWMlEKV8ZIbd8hG748uKDOU4lOmxj1qew

## Project Overview
Build a kid-friendly AI-powered math homework helper featuring a cute monster character created entirely with emoji and CSS. This application demonstrates how to turn raw API access into a user-friendly AI agent that solves real problems.

## Core Requirements

### Technical Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **No external dependencies**: Must work offline except for API calls
- **No image files**: All visual assets created with emoji + CSS
- **Browser compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

### File Structure
```
homework-helper/
├── index.html          # Main application page
├── style.css           # All styling and animations
├── script.js           # Application logic and API integration
├── config.js           # API configuration
└── README.md           # Setup instructions
```

## Character Design Specification (Emoji + CSS)

### Base Monster Character
**Primary emoji**: 👾 (alien monster - use this as the foundation)
**Implementation approach**:
- Use the 👾 emoji as the base character body
- Overlay CSS elements for enhanced animations
- Do NOT replace the emoji - enhance it with CSS

### CSS Enhancement Layers
1. **Base container**: Position the 👾 emoji
2. **Animated mouth**: CSS oval that overlays the emoji mouth area
3. **Eye enhancements**: Optional CSS circles for blinking
4. **Animation effects**: Bouncing, scaling, rotation transforms
5. **Particle effects**: Surrounding emoji decorations

### Animation Requirements
- **Idle state**: Gentle bouncing animation (transform: translateY)
- **Speaking state**: Mouth overlay opens/closes with CSS transitions
- **Happy state**: Larger bounce + rotation + scale increase
- **Thinking state**: Slight side-to-side movement

### Supporting Visual Elements
- **Decorative emojis**: ⭐ ✨ 🎉 💝 🌟 (appear/disappear around monster)
- **Background**: CSS gradients that change color with each problem
- **UI elements**: Colorful buttons and input fields with CSS styling only

## Application Flow & Features

### Initial Load Sequence
1. **Loading screen**: Animated 👾 with bouncing effect
2. **API key validation**: Check config.js for valid key
3. **Monster introduction**: Animated character explains the game
4. **First problem**: Generate initial math problem via API

### Main Game Loop
**Single API call handles multiple tasks:**
- Evaluate previous answer (if any)
- Provide encouraging feedback
- Generate next math problem
- Adjust difficulty based on performance

### User Interface Components

#### Monster Display Area
- **Large monster character**: 👾 emoji enhanced with CSS
- **Speech bubble**: CSS-created bubble for AI responses
- **Animation zone**: Space for celebration effects

#### Problem Display
- **Large, clear text**: Minimum 28px font size
- **Colorful backgrounds**: CSS gradients that change per problem
- **Animation entrance**: Slide-in effects for new problems

#### Answer Input
- **Large input field**: Minimum 50px height, rounded corners
- **Number validation**: Only accept numeric input
- **Visual feedback**: Border color changes on focus/error

#### Feedback System
- **Speech bubble design**: CSS triangular pointer to monster
- **Typewriter effect**: Animate text appearance
- **Color coding**: Green (correct), yellow (close), blue (encouragement)

#### Score Display
- **Large counter**: Animated number changes
- **Visual rewards**: Star emojis (⭐) that accumulate
- **Progress indication**: Simple bar or circle progress

## API Integration Specifications

### Configuration Structure (config.js)
```javascript
const CONFIG = {
  API_KEY: 'PASTE_YOUR_IO_NET_API_KEY_HERE',
  API_ENDPOINT: 'https://api.intelligence.io.solutions/api/v1/chat/completions',
  MODEL: 'meta-llama/Llama-3.3-70B-Instruct',
  DEMO_MODE: true,
  DEBUG: false
};
```

### API Call Structure
**Endpoint**: Use exact same structure as demonstrated in CMD tutorial
**Authentication**: Bearer token with API key from config
**Model**: meta-llama/Llama-3.3-70B-Instruct (must match tutorial)
**Temperature**: 0.7 (consistent with tutorial)

### Prompt Engineering Strategy
**System prompt**: AI acts as friendly monster tutor for kids aged 6-12
**User prompt structure**:
- Previous problem and user's answer
- Request for feedback + new problem generation
- Context about current session (score, difficulty level)

**AI Response Format** (request this structure):
```json
{
  "feedback": "encouraging response about previous answer",
  "next_problem": "new math problem as simple text",
  "celebration": "extra encouragement for correct answers",
  "difficulty": "current difficulty level"
}
```

## Detailed Implementation Requirements

### HTML Structure
- **Semantic HTML5**: Use proper tags (main, section, article, etc.)
- **Accessibility**: Include ARIA labels for screen readers
- **Mobile-friendly**: Responsive meta viewport tag
- **Large touch targets**: Minimum 44px for buttons

### CSS Specifications
- **CSS Grid/Flexbox**: Modern layout techniques
- **Custom properties**: Use CSS variables for colors and sizes
- **Smooth animations**: 60fps performance with transform/opacity
- **Color scheme**: Bright, child-friendly palette
- **Typography**: Large, readable fonts (minimum 16px base)

### JavaScript Architecture
- **Modular code**: Separate concerns (API, UI, game logic)
- **Error handling**: Graceful degradation for API failures
- **State management**: Simple object to track game state
- **Event handling**: Proper event listeners with cleanup

### Error Handling Requirements
- **No API key**: Show setup instructions
- **API failures**: Display offline mode message
- **Network errors**: Retry mechanism with user feedback
- **Invalid responses**: Fallback to pre-written problems

## Specific CSS Animation Instructions

### Monster Base Animation
```css
/* Example structure - implement similar */
.monster-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.monster-emoji {
  font-size: 120px;
  animation: bounce 2s infinite ease-in-out;
}

.monster-mouth-overlay {
  position: absolute;
  /* Position over emoji mouth area */
  /* Animate width/height for talking effect */
}
```

### Celebration Effects
- **Confetti effect**: Animate multiple ⭐ ✨ emojis falling from top
- **Pulse effect**: Scale monster up/down on correct answers
- **Color flash**: Briefly change background colors
- **Bounce intensity**: Increase bounce height for celebrations

## Performance Requirements
- **Fast loading**: Under 2 seconds on standard connection
- **Smooth animations**: No janky or stuttering effects
- **Efficient API calls**: Minimize token usage with smart prompts
- **Memory management**: Clean up event listeners and intervals

## Testing & Validation
- **API integration**: Must work with real IO.net API key
- **Cross-browser**: Test in Chrome, Firefox, Safari, Edge
- **Mobile responsive**: Works on tablets and large phones
- **Accessibility**: Keyboard navigation and screen reader support

## Workshop Demonstration Requirements
- **Live coding friendly**: Clean, commented code for explanation
- **Immediate setup**: Copy-paste API key and run immediately
- **Visual impact**: Impressive animations and interactions
- **Educational value**: Clear connection between API and functionality

## Content Guidelines
- **Age-appropriate**: Simple math problems for elementary ages
- **Encouraging tone**: Always positive, never discouraging
- **Progressive difficulty**: Start easy, gradually increase complexity
- **Variety**: Mix addition, subtraction, simple multiplication

## Success Criteria
1. **Functional**: Complete math problem generation and checking
2. **Visual**: Engaging monster character with smooth animations
3. **Educational**: Demonstrates real AI problem-solving
4. **Workshop-ready**: Easy to set up and explain during live demo
5. **No dependencies**: Works offline except for API calls

## Implementation Notes
- **Start simple**: Get basic functionality working first
- **Add polish**: Implement animations after core features
- **Comment heavily**: Code should be self-documenting for workshop
- **Test thoroughly**: Ensure reliability for live demonstration

This specification should result in a complete, workshop-ready application that seamlessly demonstrates the transition from raw API access to a real-world AI agent solution.