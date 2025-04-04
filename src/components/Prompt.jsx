import { supabase } from "../supabaseClient";
import { useAuth } from "../auth/AuthContext";
import { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Prompt(props){ 

    const {prompt, number, flavor, promptType} = props.data;
    const [toggleSaved, setToggleSaved] = useState(true);

    //this number needs to be pulled from the database - need the actual unique ID not whatever random shit this is pulling in (the number out of the bucket its in)
    
    async function addToSaved(prompt, number) {

        setToggleSaved(prevState => !prevState);

        const { data: { user } } = await supabase.auth.getUser(); //getSession later?
        const user_id = user.user_metadata.sub; 
        const username = user.user_metadata.username;

        console.log(prompt)

        if (toggleSaved) {
            //check if username is set up first
            //this can probably go somewhere else later
            const {data: profile, profileError} = await supabase.from('profiles').select('id', 'username').eq('id', user_id);
        
            if (profile[0].username == null) {
                const {data: setUsernameError} = await supabase.from('profiles')
                        .update({username: username})
                        .eq('id', user_id)
            }
        
            const { data, error } = await supabase.from('saved')
                .insert([{ user_id: user_id, favorite: true, prompt_id: number }]).select();        
    
            if(error){
                console.log(`error: ${error}`);
            }
        }
        else {
            console.log("remove entry from .saved");
            // const { data, error } = await supabase.from('saved')
            // .delete().eq("prompt_id": "number");        

            // if(error){
            //     console.log(`error: ${error}`);
            // }
        }

    }

    return (
        <div className="p-6 m-2 bg-gray-green-light shadow-sm shadow-gray-dark/50 max-w-xs">
            <h4 className="font-bold text-lg text-dark-green">{flavor}</h4>
            <p className="text-xs text-gray font-bold">{promptType}</p>
            <p className="text-dark-gray text-lg py-2">{number}. {prompt}</p>
            <FontAwesomeIcon 
                icon={toggleSaved ? faPlus : faCheck}
                onClick={() => addToSaved(prompt, number)}
                className="text-3xl text-dark-green hover:text-gray-dark cursor-pointer"
            />
        </div>
    )
}