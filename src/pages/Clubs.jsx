import { useState, useEffect } from "react"
import { apiBaseUrl } from "../utils/baseUrl"
import { Link } from "react-router-dom"

const Clubs = () => {
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    fetch(apiBaseUrl + '/clubs')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setClubs(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="w-1/2 mx-auto flex flex-col items-center">
      <h1 className="font-bold text-4xl">Clubs at IIIT Delhi</h1>
      {clubs.map(club => (
        <div className="border-2 p-4">
          <Link to={`/clubs/${club.handle}`}>{club.name}</Link>
          <p>{club.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Clubs
