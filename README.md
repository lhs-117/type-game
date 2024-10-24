# TYPE TYPE GAME

### Video Demo: <https://www.youtube.com/watch?v=QlJB1WiJLYE&ab_channel=MorsaVesga>

## Description

This project consists of a fast typing game, where the goal is simply to determine how fast you can type in 1 minute. When the timer hits zero, it'll show you your accuracy and your WPM (words per minute). Similar games can be seen like Monkey Type, which consists of the same goals: to see how fast you can type. To achieve the goal of this project I used **JavaScript**, **CSS** and the **React** Framework. With this in mind I created 2 files to operate the program:

- **random_sentence.js** creates a sentence of random words gathered from **words_alpha.txt**, that can be located in the public folder.

- **game_starter.js** includes all of the features needed to play the game.

### random_sentence:

As the name suggests, **random_sentece.js** generates a random sentence from **words_alpha.txt**, which contain over 400 thousand words from the english dictionary. To achieve that it'll first create an empty array called `words` and an empty string called `randomSentence`.

`loadWords` fetches the **.txt** file from the public folder and then begins to store each word in `words`.

`getRandomWord` picks a random word from the `words` array, now filled with all the 400 thousand words.

`generateRandomSentece` generate a sentence from the words randomly choosen by `getRandomWord`, the number of how many words are gonna form the sentence is decided in the **game_starter.js** file and will be discussed later. For now `generateRandomSentece` take this words in store it inside the string `randomSentence`.

There are also 2 other arrow functions in this file: `getCurrentLetter` is used to determine in what letter the user is typing at the moment, further implemented in **game_starter.js**; `getCharClass`, in the other hand, define if the current letter typed is correct or not, also prevents the user from keep typing if the letter is wrong.

**random_sentence.css** have some definitions related to the font of the words generated. It also highlight the current letter being typed by the user, and if the letter typed is correct or not by changing it's color.

### game_starter:

**game_starter.js** contains all the necessary features to make the program feels like a game. It have a play/restart button to begin the game, a timer and 2 containers: one where the typing game takes place and one for the results screen, that shows how well the user did in a time frame of 1 minute.

First I'll explain the parameters at the begining of the file:

`numberOfWords` defines how many words will be generated from the **random_sentence.js** file, it can be modified to any valeu above zero.

`currentIndex` is defined as zero at the beginning of every game, it's only purpose is to determine in what letter the user stopped.

`isCorrect` defines if the keystroke from the user is the same as the letter in the sentence generated, depending on the answer the color for the letter will change, and in the case of being the wrong letter it'll not permit the user to keep typing. For this reason it's set to true when the game first starts starts.

`totalKeystrokes` and `keystrokesCorrect` are only used to count the total number of keystrokes and the correct ones, to later determine the `accuracyScore`.

`correctWords` tracks how many words are completed and correct, later shown at the result screen in the for of WPM (words per minute).

`timeLeft` is how long will the game be, counted in seconds.

`gameStarted` and `isTypingAllowed` determines if the game has started and if the user can begin the typing, it's only set to true when the play/restart button is clicked, and when the timer hit zero it goes back to false.

`fadeOut` is what set the fading animation to start, showing `showResults` at the end of the animation.

`startGame`/`restartGame` are two situations for the game. When first loaded the game will show a "play" button, after that it'll always show "restart". The "play" button will only be showned again if the user refresh the page.

`handleKeyPress` is the most crucial component in the program. It listens to the keystrokes of the user and determines if is the same as the letter from the generated sentence. It also updates the number of keystrokes, count how many words were typed correctly, setting `isCorrect` to false if the letter is wrong. If the user completes the entire sentence it'll generate a new sentence as well.

`startTimer` sets the timer logic, also setting `showResults` to be showned after the game ends and not allowing the user to keep typing.

For the **render** part begins with `button-container` where the logic to show the correct button is placed. `circular-progress-wrapper` is after, and it fades out with `random-sentence-wrapper`, showing the `result-container`. The logic for which container should be showned is in `content-container`, which has a conditional to met the right criteria.

In **game_starter.css** shows the implementation of the fading animation is done, as well as the positioning of most elements for the game.

## Notes

Some notes that might be of interest, mostly related with **game_starter.js**:

- In `handleButtonClick`, there's also `document.activeElement.blur`, which is used due to a problem that I was facing regarding the button click: every time the space bar was typed, it would restart the game since it was still focused on the button, as a defaut options for most browsers. To solve this, `document.activeElement.blur` was implemented.

- For `handleKeyPress` I first tried to implement an input to register the keystrokes but was not getting the results that I wanted, so I tried a different approach, which in the end turned out to be better.

- I needed help from AI (ChatGPT) in two situations: for how to change the color of the text based on `isCorrect`; to determine if a word was fully completed or not. I also took some suggestions from it, like how to implement a better way to show the timer by not just simply showing the numbers going down.