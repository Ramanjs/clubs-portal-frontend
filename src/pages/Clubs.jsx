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
    <>
    <h1 className="text-center mx-auto font-bold text-2xl mt-20 pt-14">Student Clubs at IIIT Delhi</h1>
    <div class="mx-auto max-w-xs relative flex py-5 items-center">
        <div class="flex-grow border-t border-gray-300"></div>
    </div>
    <div className="mt-10 mx-auto flex flex-col items-center">
      {clubs.map(club => (
        <div className="flex flex-col align-center m-4 p-6 rounded-xl shadow-md hover:shadow-lg duration-200 focus:shadow-xs border-2">
          <Link to={`/clubs/${club.handle}`} className="font-bold">{club.name}</Link>
          <p>{club.description}</p>
        </div>
      ))}

    </div>
    </>
  )
}

export default Clubs
