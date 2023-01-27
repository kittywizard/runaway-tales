import Option from "./Option";
import { nanoid } from "nanoid";
import { flavorData } from "../data/flavors";
import useDropdown from "../hooks/useDropdown";


export default function Dropdown(props){

    const {handleChange, dropdownMap} = useDropdown(props);


    return (
       <div className="container text-center p-4">
           <label htmlFor={props.name}>
               {props.labelName}
           </label>
           <select name={props.name} 
                    className="p-2 m-2 bg-gray-green-light rounded-md"
                    onChange={handleChange}
                    value={props.name == "theme" ? props.dropdownState.theme : props.dropdownState.flavor}
            >
                <Option value="" />
                {dropdownMap}
           </select>
       </div>
    )
}