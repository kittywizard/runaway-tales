import {useContext, useEffect, useState} from "react";
import { flavorData } from "../data/flavors"; 
import { supabase } from "../supabaseClient";
import { Context } from "../context";

function useGenerator() {
    const [chosenPrompts, setChosenPrompts] = useState([]);

    function getPrompt(dropdownState, flavors) {
        let promptObj = {};

        //these changes break the drop down yay
        if(dropdownState.theme !== "") {
            console.log("yes theme")
            const themePrompts = flavors.filter(flavor => flavor.flavor_desc === dropdownState.theme);
            const numbers = generateNumbers(themePrompts);
            promptObj = setPromptObj(numbers[0], numbers[1], themePrompts);
        }
        else if(dropdownState.flavor !== "") {
            console.log("yes flavor")
            const flavorPrompts = flavors.filter(flavor => flavor.flavor_name === dropdownState.flavor);
            const flavNum = generateNumbers(flavorPrompts);
            promptObj = setPromptObj(flavNum[0], flavNum[1], flavorPrompts);
        }
        else {
            console.log("neither")
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
        console.log(randomFlavorNum)
        //data is different now, needs different setup
        // array of 1000 objects ( or less)
        // just need to grab array at position random number

        let randomPromptNum = flavorArray[randomFlavorNum]; 
        console.log(randomPromptNum)

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