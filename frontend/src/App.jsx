import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from './components/Quiz'
import Result from './components/Result'
// import Temp from './components/Temp'
// import QuizPage from './components/QuizPage'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  )
}

export default App