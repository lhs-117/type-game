import React, { Component } from 'react';
import './random_sentence.css';

class RandomSentence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Empty array that will contain all the words from words_alpha.txt
            words: [],
            // Empty string that will contain a number of the random generated words
            randomSentence: ''
        };
    }

    // Finding the words_alpha.txt and making an array of it
    componentDidMount() {
        // Fetch the word list from a URL
        fetch('./words_alpha.txt')
            .then(response => response.text())
            .then(data => {
                // Split the file content by new lines to get an array of words
                const words = data.split('\n').filter(word => word.trim() !== '');
                this.setState({ words }, () => {
                    this.generateRandomSentence();
                });
            })
            .catch(error => {
                console.error('Error fetching word list:', error);
            });
    }

    // Randomly selecting a word from the array words
    getRandomWord = () => {
        const { words } = this.state;
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    }
    
    generateRandomSentence = () => {
        const { numberOfWords } = this.props;
        const sentenceArray = [];
        for (let i = 0; i < numberOfWords; i++) {
            const word = this.getRandomWord().trim();
            sentenceArray.push(word);
        }
        const randomSentence = sentenceArray.join(' ');
        console.log('Generated Random Sentence:', randomSentence);
        this.setState({ randomSentence });
    }

    render() {
        const { randomSentence } = this.state;
        return (
            <div>
                <p className='random_sentence'>{randomSentence}</p>
            </div>
        );
    }
}

export default RandomSentence;
