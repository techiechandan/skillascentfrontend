import { useState } from "react";
import AuthContext from "./AuthContex";

const AuthState = (props)=>{
    const [loggedStatus, setLoggedStatus] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);

    return(
        <AuthContext.Provider value={{loggedStatus, setLoggedStatus, loggedUser, setLoggedUser}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState