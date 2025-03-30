import React, { useState } from 'react'
import ProgressBar from './ProgressBar';
import questions from '../questions';

const QuizPage = () => {

    const [currIndex, setCurrIndex]=useState(0);
    const [answers, setAnswers]=useState({});

    const handleAnswer=(selectedOption)=>{
        const updatedAnswers = {...answers, [currIndex]:selectedOption};
        setAnswers(updatedAnswers);
        console.log(updatedAnswers);
        if(currIndex===questions.length-1){

        }else{
            setCurrIndex(currIndex+1);
        }

    }

  return (
    <div> 
        {/* main div */}
        <div>
        <ProgressBar progress={(currIndex / (questions.length - 1)) * 100} />

        </div>
        
        <div>
            {/* container */}

            <div>
                {/* question card */}
                <h2>{ questions[currIndex].question }</h2>

                <div>
                    {/* options */}
                    {questions[currIndex].options.map((option, index)=>(
                        <button key={index} onClick={()=>handleAnswer(option)}>{option}</button>
                    ))}
                </div>

            </div>

            <div>
                {/* navigation */}
                <button onClick={()=>setCurrIndex(currIndex-1)} disabled={currIndex===0}>Previous</button>
                { currIndex<questions.length-1 && (<button onClick={()=>setCurrIndex(currIndex+1)}>Next</button>) }
            </div>
        </div>
        
    </div>
  )
}

export default QuizPage