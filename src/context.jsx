import { useEffect, useState, createContext} from "react";

const FlavorContext = createContext();

function ContextProvider({children}){

        const [flavorsDB, setFlavors] = useState({});
        
           //pull flavors from database
           async function dataGrab() {
               const {data: prompts, error} = await supabase.from('prompts')
               .select('*');
        
               if(error) console.log(error)
        
               setFlavors(prompts);
           }
           
           useEffect(()=> {
               dataGrab();
           },[]);
    

    return (
        <Context.Provider value={{flavorsDB}}>
            {children}
        </Context.Provider>
    )
}

export {FlavorContext, ContextProvider} 


