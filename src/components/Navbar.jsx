//import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
//import SearchIcon from '@mui/icons-material/Search';
//import AddIcon from '@mui/icons-material/Add';
//import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="w-full fixed top-0 h-16 border-b-2 border-b-gray-200 p-2 flex justify-between items-center bg-white">
      <Link to="/" className="font-bold text-xl">ClubConnect IIITD</Link>
      <Link to="/profile">My Profile</Link>
    </div>
  )
}

export default Navbar
