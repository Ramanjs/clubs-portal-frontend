import { useState, useEffect } from "react"
import { apiBaseUrl } from "../utils/baseUrl"

const Clubs = () => {
  const [clubs, setClubs] = useState([])

  useEffect(() => {
    fetch(apiBaseUrl + '/clubs')
      .then(res => res.json())
      .then(res => {
        setClubs(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>

    </div>
  )
}

export default Clubs
