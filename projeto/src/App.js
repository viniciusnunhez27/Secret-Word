
import './App.css';
import StartScreen from './components/StartScreen';
import { userCallback, useEffect, useState} from "react"
import { wordsList } from "./data/words" 
import Game from './components/Game';
import GameOver from './components/GameOver';


const stages = [
  {id:1, name: "start" },
  {id:2, name: "game" },
  {id:3, name: "end" },
];


function App() {
  const [gameStage, SetGameStage] = useState (stages[0].name);
  const [words] = useState (wordsList); 
  const [pickedWord, setPickedWord] = useState ("")
  const [pickedCategory,setPickedCategory] = useState ("")
  const [letters,setLetters] = useState ("[]")

  const [guessedLetters,SetGuessedLetters] = useState([])
  const [wrongLetters,setWrongLetters] = useState ([])
  const [guesses,setGuesses] = useState (3)
  const [score, setScore] = useState ()
  

  const pickWordAndCategory = () => {
     const categories = Object.keys(words)
     const category = categories [Math.floor(Math.random () * Object.keys(categories).length)];
     
    

    const word = words[category][Math.floor(Math.random () * words[category].length)]; 
   
   
    return {word, category};
  }

  const startGame = () => { 
    // pick word and pick category 

     const { word,category } = pickWordAndCategory();  

 // create an array of letters
    
    let wordLetters = word.split(""); 

    
    wordLetters = wordLetters.map((l) => l.toLowerCase());

    console.log (word,category)
    console.log(wordLetters)

    //fill states 
    
      setPickedWord(word);
      setPickedCategory(category);
      setLetters(wordLetters);
  

    SetGameStage (stages[1].name)
  }

  const verifyLetter = (letter) => {
       const normalizedLetter = letter.toLowerCase()
  
   // check if letter has already been utilized

   if ( guessedLetters.includes(normalizedLetter) || 
        wrongLetters.includes(normalizedLetter)
    ) {
      return;
  }
    
  // push guessed letter or remove a guess
   
   if (letters.includes(normalizedLetter)){
    SetGuessedLetters((actualGuessedLetters) => [
    ...actualGuessedLetters,
       normalizedLetter
   ])}
   else { 
       setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
          normalizedLetter,
       ]);

       setGuesses((actualGuessedLetters) => actualGuessedLetters -1 )

   }
  };

    useEffect (() => { 
       if(guesses <= 0){

        SetGameStage(stages[2].name)
       }

    }, [guesses]);
 


  const  retry = () => { 
     SetGameStage(stages[0].name)
  }



  return (
    <div className='App'>
       {gameStage === 'start' && <StartScreen startGame = {startGame} />}
       {gameStage === 'game' && <Game verifyLetter={verifyLetter} pickedWord={pickedWord}
        pickedCategory={pickedCategory} 
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters} 
        guesses ={guesses}
        score ={score}
        />}

       {gameStage === 'end' && <GameOver retry = {retry}  />}
    </div>
  );
}

export default App;
