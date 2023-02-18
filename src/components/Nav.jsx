import Button from "./Button";

export default function Nav() {
    //need to grab user info from context (later)

    return (
        <ul className="hidden md:flex items-center justify-between">
            {/* //check to see if logged in via context - then display li's accordingly */}
            <li className='p-3 font-bold text-dark-green'>
                <Button buttonName="Username" buttonType={true} handleClick={() => console.log('dashboard')}/>
            </li>
            <li className='p-3'>
                 {/* //replace with actual login function */}
                <Button buttonName="Login" buttonType={true} handleClick={() => console.log('login')}/>
            </li>
            <li className='p-3'>
                {/* //replace with actual logout function */}
                <Button buttonName="Logout" buttonType={true} handleClick={() => console.log('logout')}/>
            </li>
        </ul>
    )
}