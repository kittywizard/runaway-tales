import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
//import { Prompt } from "./Prompt";

export default function SavedPrompts() {
       const {user} = useAuth();
       const user_id = user.id;

        const [savedPrompts, setSavedPrompts] = useState([]);
        
            async function dataGrab(id) {
                const {data: saved, error} = await supabase.from('saved')
                .select('prompt_id')
                .eq('user_id', id);
        
                if(error) console.log(error)

                let values = [];

                for(let i = 0; i < saved.length; i++) {
                    let object = saved[i].prompt_id;
                    const {prompt, promptError} = await supabase.from('prompts').select('*').eq('prompt_id', object);
                    //values.push(parseInt(Object.values(saved[i])));
                    setSavedPrompts(prevState => {
                        return [
                            ...prevState,
                            prompt
                        ]
                    });
                }
                console.log(savedPrompts)        

            }
            
            useEffect(()=> {
                dataGrab(user_id);
            },[]);

            //console.log(savedPrompts)

            //maybe check if there are any here first
            // const promptMap = SavedPrompts.map(prompt => (
            //     <Prompt 
            //         data={prompt}
            //         key={nanoid()}
            //     />
            // ));

    return (
        <main className="container flex flex-col justify-between max-w-3xl mx-auto">
                <h1 className="font-bold text-2xl text-dark-green text-center">Saved Prompts</h1>
                <p className="p-2 text-sm text-left">
                {
                    savedPrompts == {} ? <>
                        Find some prompts!
                    </> :
                        <>
                            no
                        </>
                }
                </p>
        </main>

    )
}