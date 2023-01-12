import React, {useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import Header from "./components/Header";
import {AuthContext} from "./components/context";

function App(){
    const [isAuth, setIsAuth] = useState(false)

    return(
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Header/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;