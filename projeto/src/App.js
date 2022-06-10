
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
  

  const pickWordAndCategory = () => {
     const categories = Object.keys(words)
     const category = categories [Math.floor(Math.random () * Object.keys(categories).length)];
     console.log(category)  
    

    const word = words[category][Math.floor(Math.random () * words[category].length)]; 
    console.log(word)
   
    return {word, category};
  }

  const startGame = () => { 
    
     const { word,category } = pickWordAndCategory();  

    SetGameStage (stages[1].name)
  }

  const verifyLetter = () => {
    SetGameStage(stages[2].name)
  }

  const  retry = () => { 
     SetGameStage(stages[0].name)
  }



  return (
    <div className='App'>
       {gameStage === 'start' && <StartScreen startGame = {startGame} />}
       {gameStage === 'game' && <Game verifyLetter={verifyLetter} />}
       {gameStage === 'end' && <GameOver retry = {retry} />}
    </div>
  );
}

export default App;
