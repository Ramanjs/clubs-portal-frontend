import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiBaseUrl } from "../utils/baseUrl"
import { useSelector } from "react-redux"
import EventForm from "../components/EventForm"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Club = () => {
  const [aboutInfo, setAboutInfo] = useState(null)
  const [form, setForm] = useState(false)
  const [success, setSuccess] = useState(false)

  const { handle } = useParams() 
  const token = useSelector(state => state.user.token)
  const navigate = useNavigate()
  
  useEffect(() => {
    fetch(apiBaseUrl + '/clubs/' + handle, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setAboutInfo(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (success) {
      return navigate(`/users/${handle}`, { replace: true })
    }
  }, [success])

  return (
    <>
    <h1 className="text-center mx-auto font-bold text-2xl pt-14">Club Profile {aboutInfo ? ": " + aboutInfo.name : ""}</h1>
    <div class="mx-auto max-w-xs relative flex py-5 items-center">
        <div class="flex-grow border-t border-gray-300"></div>
    </div>
    <div className="w-1/2 mx-auto flex flex-col items-center">
      {aboutInfo && (
        <div className="m-4">
          <div>
            <p className="font-medium text-lg underline">Club Description</p>
            <p>{aboutInfo.description}</p>
          </div>
          <div>
            <p className="font-medium text-lg underline">Club Coordinator</p>
            <p>{aboutInfo.coordinator.name}</p>
            <p>{aboutInfo.coordinator.email}</p>
          </div>
          <div>
            <p className="font-medium text-lg underline">Upcoming Events</p>
            {aboutInfo.events && aboutInfo.events.length === 0 ? "No upcoming events." : aboutInfo.events.map(event => (
              <Link to={`/events/${event.handle}`} className="m-4 border-2 p-4 flex flex-col justify-between">
                <p>Name: {event.name}</p>
                <p>Start: {event.start}</p>
                <p>End: {event.end}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
      {aboutInfo && aboutInfo.isCoordinator && !form && (
        <div className="p-2 font-bold text-white bg-blue-600 rounded-md cursor-pointer" onClick={() => setForm(!form)}>Propose a new event</div>
      )}
      {form && <EventForm setForm={setForm} clubHandle={handle} setSuccess={setSuccess}/>}
    </div>
    </>
  )
}

export default Club
