export default function Topping(props) {
    return (
        <div className="p-4 bg-gray/30 rounded-md text-center col-span-3">
           <h4 className="text-lg font-bold">
                Topping: &nbsp;
                <span className="text-gray-dark">{props.name}</span>
            </h4>
            <p>
                {props.claim}
            </p>
        </div>
    )
}