import Button from "./Button";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";


export default function Nav() {
   const {user} = useAuth();
   const username = user.user_metadata.username;

    return (
        <ul className="hidden md:flex items-center justify-between">
            <li className='p-3 font-bold text-dark-green'>
                <Link to="/dashboard">{username}</Link>
            </li>
            <li className='p-3'>
                <Link to="/logout">Logout</Link>
            </li>
        </ul>
    )
}