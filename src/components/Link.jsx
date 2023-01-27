
export default function Link(props) {

    return (
        <li className="p-2">
            <a  href={props.href} 
                className="font-bold text-gray-dark hover:text-dark-green"
                target="_blank"
                rel="noreferrer"
            >
            </a>
            
        </li>
    )
}