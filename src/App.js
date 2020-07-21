import React, { useState } from "react"
import { useSelector } from "react-redux"
import "./App.css"
import { selectStatistics } from "./store/developers/selectors"

const selectResources = (state) => {
  return state.resources
}

function App() {
  const statistics = useSelector(selectStatistics)
  const resources = useSelector(selectResources)

  const [selectedResource, set_selectedResource] = useState(2)

  function onChangeSelect(event) {
    console.log("what is event:", event.target.value)
    set_selectedResource(Number(event.target.value)) // event.target.value is always string
  }

  const developersWithThisFavorite = useSelector((state) => {
    return state.developers.filter((dev) =>
      dev.favorites.includes(selectedResource)
    )
  })
  console.log("is this favourite", developersWithThisFavorite)
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
        <select onChange={onChangeSelect} value={selectedResource}>
          {resources.map((resource) => {
            return (
              <option key={resource.id} value={resource.id}>
                {resource.name}
              </option>
            )
          })}
        </select>
      </h2>
      <ul>
        {developersWithThisFavorite.map((developer) => {
          return <li key={developer.id}>{developer.name}</li>
        })}
      </ul>
    </div>
  )
}
export default App
