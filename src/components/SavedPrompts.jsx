import { useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import { Context } from "../context";
import  Prompt  from "./prompts/Prompt";
import {nanoid } from "nanoid";

export default function SavedPrompts() {
    const {user} = useAuth();
    const user_id = user.id;

    const [savedPrompts, setSavedPrompts] = useState([]);
    const {flavorsDB} = useContext(Context);

        
    async function dataGrab(id) {
        //grab specific user's prompt id list (aka. list of saved)
        const {data: saved, error} = await supabase.from('saved')
        .select('prompt_id')
        .eq('user_id', id);

        if(error) console.log(error)

        //array of numbers for next query
        let values = [];
        let prompts = [];
        for(let i = 0; i < saved.length; i++) {
            values.push(parseInt(Object.values(saved[i])));
        }

        for (let i = 0; i < values.length; i++) {
            prompts.push(flavorsDB[values[i]])
        }
        
        setSavedPrompts(prompts);
    }

    
    useEffect(()=> {
        dataGrab(user_id);
    },[]);


    //maybe check if there are any here first
    const promptMap = savedPrompts.map(prompt => (
        <Prompt 
            data={prompt}
            key={nanoid()}
        />
    ));

    return (
        <main className="container flex flex-col justify-between max-w-3xl mx-auto">
                <h1 className="font-bold text-2xl text-dark-green text-center">Saved Prompts</h1>
                <div className="p-2 text-sm text-left">
                {
                    savedPrompts == {} ? <>
                        Find some prompts!
                    </> :
                        <div className="flex justify-between flex-wrap">
                            {promptMap}
                        </div>
                }
                </div>
        </main>

    )
}