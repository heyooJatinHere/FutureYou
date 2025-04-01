import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import questions from "../questions";
import ProgressBar from './ProgressBar';
import "../styles/quiz.css"

const Quiz = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const navigate=useNavigate();

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
            const response = await fetch("https://future-you-wdyq.vercel.app/submit-answers", {
                method: "POST",
                headers: {"Content-Type":"application/json"}, //Specifies that the data format is JSON
                body: JSON.stringify(answers), //Converts the JavaScript object (answers) into a JSON string before sending
            });
            const data= await response.json(); //parses the JSON response from the server.
            console.log("Server Response:", data.analysis);
            // console.log(`AI Analysis: ${data.analysis}`);

            navigate("/result", {state: {analysis:data.analysis}}); 
        } catch (error){
            console.error("Error sending answers:", error);
        }
    }

    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;


    return (
    <div className="quiz-container">
      <div className="quiz-box">
        <h1 className="quiz-title">Quiz App</h1>
        <ProgressBar progress={progress} />

        <h2 className="quiz-question">{questions[currentQuestionIndex].question}</h2>

        <div className="quiz-options">
          {questions[currentQuestionIndex].options.map((option, index) => (
            <button key={index} className="quiz-btn" onClick={() => handleAnswer(option)}>
              {option}
            </button>
          ))}
        </div>

        <div className="quiz-nav">
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className={`quiz-btn ${currentQuestionIndex === 0 ? "disabled" : ""}`}
          >
            Prev
          </button>

          {currentQuestionIndex < questions.length - 1 && (
            <button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} className="quiz-btn">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;