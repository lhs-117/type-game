import React, { Component } from 'react';
import RandomSentence from '../random_sentence/random_sentence';
import './game_starter.css';
import startButton from '../images/play-image.webp';
import restartButton from '../images/restart-image.png';
import 'react-circular-progressbar/dist/styles.css';


class GameStarter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfWords: 30,               
            currentIndex: 0,                
            isCorrect: true,
            isTypingAllowed: false,         
            totalKeystrokes : 0,
            keystrokesCorrect: 0,
            correctWords: 0,
            timeLeft: 10,                   
            showResults: false,             // Show results when game is over, now keep it false
            fadeOut: false,                 // Begin with fadeOut invisible
            gameStarted: false,
        };
        this.randomSentenceRef = React.createRef();
        this.containerRef = React.createRef();
        this.timerInterval = null;
    }

    // First load of the game
    startGame = () => {
    this.setState({ 
            isTypingAllowed: true, 
            gameStarted: true,
            showResults: false,
        }, 
        () => {
            this.randomSentenceRef.current.generateRandomSentence();       
            this.startTimer();
        });
    }

    // Restart game, without refreshing the page
    restartGame = () => {
        clearInterval(this.timerInterval);      
        this.setState({
            currentIndex: 0,
            isCorrect: true,
            totalKeystrokes: 0,
            keystrokesCorrect: 0,
            correctWords: 0,
            timeLeft: 10,
            isTypingAllowed: true,
            showResults: false,
            fadeOut: false,
            gameStarted: true,
        },
        () => {
            this.randomSentenceRef.current.generateRandomSentence();            
            this.startTimer();
        });
    }


    // On keypress do the following
    handleKeyPress = (event) => {
        const { currentIndex,
                isCorrect, 
                isTypingAllowed,
                timeLeft } = this.state;

        // Check if typing is allowed and time isn't zero
        if (!isTypingAllowed || timeLeft === 0) {
            return;
        }

        // Determine current letter
        const currentLetter = this.randomSentenceRef.current.getCurrentLetter(currentIndex);

        // Add to totalKeystrokes everytime a key is pressed
        this.setState((prevState) => ({
            totalKeystrokes: prevState.totalKeystrokes + 1,
        }));

        // If keypress equals to letter, turn text green and move on
        if (event.key === currentLetter) {
            this.setState((prevState) => {

                // Follow for the next letter
                const newIndex = prevState.currentIndex + 1;

                // Check for complete sentence
                const sentenceCompleted = newIndex === this.randomSentenceRef.current.state.randomSentence.length;

                // Check if the current word is complete or the sentence is complete
                const correctWords = currentLetter === ' ' || sentenceCompleted;
                
                // Generate a new sentence if needed
                if (sentenceCompleted) {
                    this.randomSentenceRef.current.generateRandomSentence();
                    return {
                        currentIndex: 0,
                        isCorrect: true,                       
                        keystrokesCorrect: prevState.keystrokesCorrect + 1,
                        correctWords: correctWords ? prevState.correctWords + 1 : prevState.correctWords,
                    };
                }

                // If no need to generate new sentence set to correct letter and continue with the next letter
                return {
                    currentIndex: newIndex,
                    isCorrect: true,                   
                    keystrokesCorrect: prevState.keystrokesCorrect + 1,
                    correctWords: correctWords ? prevState.correctWords + 1 : prevState.correctWords,
                };
            });
        } 
        
        else {

            // If incorrect mark as incorrect and don't proceed
            if (isCorrect) {
                this.setState ({ 
                    isCorrect: false,
                });
            }
        }
    }

    // Allows the game to start and posterior restarts
    handleButtonClick = () => {
        if (this.state.gameStarted) {
            this.restartGame();
        } else {
            this.startGame();
        }
        // Remove the focus from the button
        document.activeElement.blur();
    }

    // Allow event listener
    componentDidMount() {
        document.addEventListener('keypress', this.handleKeyPress);
    }

    // Disable event listener
    componentWillUnmount() {
        document.removeEventListener('keypress', this.handleKeyPress);
        clearInterval(this.timerInterval);
    }

    // Timer logic
    startTimer = () => {       
        // Clear any existing timer
        if (this.timerInterval) {clearInterval(this.timerInterval)}
        this.timerInterval = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.timeLeft > 0) {
                    return { timeLeft: prevState.timeLeft - 1 };
                } 
                else {
                    clearInterval(this.timerInterval);
                    // Start fade-out animation
                    this.setState({fadeOut: true});
                    setTimeout(() => {
                        this.setState({
                            isTypingAllowed: false,
                            showResults: true,
                        });
                    // Delay to match fade-out
                    }, 1000);
                // Show result-container
                return {};
                }
            });
        // This logic will be executed every seconds due to 1000ms (1s)
        }, 1000);                   
    } 

    // Accuracy logic
    accuracyScore = () => {
        const { totalKeystrokes, keystrokesCorrect } = this.state;
        return totalKeystrokes > 0 ? (keystrokesCorrect / totalKeystrokes) * 100 : 100;
    }

    render() {
        const { numberOfWords, currentIndex, isCorrect, correctWords, timeLeft, showResults, fadeOut, gameStarted } = this.state;
        const accuracy = this.accuracyScore();
        // Need to define maxTime manually
        const maxTime = 10;
        const timePercentage = (timeLeft/maxTime) * 100;

        return (
        <div>
            <div className='button-container'>
            <button 
                onClick={this.handleButtonClick}
                className="play-button"
            >
                <img 
                    src={gameStarted ? restartButton : startButton} 
                    alt={gameStarted ? "Restart Game" : "Start Game"} 
                />
            </button>
            </div>

            <div className={`circular-progress-wrapper ${fadeOut ? 'fade-out' : ''}`}>
                <div className="circular-progress" style={{ '--percentage': timePercentage }}> </div>
            </div>

            <div ref={this.containerRef} className='content-container'>
                {!showResults ? (
                    <div className={`random-sentence-wrapper ${fadeOut ? 'random-sentence-fade-out' : ''}`}>
                        <RandomSentence 
                            numberOfWords={numberOfWords} 
                            currentIndex={currentIndex} 
                            isCorrect={isCorrect} 
                            ref={this.randomSentenceRef} 
                        />
                    </div>
                ) : (
                    <div className={`result-container ${showResults ? 'show' : ''}`}>
                        <h2>Game Results:</h2>
                        <p>Accuracy: {accuracy.toFixed(2)}%</p>
                        <p>WPM: {correctWords * 60 / maxTime}</p>
                    </div>
                )}
            </div>
        </div>
        );
    }
}

export default GameStarter;
