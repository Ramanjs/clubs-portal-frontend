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
    <div className="mt-20">
    <h1 className="text-center mx-auto font-bold text-2xl pt-14">Upcoming Events</h1>
    <div class="mx-auto max-w-xs relative flex py-5 items-center">
        <div class="flex-grow border-t border-gray-300"></div>
    </div>
      <div className="w-1/2 mx-auto flex flex-col">
        {events.map(event => (
          <div className="m-4 p-6 rounded-xl shadow-md hover:shadow-lg duration-200 focus:shadow-xs border-2">
          <Link to={`/events/${event.handle}`}>
            <p>Name: {event.name}</p>
            <p>Club: {event.club}</p>
            <p>Start: {event.start}</p>
            <p>End: {event.end}</p>
          </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
