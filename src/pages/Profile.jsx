import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {Link, useParams} from "react-router-dom"
import { apiBaseUrl } from "../utils/baseUrl"

const Profile = () => {
  const params = useParams()
  const token = useSelector(state => state.user.token)
  const [aboutInfo, setAboutInfo] = useState(null)
  const [badgeInfo, setBadgeInfo] = useState()

  const { handle } = params

  useEffect(() => {
    fetch(apiBaseUrl + '/users/' + handle)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setAboutInfo(res)
        let badge = []
        if (res.isClubsCoordinator)
          badge.push('Student Council Clubs Coordinator')
        if (res.isCoordinator)
          badge.push('Club Coordinator')
        setBadgeInfo(badge.join(", "))
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
    <>
    <h1 className="text-center mx-auto font-bold text-2xl mt-20 pt-14">My Profile</h1>
    <div className="mx-auto max-w-xs relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
    </div>
    <div className="w-1/2 mx-auto mt-2 flex flex-col items-center">
      {aboutInfo && (
        <div className="mt-2 text-center">
          <h2 className="font-bold text-3xl">{aboutInfo.name}</h2>
          <p className="text-slate-500">{badgeInfo}</p>
        </div>
      )}
      {aboutInfo && aboutInfo.registrations && (
        <div className="w-full mt-16">
          <h3 className="underline text-lg">Events Registered</h3>
          {aboutInfo.registrations.length === 0 ? "You have not registered for any events." : aboutInfo.registrations.map(reg => (
            <Link to={`/events/${reg.handle}`} className="p-4 border-2 flex flex-col">
              <p>Name: {reg.name}</p>
              <p>Venue: {reg.venue}</p>
            </Link>
          ))}
        </div>
      )}
     {aboutInfo && aboutInfo.requests && (
        <div className="w-full mt-16">
          <h3 className="underline text-lg">Proposed Events</h3>
          {aboutInfo.requests.length === 0 ? "You have not proposed any events." : aboutInfo.requests.map(request => (
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
    </>
  )
}

export default Profile
