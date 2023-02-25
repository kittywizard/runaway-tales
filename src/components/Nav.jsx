import Button from "./Button";
import { Link } from "react-router-dom";

export default function Nav() {
    //need to grab user info from context (later)
    //render if logged in, display username and logout link, otherwise just login

    return (
        <ul className="hidden md:flex items-center justify-between">
            <li className='p-3'>
                {/* <Button buttonName="Login" buttonType={true} handleClick={() => console.log('login')}/> */}
                <Link to="/Login">Login</Link>
            </li>
            {/* //check to see if logged in via context - then display li's accordingly */}
            <li className='p-3 font-bold text-dark-green'>
                {/* <Button buttonName="Username" buttonType={true} handleClick={() => console.log('dashboard')}/> */}
                <Link to="/dashboard">Username</Link>
            </li>
            <li className='p-3'>
                {/* <Button buttonName="Logout" buttonType={true} handleClick={() => console.log('logout')}/> */}
                <Link to="/logout">Logout</Link>
            </li>
        </ul>
    )
}