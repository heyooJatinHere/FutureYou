import React from 'react'

const ProgressBar = ({progress}) => {
  return (
    <div style={{ 
        width: "100%", 
        height: "5px", 
        margin: "auto",
        backgroundColor: "#ddd", 
        borderRadius: "5px", 
        overflow: "hidden" 
        }}>

        <div style={{
            width:`${progress}%`,
            height:"100%",
            backgroundColor: "gray",
            transition: "width 0.3s ease-in-out"
        }}></div>
    </div>
  )
}

export default ProgressBar