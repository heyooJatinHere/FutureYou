import React, { useState } from 'react'
import questions from "../questions";
import ProgressBar from './ProgressBar';

const Quiz = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});

    const handleAnswer = (selectedOption)=>{
        const updatedAnswers = {...answers, [currentQuestionIndex]: selectedOption};
        setAnswers(updatedAnswers) //making copy of answers and store selected option as answer
        console.log("User Answers:",updatedAnswers);

        if(currentQuestionIndex===questions.length-1){
            sendAnswersToBackend(updatedAnswers);
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
        }
    }

    const sendAnswersToBackend = async(answers) =>{
        try{
            const response = await fetch("http://localhost:5000/submit-answers", {
                method: "POST",
                headers: {"Content-Type":"application/json"}, //Specifies that the data format is JSON
                body: JSON.stringify(answers), //Converts the JavaScript object (answers) into a JSON string before sending
            });
            const data= await response.json(); //parses the JSON response from the server.
            console.log("Server Response:", data.analysis);
            console.log(`AI Analysis: ${data.analysis}`);
        } catch (error){
            console.error("Error sending answers:", error);
        }
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;


    return (
        <div>
            <h1>Quiz App</h1>
            <ProgressBar progress={progress}/>
            <h2>{questions[currentQuestionIndex].question}</h2>
            <div>
                {questions[currentQuestionIndex].options.map((option, index)=>(
                    <button key={index} onClick={()=>handleAnswer(option)}>{option}</button>
                ))}
                <button onClick={()=>setCurrentQuestionIndex(currentQuestionIndex-1)} disabled={currentQuestionIndex===0}>Prev</button>

                {currentQuestionIndex < questions.length - 1 && (<button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>Next</button>)}
            </div>
        </div>
    )
}

export default Quiz;