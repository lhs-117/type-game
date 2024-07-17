import './App.css';
import React from 'react';
import RandomSentence from './components/random_sentence/random_sentence';
import InputText from './components/input_text/input_text';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Random Sentence Generator</h1>
        <RandomSentence numberOfWords={10} />
        <InputText/>
        <RandomSentence numberOfWords={10} />
      </header>
    </div>
  );
}

export default App;
