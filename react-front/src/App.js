import React, {useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/router/AppRouter";
import Header from "./components/Header";
import {AuthContext} from "./components/context";
import AuthService from "./services/AuthService";

function App(){

    //Change to null
    const [isAuth, setIsAuth] = useState(null)

    useEffect(() => {
        AuthService.authRestore().then(r => {
            setIsAuth(r)
        }).catch(r => {
            setIsAuth(r)
        })
    })

    return(
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
                <AppRouter/>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;