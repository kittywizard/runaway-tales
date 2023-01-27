import { toppings } from "../data/toppings"
import Topping from "../components/Topping"
import { useState } from "react";

export default function useTopping() {

    const [newTopping, setNewTopping] = useState();

    function getTopping() {
        let randomToppingNum = Math.floor((Math.random() * toppings.length) + 0);

        setNewTopping(() => (
            <Topping 
                name={toppings[randomToppingNum].topping}
                claim={toppings[randomToppingNum].claim}
            />
        )); 
    }

    return { getTopping, newTopping }
}