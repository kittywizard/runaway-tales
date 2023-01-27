export default function Button(props) {
    return (
        <button 
            className="rounded-md bg-dark-green px-6 py-2 m-2 mb-4 font-bold text-white hover:bg-green hover:text-gray-dark shadow-sm shadow-black/30 hover:shadow-xs hover:shadow-black/50"
            onClick={props.handleClick}>
            {props.buttonName}
        </button>
    )
}