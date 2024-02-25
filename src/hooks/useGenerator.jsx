import {useState, useEffect} from "react";

function useGenerator({dropdownState, flavors}) {

    //const [flavors, setFlavors] = useState(flavorData);

    const [chosenPrompts, setChosenPrompts] = useState([]);

    function getPrompt(dropdownState, flavors) {

        let promptObj = {};
        console.log('get prompt running..');
        console.log(dropdownState.theme);

        //if user hasn't selected anything from the dropdowns, grab from all flavors
       
        if(dropdownState.theme === "" && dropdownState.flavor === "") {
            console.log(`logging all numbers.. ${flavors.length}`);
            const allNumbers = generateNumbers(flavors);
            promptObj = setPromptObj(allNumbers[0], allNumbers[1], dropdownState.flavors);

        } 
        else if(dropdownState.flavor !== "") {
            const flavorPrompts = flavors.filter(flavor => flavor.flavor === dropdownState.flavor);
            const flavNum = generateNumbers(flavorPrompts);
            promptObj = setPromptObj(flavNum[0], flavNum[1], flavorPrompts);
        }
        else if(dropdownState.theme !== "") {
            const themePrompts = flavors.filter(flavor => flavor.theme === dropdownState.theme);
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

    return {getPrompt, chosenPrompts, setChosenPrompts}
}

export default useGenerator;