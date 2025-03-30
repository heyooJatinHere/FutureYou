import React, { useState } from 'react'
import questions from '../questions'

const Temp = () => {
    const [currIndex, setCurrIndex] = useState(0);
    const [answer, setAnswer] = useState({});

    const handleAnswer=(selectedOption)=>{
        const updatedAnswers={...answer, [currIndex]:selectedOption};
        setAnswer(updatedAnswers);
        console.log(updatedAnswers);
        
        sendToBackend(updatedAnswers);    
        setCurrIndex(currIndex+1);
    }

    const sendToBackend= async (answers)=>{
        try{
            const response = fetch("http://localhost:5000/submit-answers",{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(answer),
            })
            const data = await response.json();
            console.log(`AI Analysis: ${data.analysis}`);
            
        }catch{

        }
    }

  return (
    <div>
        <h1>Quiz</h1>
        <h3>{ questions[currIndex].question }</h3>
        <div>
            { questions[currIndex].options.map((option, index)=>(
                <button key={index} onClick={()=>handleAnswer(option)}>{ option }</button>
            ))}
            <button onClick={()=>setCurrIndex(currIndex-1)}  disabled={currIndex===0}>Prev</button>

            { currIndex<questions.length-1 && (<button onClick={()=>setCurrIndex(currIndex+1)}>Next</button>) }
        </div>
        
    </div>
  )
}

export default Temp