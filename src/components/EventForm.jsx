import {useState} from "react"
import {useSelector} from "react-redux"
import { apiBaseUrl } from "../utils/baseUrl"

const EventForm = ({ clubHandle, setForm }) => {
  const token = useSelector(state => state.user.token)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [venue, setVenue] = useState('')

  const handleSubmit = () => {
    fetch(apiBaseUrl + '/events/requests', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        desc,
        start,
        end,
        venue,
        clubHandle
      })
    })
      .then(res => res.json())
      .then(res => {

      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="m-8 w-full flex flex-col">
      <p>Event Name</p>
      <input type="text" className="border-2" value={name} onChange={(e) => setName(e.target.value)}/>
      <p>Event Description</p>
      <input type="text" className="border-2" value={desc} onChange={(e) => setDesc(e.target.value)}/>
      <p>Start Date</p>
      <input type="text" className="border-2" value={start} onChange={(e) => setStart(e.target.value)}placeholder="dd-mm-yy"/>
      <p>End Date</p>
      <input type="text" className="border-2" value={end} onChange={(e) => setEnd(e.target.value)}placeholder="dd-mm-yy"/>
      <p>Venue</p>
      <input type="text" className="border-2" value={venue} onChange={(e) => setVenue(e.target.value)}placeholder="C101..."/>
      <button className="font-bold text-white bg-red-600 px-2" onClick={() => setForm(false)}>Cancel</button>
      <button className="font-bold text-white bg-green-600 px-2" onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default EventForm
