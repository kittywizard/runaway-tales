import { supabase } from "../supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function Intro() {
    const [getSession, setGetSession] = useState(false);

    useEffect(() => {
        supabase.auth.getSession().then((session) => {
            if (session.data.session !== null) setGetSession(prevState => !prevState);
        });
    }, []);

    return (
        <div className="max-w-3xl mx-auto justify-center">
        {getSession ?
        <>
            <h2 className="p-2 text-lg font-bold text-center">Welcome</h2>
            <p className="p-2 text-sm text-center">
                 <Link to="/saved" className='p-3 font-bold text-dark-green'>Saved</Link>
            </p>
        </>
        :
            <p className="p-2 text-sm text-center">
                Runaway Tales is a prompt based writing/art challenge, originally hosted on livejournal, now hosted at  
                <a href="http://wriye.proboards.com" 
                    className="font-bold text-dark-green hover:bg-gray-green-light hover:border-b-1 hover:border-b-black"
                    rel="noreferrer" 
                    target="_blank"
                > WriYe
                </a>, a year round writing community.
                There are over 3,500 prompts, separated into different 'flavors' based around themes (like emotions, props and actions). 
                Pick one and get started!
            </p>
        }
            
            <p className="p-2 text-sm text-center">
                You can narrow your results by selecting from one of the dropdowns below - either by specific theme (Action, Sensory, Romantic, etc.) 
                or by a specific flavor (Vanilla, Chocolate, Strawberry, etc.) By leaving both blank, you'll get a random prompt from the entire list.
            </p>
        </div>
    )
}