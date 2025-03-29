import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Dashboard() {
    const {user} = useAuth();
    const username = user.user_metadata.username;

    const setupAccount = () => {
        
    }

    return (
        // make this grid instead
        <section className="container mx-auto flex flex-row justify-between">
            <div>
               <h1 className="text-dark-green text-2xl font-bold font-serif py-2 flex flex-col">
                     {username}
                </h1>
                <div className="container mx-auto flex-col justify-center">
                    <Link to="./settings" className="text-dark-green font-bold m-2">
                        Account Settings
                    </Link>
                </div>
            </div>
                
                <Outlet />
        </section>
    )
}