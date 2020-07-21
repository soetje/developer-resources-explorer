import React, { useState } from "react"
import { useSelector } from "react-redux"
import "./App.css"
import {
  selectStatistics,
  selectResources,
  developersWithThisFavorite,
  selectDevelopers,
} from "./store/developers/selectors"

function App() {
  const [selectedResource, set_selectedResource] = useState(2)
  const [selectDeveloper, set_selectDeveloper] = useState(2)
  const statistics = useSelector(selectStatistics)

  const resources = useSelector(selectResources)
  console.log("what is resources", resources)

  const developerFavorite = useSelector(
    developersWithThisFavorite(selectedResource)
  )
  console.log("what is developerFavorite", developerFavorite)

  const developers = useSelector(selectDevelopers)
  console.log("what is developer", developers)

  function onChangeSelect(event) {
    set_selectedResource(Number(event.target.value)) // event.target.value is always string
  }

  function onChangeDeveloper(event) {
    set_selectDeveloper(Number(event.target.value))
  }
  const selectDevelopersFavoritesResources = (selectDeveloper) => (state) => {
    const developer = state.developers.find((dev) => dev.id === selectDeveloper)
    if (!developer) {
      return []
    }
    return state.resources.filter((resource) => {
      return developer.favorites.includes(resource.id)
    })
  }
  const favoriteResources = useSelector(
    selectDevelopersFavoritesResources(selectDeveloper)
  )

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
        {developerFavorite.map((developer) => {
          return <li key={developer.id}>{developer.name}</li>
        })}
      </ul>
      <div>
        <h2>
          What are
          <select value={developers.id} onChange={onChangeDeveloper}>
            {developers.map((dev) => {
              return (
                <option key={dev.id} value={dev.id}>
                  {dev.name}
                </option>
              )
            })}
          </select>
          's favorites?
        </h2>
        <ul>
          {favoriteResources.map((resource) => {
            return <li key={resource.id}> value={resource.id}</li>
          })}
        </ul>
      </div>
    </div>
  )
}
export default App
