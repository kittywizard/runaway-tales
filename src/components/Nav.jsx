import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function Nav() {
   const {user, signOut} = useAuth();
   const username = user.user_metadata.username;

   const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await signOut();
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <ul className="hidden md:flex items-center justify-between">
            <li className='p-3 font-bold text-dark-green'>
                <Link to="/dashboard">{username}</Link>
            </li>
            <li className='p-3 font-bold text-dark-green'>
                <Link to="/">Home</Link>
            </li>
            <li className='p-3'>
                <a className="cursor-pointer p-3 font-bold hover:text-gray-dark" onClick={handleLogout}>Logout</a>
            </li>
        </ul>
    )
}