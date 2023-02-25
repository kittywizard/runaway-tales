import Button from "../Button";

export default function Search({flavorInput, setFlavorInput}) {

    function handleChange(event) {
        const {value} = event.target;
        
        setFlavorInput(() => value);
    }

    console.log(flavorInput)
    return (
        <div>
            <label>put in a flavor: </label>
            <input
                type="text"
                placeholder="Flavor"
                onChange={handleChange}
                name="flavorInput"
                value={flavorInput}    
            />
            <Button 
                buttonName="Submit"
            />
        </div>
    )
}