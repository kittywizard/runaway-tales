import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header className="p-6 mb-3 mx-auto container flex items-center justify-between bg-gray-green-light rounded-b-lg shadow-sm shadow-gray-dark/40">
            <div className="container">
               <h1 className="text-dark-green text-4xl font-bold font-serif">
                     <Link to="/">Runaway Tales</Link>
                </h1>
                <p className="text-gray">A Writing Prompt Generator</p>
            </div>

            <Nav />
        </header>
    )
}