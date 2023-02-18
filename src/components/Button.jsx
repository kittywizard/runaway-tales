export default function Button({buttonType, buttonName, handleClick}) {
    let regularBtn, smallBtn;

    if(buttonType == undefined) {
        //change styles
        regularBtn = "rounded-md bg-dark-green px-6 py-2 m-2 mb-4 font-bold text-white hover:bg-green hover:text-gray-dark shadow-sm shadow-black/30 hover:shadow-xs hover:shadow-black/50";
    } else {
        //regular styles
         smallBtn = "rounded-md px-3 py-2 my-1 font-bold";
    }
    return (
        <button 
            className={buttonType ? smallBtn : regularBtn}
            onClick={handleClick}>
            {buttonName}
        </button>
    )
}