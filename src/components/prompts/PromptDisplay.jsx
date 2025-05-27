import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';

export default function PromptDisplay(props){
    //destructure props
    
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