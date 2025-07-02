# 🎮 Monster Math Helper - AI Homework Assistant

A kid-friendly AI-powered math homework helper featuring a cute monster character created entirely with emoji and CSS. This application demonstrates how to turn raw API access into a user-friendly AI agent that solves real problems.

## 🚀 Features

- **Cute Monster Character**: Animated 👾 emoji with CSS enhancements
- **AI-Powered Math Problems**: Intelligent problem generation and feedback
- **Kid-Friendly Interface**: Bright colors, large text, and encouraging feedback
- **Smooth Animations**: 60fps animations with CSS transforms
- **Mobile Responsive**: Works on all devices
- **No Dependencies**: Pure HTML5, CSS3, and JavaScript
- **Offline Capable**: Works without internet (except for API calls)

## 🎯 How It Works

1. **Loading Screen**: Animated monster welcomes users
2. **Problem Generation**: AI creates age-appropriate math problems
3. **Answer Validation**: Real-time feedback on student answers
4. **Progressive Difficulty**: Adjusts based on performance
5. **Celebration Effects**: Fun animations for correct answers
6. **Score Tracking**: Visual progress with stars and progress bar

## 🛠️ Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- IO.net API key

### Quick Start

1. **Clone or Download** this repository
2. **Open `config.js`** and replace the API key:
   ```javascript
   const CONFIG = {
     API_KEY: 'YOUR_IO_NET_API_KEY_HERE',
     // ... other settings
   };
   ```
3. **Open `index.html`** in your browser
4. **Start learning!** 🎉

### API Key Setup

1. Visit [IO.net](https://io.net) to get your API key
2. Copy your API key
3. Paste it in the `config.js` file
4. Save and refresh the page

## 📁 File Structure

```
IO-NET-HW-HELPER/
├── index.html          # Main application page
├── style.css           # All styling and animations
├── script.js           # Application logic and API integration
├── config.js           # API configuration
├── GUIDE.md            # Detailed project specification
└── README.md           # This file
```

## 🎨 Technical Details

### Character Design
- **Base Emoji**: 👾 (alien monster)
- **CSS Enhancements**: Mouth overlay, particle effects, state animations
- **Animation States**: Idle, talking, thinking, happy

### API Integration
- **Endpoint**: `https://api.intelligence.io.solutions/api/v1/chat/completions`
- **Model**: `meta-llama/Llama-3.3-70B-Instruct`
- **Authentication**: Bearer token
- **Response Format**: JSON with feedback, problems, and difficulty

### CSS Features
- **CSS Variables**: Consistent theming system
- **Flexbox/Grid**: Modern layout techniques
- **Transform Animations**: Smooth 60fps performance
- **Responsive Design**: Mobile-first approach

## 🎮 Game Flow

1. **Initialization**: API validation and first problem generation
2. **Problem Display**: Large, clear math problem with animations
3. **Answer Input**: Number validation with visual feedback
4. **AI Processing**: API call for evaluation and next problem
5. **Feedback Display**: Encouraging speech bubble with typewriter effect
6. **Celebration**: Particle effects and animations for correct answers
7. **Score Update**: Visual progress tracking
8. **Repeat**: Continuous learning loop

## 🔧 Configuration Options

### Demo Mode
Set `DEMO_MODE: true` in `config.js` to use fallback problems when API is unavailable.

### Debug Mode
Set `DEBUG: true` to see detailed console logs.

### Customization
Modify CSS variables in `style.css` to change colors, sizes, and animations.

## 🐛 Troubleshooting

### Common Issues

**"Invalid API configuration"**
- Check that your API key is correctly set in `config.js`
- Ensure the API key is valid and has proper permissions

**"API request failed"**
- Check your internet connection
- Verify the API endpoint is accessible
- Ensure your API key has sufficient credits

**"Failed to start the game"**
- Check browser console for detailed error messages
- Try refreshing the page
- Ensure all files are in the same directory

### Browser Compatibility
- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## 🎯 Educational Value

This application demonstrates:
- **API Integration**: Real-world AI service usage
- **State Management**: Clean JavaScript architecture
- **UI/UX Design**: Kid-friendly interface principles
- **Error Handling**: Graceful degradation
- **Performance**: Optimized animations and API calls

## 🚀 Future Enhancements

- [ ] Sound effects and audio feedback
- [ ] Multiple difficulty levels
- [ ] Problem history and review
- [ ] Parent dashboard
- [ ] Multiplayer mode
- [ ] Custom problem sets

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Open an issue on GitHub with detailed information

---

**Happy Learning! 🎉**

*Built with ❤️ for educational purposes* 