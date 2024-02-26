import { useEffect, useState } from "react";
import React from "react"; //go away typescript
import {nanoid } from "nanoid";

import Button from "./components/Button";
import Prompt from "./components/Prompt";
import Dropdown from "./components/form/Dropdown";
import Intro from "./components/Intro";

import useGenerator from "./hooks/useGenerator";
import useTopping from "./hooks/useTopping";

import { flavorData } from "./data/flavors"; //change to use database at some point 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

import { supabase } from "./supabaseClient";

export default function Main() {
    const [dropdownState, setDropdownState] = useState({
        theme: "",
        flavor: ""
    });
    const [displayTopping, setDisplayTopping] = useState(false);
    const [toggleTopping, setToggleTopping] = useState(true);

    const [flavors, setFlavors] = useState([]);
 
    //setting flavors from the database
        //this actually works!
    async function dataGrab() {
        const { data: prompts, error } = await supabase
         .from('prompts')
         .select();
         setFlavors(prompts);
     }

    useEffect(() => {
            dataGrab()
            .catch(console.error); 
        
    }, []);

    //const {getPrompt, chosenPrompts} = useGenerator(dropdownState, flavors);
    const [chosenPrompts, setChosenPrompts] = useState([]);


    //move back
    function getPrompt() {

        let promptObj = {};

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
        console.log(randomFlavorNum)

        //change this - db set up differently than the array
        let randomPromptNum = Math.floor((Math.random() * flavorArray[randomFlavorNum].prompt.length) + 0); 
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

    const {getTopping, newTopping} = useTopping();


    const promptMap = chosenPrompts.map(prompt => (
        <Prompt 
            data={prompt}
            key={nanoid()}
        />
    ));
        
    //need to check if promptMap gets updated and then display the topping stuff
    useEffect(() => {
        promptMap.length > 0 && setDisplayTopping(true)
    }, [promptMap]);

    function handleIconClick() {
        //set state and hide this section! also change icon
        setToggleTopping(prevState => !prevState)
    }

    //for the dropdowns
    const themeSet = new Set(flavorData.map(flavor => flavor.theme));
    const flavorSet = flavorData.map(flavor => flavor.flavor);
    
    return (
        <>
        <main className="container mx-auto flex-col justify-center">
            <Intro />
            <div className="container flex flex-row justify-between">  
                <Dropdown 
                    name="theme"
                    dropdownState={dropdownState}
                    setDropdownState={setDropdownState}
                    labelName={"Select a theme (optional):"}
                    dataSet={themeSet}
                />
                <Dropdown 
                    name="flavor"
                    labelName="Select a flavor (optional):"
                    dropdownState={dropdownState}
                    setDropdownState={setDropdownState}
                    dataSet={flavorSet}
                />
            </div>

            <section className="flex justify-center p-4">
                <h2 className="m-2 p-2 font-bold text-2xl text-gray">Generate a Flavor?</h2>
                 <Button 
                    handleClick={getPrompt}
                    buttonName={"Generate"}
                />
            </section>

            {displayTopping &&
                <section className="max-w-2xl m-auto bg-gray-green-light p-4 my-4 shadow-sm shadow-gray-dark/30">
                    <div className="text-right">
                        <FontAwesomeIcon 
                            icon={toggleTopping ? faAngleDown : faAngleLeft}
                            onClick={handleIconClick}
                            className="text-3xl text-dark-green hover:text-gray-dark cursor-pointer"
                        />
                    </div>

                    {toggleTopping &&
                        <section className="my-2">
                            <div className="flex justify-between">
                                <div className="flex-col mx-4">
                                    <h3 className="mb-1 font-bold text-lg">
                                        Need a topping to go with that flavor?
                                    </h3>
                                    <p className="text-xs">Toppings are optional add-ons that can completely change what (or who!) you're writing about.</p>
                                </div>
                                <Button 
                                    handleClick={getTopping}
                                    buttonName={"Get Topping"}
                                />
                            </div>

                            {newTopping}
                        </section>
                    }
                </section>
            }

            <section className="flex justify-between flex-wrap">
                {promptMap}
            </section>

        </main>
        </>
    )
}