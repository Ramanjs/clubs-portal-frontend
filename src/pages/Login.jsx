import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiBaseUrl } from '../utils/baseUrl';

const Login = () => {
  const loggedIn = useSelector(state => state.user.loggedIn);

  if (loggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-slate-100">
      <div className="flex flex-col items-center w-1/2 bg-white p-5 border-2 border-gray-200 space-y-4 shadow-lg">
        <h1 className="font-semibold text-4xl underline">ClubConnect</h1>
        <a href={`${apiBaseUrl}/auth/google`} className="border-2 p-2">Sign in with Google</a>
      </div>
    </div>
  )
}

export default Login
