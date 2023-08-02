import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { apiBaseUrl } from "../utils/baseUrl"

const Club = () => {
  const [aboutInfo, setAboutInfo] = useState(null)

  const { handle } = useParams() 

  useEffect(() => {
    fetch(apiBaseUrl + '/clubs/' + handle)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setAboutInfo(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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
          </div>
          <div>
            <p className="font-medium text-lg underline">Upcoming Events</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Club
