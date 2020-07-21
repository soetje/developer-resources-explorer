import React, { useState } from "react"
import { useSelector } from "react-redux"
import "./App.css"
import { selectStatistics } from "./store/developers/selectors"



function App() {
  const statistics = useSelector(selectStatistics)

  return (
    <div>
      <h1>Web development resources</h1>
      <div className="statistics">
        <div className="statistic">
          <div className="statistic__num">{statistics.numDevelopers}</div>
          <p>developers</p>
        </div>
        <div className="statistic">
          <div className="statistic__num">{statistics.numResources}</div>
          <p>resources</p>
        </div>
      </div>
      <h2>
        Who Likes
        <select>
          
        </select>
        </h2> 
    </div>
  )
}
export default App
