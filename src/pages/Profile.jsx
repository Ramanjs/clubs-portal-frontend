import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import { apiBaseUrl } from "../utils/baseUrl"

const Profile = () => {
  const params = useParams()
  const token = useSelector(state => state.user.token)
  const [aboutInfo, setAboutInfo] = useState(null)

  const { handle } = params

  useEffect(() => {
    fetch(apiBaseUrl + '/users/' + handle)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setAboutInfo(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleApprove = (handle) => {
    fetch(apiBaseUrl + '/events/requests/' + handle, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleReject = (handle) => {
    fetch(apiBaseUrl + '/events/requests/' + handle, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(res => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div className="w-1/2 mx-auto mt-24 flex flex-col items-center">
      <h1 className="font-bold text-4xl">My Profile</h1>
      {aboutInfo && (
        <div className="mt-16">
          <h2 className="font-bold text-3xl">{aboutInfo.name}</h2>
          <p>Student</p>
        </div>
      )}
      <div className="mt-4">
        <h3 className="underline text-lg">Events Registered</h3>
      </div>
      {aboutInfo && aboutInfo.requests && (
        <div className="w-full mt-16">
          <h3 className="underline text-lg">Proposed Events</h3>
          {aboutInfo.requests.map(request => (
            <div className="w-full border-2 p-2 flex justify-between">
              <p>{request.name}</p>
              <p>{request.status}</p>
            </div>
          ))}
        </div>
      )}
      {aboutInfo && aboutInfo.pendingRequests && (
        <div className="w-full mt-16">
          <h3 className="underline text-lg">Pending Proposals</h3>
          {aboutInfo.pendingRequests.map(request => (
            <div className="w-full border-2 p-2 flex justify-between">
              <p>{request.name}</p>
              <div>
                <button className="text-white bg-green-600 font-bold p-2 mx-2 cursor-pointer" onClick={() => handleApprove(request.handle)}>Approve</button>
                <button className="text-white bg-red-600 font-bold p-2 mx-2 cursor-pointer" onClick={() => handleReject(request.handle)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
