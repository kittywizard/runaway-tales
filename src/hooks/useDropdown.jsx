import { useState } from "react";
import Option from "../components/Option";
import { nanoid } from "nanoid";


export default function useDropdown(props) {

    const dropdownMap = [];

    function handleChange(event) {
        const {value, name} = event.target;
        
        props.setDropdownState(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
 
    props.dataSet.forEach(option => {
        dropdownMap.push(        
        <Option 
            value={option}
            key={nanoid()}
        />)
    });

    return {handleChange, dropdownMap}
}