import { useState, useEffect } from "react"
import {Link} from "react-router-dom"
import { apiBaseUrl } from "../utils/baseUrl"

const Home = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch(apiBaseUrl + "/events")
      .then(res => res.json())
      .then(res => {
        setEvents(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="mt-24">
      <div className="w-1/2 mx-auto flex flex-col">
        <h1>Upcoming Events</h1>
        {events.map(event => (
          <Link to={`/events/${event.handle}`} className="m-4 p-4 border-2">
            <p>Name: {event.name}</p>
            <p>Start: {event.start}</p>
            <p>End: {event.end}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
