import { supabase } from "../supabaseClient";
import { useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Prompt(props){ 

    const {prompt, number, flavor, promptType} = props.data;
    const [toggleSaved, setToggleSaved] = useState(true);
    
    async function addToSaved(prompt, number) {
        //prevent default

        //error checking

        console.log(`Save this one ${[prompt]}`);
        setToggleSaved(prevState => !prevState);

        const { data: { user } } = await supabase.auth.getUser();

        const { data, error } = await supabase.from('saved')
            .insert([{ id: 1, user_id: user.id, favorite: true, prompt_id: number }]).select();        

        if(error){
            console.log(error);
        }

        if(data){
            console.log(data);
        }
    }

    // useEffect(() => {

    //     addToSaved(prompt, number);

    // }, []);

    // async function dataGrab() {
    //     //replace prompts with specific id
    //     const { data: { user } } = await supabase.auth.getUser();

    //     const { data, error } = await supabase
    //         .from('saved')
    //         .insert([
    //             { user_id: user.id, favorite: 'true', prompt_id: 96},
    //         ])
    //         console.log(saved)

    //     }
    // useEffect(() => {
    //         dataGrab()
    //         .catch(console.error); 
        
    // }, []);

    return (
        <div className="p-6 m-2 bg-gray-green-light shadow-sm shadow-gray-dark/50 max-w-xs">
            <h4 className="font-bold text-lg text-dark-green">{flavor}</h4>
            <p className="text-xs text-gray font-bold">{promptType}</p>
            <p className="text-dark-gray text-lg py-2">{number}. {prompt}</p>
            <FontAwesomeIcon 
                icon={toggleSaved ? faPlus : faCheck}
                onClick={() => addToSaved(prompt)}
                className="text-3xl text-dark-green hover:text-gray-dark cursor-pointer"
            />
        </div>
    )
}