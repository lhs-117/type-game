import React, { Component } from 'react';
import './random_sentence.css';

class RandomSentence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Empty array that will contain all the words from words_alpha.txt
            words: [],
            // Empty string that will contain a number of the random generated words
            randomSentence: '',
            isLoading: true,
            error: null
        };
    }

    // Fetching the .txt file and loading the words to make an array
    componentDidMount() {
        this.loadWords();
    }
  
    loadWords = () => {
        fetch('./words_alpha.txt')
            .then(response => response.text())
            .then(data => {
                const words = data.split('\n').filter(word => word.trim() !== '');
                this.setState({ words, isLoading: false }, () => {
                    this.generateRandomSentence();
                });
            })
            .catch(error => {
                console.error('Error fetching word list:', error);
                this.setState({ error: 'Failed to load words', isLoading: false });
            });
    }

    // Randomly selecting a word from the array words
    getRandomWord = () => {
        const { words } = this.state;
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
    
    // Create a sentence of random word based on numberOfWords
    generateRandomSentence = () => {
        const { numberOfWords } = this.props;
        const { words } = this.state;
        
        if (words.length === 0) {
            console.warn('Word list is empty. Unable to generate sentence.');
            return;
        }

        const sentenceArray = [];
        for (let i = 0; i < numberOfWords; i++) {
            const word = this.getRandomWord().trim();
            sentenceArray.push(word);
        }

        const randomSentence = sentenceArray.join(' ');
        console.log('Generated Random Sentence:', randomSentence);
        this.setState({ randomSentence });
    }

    // Find the position in which the current letter is, for use in GameStarter
    getCurrentLetter = (position) => {
        const { randomSentence } = this.state;
        return randomSentence.charAt(position);
    }

    // Conditional to change the colour of the letter
    getCharClass = (index) => {
        const { currentIndex, isCorrect } = this.props;
        if (index < currentIndex) return 'correct';
        if (index === currentIndex && !isCorrect) return 'incorrect';
        if (index === currentIndex) return 'current';
        return '';
    }

    render() {
        const { randomSentence } = this.state;
        return (
            <div>
                <p className='random_sentence'>
                    {randomSentence.split('').map((char, index) => (
                        <span key={index} className={ this.getCharClass(index) }>
                            {char}
                        </span>
                    ))}
                </p>
            </div>
        );
    }
}

export default RandomSentence;
