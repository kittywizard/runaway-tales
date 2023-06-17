import {useState, useEffect} from "react";
import { flavorData } from "../data/flavors";


function useGenerator(props) {

    const [flavors, setFlavors] = useState(flavorData);
    const [chosenPrompts, setChosenPrompts] = useState([]);


    function getPrompt() {

        let promptObj = {};

        //if user hasn't selected anything from the dropdowns, grab from all flavors

        if(props.theme === "" && props.flavor === "") {
            const allNumbers = generateNumbers(flavors);
            promptObj = setPromptObj(allNumbers[0], allNumbers[1], flavors);

        } else if(props.flavor !== "") {
            const flavorPrompts = flavors.filter(flavor => flavor.flavor === props.flavor);
            const flavNum = generateNumbers(flavorPrompts);
            promptObj = setPromptObj(flavNum[0], flavNum[1], flavorPrompts);
        }
        
        else if(props.theme !== "") {
            const themePrompts = flavors.filter(flavor => flavor.theme === props.theme);
            const numbers = generateNumbers(themePrompts);
            promptObj = setPromptObj(numbers[0], numbers[1], themePrompts);
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

    return {getPrompt, flavors, chosenPrompts, setChosenPrompts}
}

export default useGenerator;