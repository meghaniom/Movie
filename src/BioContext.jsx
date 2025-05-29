import { createContext } from "react";
//   1 Step
 export const   BioContext = createContext();


  export const    BioProvier = ({children}) => {
        const name = "Hello om";
        const age = 20;

        return(
            <BioContext.Provider value={ {name:name, age:age}}>
              {children}
            </BioContext.Provider>
        )
}
