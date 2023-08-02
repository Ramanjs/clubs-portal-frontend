import {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import { apiBaseUrl } from "../utils/baseUrl"

const Profile = () => {
  const params = useParams()
  const [aboutInfo, setAboutInfo] = useState(null)

  const { handle } = params

  useEffect(() => {
    fetch(apiBaseUrl + '/users/' + handle)
      .then(res => res.json())
      .then(res => {
        setAboutInfo(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div className="w-1/2 mx-auto mt-24 flex flex-col items-center">
      <h1 className="font-bold text-4xl">My Profile</h1>
      {aboutInfo && (
        <div className="mt-16">
          <h2 className="font-bold text-3xl">{aboutInfo.name}</h2>
          <p>Student</p>
          <div className="mt-4">
            <h3 className="underline text-lg">Events Registered</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile