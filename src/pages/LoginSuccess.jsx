import {useEffect} from "react"
import { useSearchParams } from "react-router-dom"

const LoginSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    console.log(searchParams.get('accessToken'))
  }, [])

  return (
    <div>
    </div>
  )
}

export default LoginSuccess
