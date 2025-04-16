import { useEffect, useState, createContext, useContext} from "react";
import React from "react"; //go away typescript
import {nanoid } from "nanoid";

import { FlavorContext } from "./context";
import Button from "./components/Button";
import Prompt from "./components/Prompt";
import Dropdown from "./components/form/Dropdown";
import Intro from "./components/Intro";
import Loading from "./components/Loading";

import useGenerator from "./hooks/useGenerator";
import useTopping from "./hooks/useTopping";

import { flavorData } from "./data/flavors"; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

export default function Main() {
    const [dropdownState, setDropdownState] = useState({
        theme: "",
        flavor: ""
    });
    const [displayTopping, setDisplayTopping] = useState(false);
    const [toggleTopping, setToggleTopping] = useState(true);
    const {flavorsDB} = useContext(FlavorContext);

    // const [flavors, setFlavors] = useState(flavorData);

    //need to pass the flavor info to the generator hook
    // create context for this 
    const {getPrompt, chosenPrompts} = useGenerator(dropdownState);

    const {getTopping, newTopping} = useTopping();

    const promptMap = chosenPrompts.map(prompt => (
        <Prompt 
            data={prompt}
            key={nanoid()}
        />
    ));
        
    //display prompt list
    useEffect(() => {
        promptMap.length > 0 && setDisplayTopping(true)
    }, [promptMap]);

    // hide topping toggle
    function handleIconClick() {
        setToggleTopping(prevState => !prevState)
    }

    //for the dropdowns
    const themeSet = new Set(flavorData.map(flavor => flavor.theme));
    const flavorSet = flavorData.map(flavor => flavor.flavor);
    
    return (
            // { flavorsDB == {} ? <Loading/> :
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
                            handleClick={() => {getPrompt(dropdownState)}}
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
        // }
    )
}