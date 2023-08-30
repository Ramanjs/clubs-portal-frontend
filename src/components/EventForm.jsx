import {useState} from "react"
import {useSelector} from "react-redux"
import { apiBaseUrl } from "../utils/baseUrl"

const EventForm = ({ clubHandle, setForm, setSuccess }) => {
  const token = useSelector(state => state.user.token)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [venue, setVenue] = useState('')
  const [expParticipation, setExpParticipation] = useState('')
  const [req, setReq] = useState('')

  const handleSubmit = () => {
    fetch(apiBaseUrl + '/events/requests', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description: desc,
        start,
        end,
        venue,
        clubHandle
      })
    })
      .then(res => res.json())
      .then(res => {
        setSuccess(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
    <div className="m-8 w-full flex flex-col">
      
      <p className="mt-4">Event Name</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={name} onChange={(e) => setName(e.target.value)}/>
      <p className="mt-4">Event Description</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={desc} onChange={(e) => setDesc(e.target.value)}/>
      <p className="mt-4">Start Date</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={start} onChange={(e) => setStart(e.target.value)}placeholder="dd-mm-yy"/>
      <p className="mt-4">End Date</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={end} onChange={(e) => setEnd(e.target.value)}placeholder="dd-mm-yy"/>
      <p className="mt-4">Venue</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={venue} onChange={(e) => setVenue(e.target.value)}placeholder="C101... (or online)"/>
      <p className="mt-4">Expected Participation</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={expParticipation} onChange={(e) => setExpParticipation(e.target.value)}placeholder="150"/>
      <p className="mt-4">Requirements</p>
      <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={req} onChange={(e) => setReq(e.target.value)}placeholder="FMS Cleaning..."/>
    </div>

    <div>
      <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mx-2 mb-10 rounded focus:outline-none focus:shadow-outline" onClick={() => setForm(false)}>Cancel</button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 mb-10 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Submit</button>
    </div>
    </>
  )
}

export default EventForm
