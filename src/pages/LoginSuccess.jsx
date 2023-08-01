import {useEffect} from "react"
import { useSearchParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { loggedIn as loggedInAction, loadToken } from "../features/user/user"
import { Navigate } from "react-router-dom"

const LoginSuccess = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useDispatch()
  const loggedIn = useSelector(state => state.user.loggedIn)

  useEffect(() => {
    const token = searchParams.get('accessToken')
    console.log(token)
    dispatch(loggedInAction(true))
    dispatch(loadToken(token))
  }, [])

  if (loggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div>
    </div>
  )
}

export default LoginSuccess
