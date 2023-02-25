import { Outlet, Link } from "react-router-dom";

export default function Dashboard() {
    //context user info

    return (
        // make this grid instead
        <section className="container mx-auto flex flex-row justify-between">
            <div>
               <h1 className="text-dark-green text-2xl font-bold font-serif py-2 flex flex-col">
                     Username
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