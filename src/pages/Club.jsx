import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiBaseUrl } from "../utils/baseUrl"
import { useSelector } from "react-redux"
import EventForm from "../components/EventForm"
import { useNavigate } from "react-router-dom"

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
    <div className="w-1/2 mx-auto flex flex-col items-center">
      <h1 className="font-bold text-4xl underline">Club Profile</h1>
      {aboutInfo && (
        <div className="m-4">
          <h2 className="font-semibold text-xl">{aboutInfo.name}</h2>
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
            {aboutInfo.events && aboutInfo.events.map(event => (
              <div className="m-4 border-2 p-4 flex flex-col justify-between">
                <p>Name: {event.name}</p>
                <p>Start: {event.start}</p>
                <p>End: {event.end}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {aboutInfo && aboutInfo.isCoordinator && !form && (
        <div className="p-2 font-bold text-white bg-blue-600 rounded-md cursor-pointer" onClick={() => setForm(!form)}>Propose a new event</div>
      )}
      {form && <EventForm setForm={setForm} clubHandle={handle} setSuccess={setSuccess}/>}
    </div>
  )
}

export default Club
