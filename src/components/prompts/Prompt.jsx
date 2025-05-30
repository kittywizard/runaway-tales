import { supabase } from "../../supabaseClient";
import { useAuth } from "../../auth/AuthContext";
import { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import PromptDisplay from "./PromptDisplay";

export default function Prompt(props){ 

    const {prompt, id, flavor_name, flavor_desc} = props.data;
    const [toggleSaved, setToggleSaved] = useState(true);

    
    async function addToSaved(prompt, number) {

        setToggleSaved(prevState => !prevState);

        const { data: { user } } = await supabase.auth.getUser(); //getSession later?
        const user_id = user.user_metadata.sub; 
        const username = user.user_metadata.username;

        if (toggleSaved) {

            // this is checking profile data against authenticated user data to set a username properly. 
            // should probably go somewhere else
            const {data: profile, profileError} = await supabase.from('profiles').select('id', 'username').eq('id', user_id);
        
            if (profile[0].username == null) {
                const {data: setUsernameError} = await supabase.from('profiles')
                        .update({username: username})
                        .eq('id', user_id)
            }

            // check if it already exists with this user_id attached
                //db has a lot of duplicates
            const { checkSaved, errorCheckSaved } = await supabase.from('saved').select('user_id', 'prompt_id').eq('id', user_id, 'prompt_id'. number);
            if (checkSaved) {

                const { data, error } = await supabase.from('saved')
                    .insert([{ user_id: user_id, favorite: true, prompt_id: number }]).select();        
        
                if(error){
                    console.log(`error: ${error}`);
                }
            }
        
        }
        else {
            console.log("remove entry from .saved " + number);
            //delete id + matching user_id
            const { removeSaved, errorRemoveSaved } = await supabase.from('saved')
            .delete().eq("prompt_id", number);        

            if(error){
                console.log(`error: ${error}`);
            }
        }

    }

    //TO DO:
        // add or remove the plus icon, should only be a remove icon on saved status
        // display as a heart when already saved? plus the delete icon? 
        // a way to determine "size" main page vs. saved and pass that down to the display prompt component

    return (
        <div className="p-6 m-2 bg-gray-green-light shadow-sm shadow-gray-dark/50 max-w-xs">
            <h4 className="font-bold text-lg text-dark-green">{flavor_desc}</h4>
            <p className="text-xs text-gray font-bold">{flavor_name}</p>
            <p className="text-dark-gray text-lg py-2">{id}. {prompt}</p>
            <FontAwesomeIcon 
                icon={toggleSaved ? faPlus : faCheck}
                onClick={() => addToSaved(prompt, id)}
                className="text-3xl text-dark-green hover:text-gray-dark cursor-pointer"
            />
        </div>
    )
}