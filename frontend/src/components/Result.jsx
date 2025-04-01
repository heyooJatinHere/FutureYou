import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "../styles/result.css";

const Result = () => {
    // const location = useLocation();
    // const [analysis, setAnalysis] = useState("");

    // useEffect(()=>{
    //     const fetchAnalysis = async()=>{
    //         try{
    //             const response = await fetch("http://localhost:5000/get-analysis", {
    //                 method: "POST",
    //                 headers: {"Content-Type": "application/json"},
    //                 body: JSON.stringify({answers: location.state?.answers || {}})
    //             });
    //             const data= await response.json();
    //             setAnalysis(data.analysis || "No analysis available");
    //         }catch(err){
    //             console.error("Error fetching:", err);
                
    //         }
    //     };

    //     fetchAnalysis();
    
    // },[location.state]);

    const location = useLocation();
    const analysis = location.state?.analysis || "No analysis available";

    // Splitting the analysis based on "**" which is used for bold sections in AI response
    const sections = analysis.split("**").filter((section) => section.trim());
    console.log(sections);
    

  return (
    <div className="result-container">
      <h1 className="result-title">Your Future Analysis</h1>
      {sections.map((section, index) => {
        const [title, ...contentParts] = section.split(":");
        const content = contentParts.join(":").trim();

        return (
          <div key={index} className="result-card">
            <h2 className="result-heading">{title.trim()}</h2>
            <p className="result-content">{content}</p>
          </div>
        );
      })}
    </div>
  )
}

export default Result