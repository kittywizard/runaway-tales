
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub, faDiscord} from '@fortawesome/free-brands-svg-icons';

export default function Nav() {

    return (
        <ul className="hidden md:flex items-center justify-between">
            <li className='p-4'>
                Login
            </li>
            <li>
                Logout
            </li>
        </ul>
    )
}