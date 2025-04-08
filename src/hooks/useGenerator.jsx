import {useEffect, useState} from "react";
import { flavorData } from "../data/flavors"; 
import { supabase } from "../supabaseClient";

function useGenerator(props) {
    const [chosenPrompts, setChosenPrompts] = useState([]);
    let flavors = props.flavorsDB;


    function getPrompt(dropdownState) {
        let promptObj = {};
        const flavors = flavorData;
       
        if(dropdownState.theme !== "") {
            const themePrompts = flavors.filter(flavor => flavor.theme === dropdownState.theme);
            const numbers = generateNumbers(themePrompts);
            promptObj = setPromptObj(numbers[0], numbers[1], themePrompts);
        }
        else if(dropdownState.flavor !== "") {
            const flavorPrompts = flavors.filter(flavor => flavor.flavor === dropdownState.flavor);
            const flavNum = generateNumbers(flavorPrompts);
            promptObj = setPromptObj(flavNum[0], flavNum[1], flavorPrompts);
        }
        else {
            const allNumbers = generateNumbers(flavors);
            promptObj = setPromptObj(allNumbers[0], allNumbers[1], flavors);
        } 
       
        //set state
        setChosenPrompts(prevState => {
            return [
                ...prevState,
                promptObj
            ]
        });
    }

    //random number generator
    function generateNumbers(flavorArray) {
        
        let randomFlavorNum = Math.floor((Math.random() * flavorArray.length) + 0);
        let randomPromptNum = Math.floor((Math.random() * flavorArray[randomFlavorNum].prompts.length) + 0); 

        return [
            randomFlavorNum,
            randomPromptNum
        ]
    }

    function setPromptObj(randomFlavor, randomPrompt, array) {
        return {
            prompt: array[randomFlavor].prompts[randomPrompt],
            flavor: array[randomFlavor].flavor,
            number: randomPrompt + 1,
            promptType: array[randomFlavor].theme
        }
    }

    return {getPrompt, chosenPrompts, setChosenPrompts}
}

export default useGenerator;