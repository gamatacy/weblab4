import React, {useContext, useState} from 'react';
import "../../styles/index.css";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {AuthContext} from "../context";
const SignInForm = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [Login, setLogin] = useState()
    const [Password, setPassword] = useState()

    const signIn = () => {
        setIsAuth(true)
    }

    return (
        <div className="registration-container mx-auto border border-2" style={{height:600}}>
            <Helmet>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            </Helmet>
            <div className="error-message"></div>
            <div className="row h-100 w-100 m-0">
                <div className="row m-0 h-100">
                    <div className="position-absolute">
                        <Link to="/LoginType">
                            <span className="material-symbols-outlined fs-5">arrow_back</span>
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center">
                        <div>
                            <div className="row">
                                <input onChange={e => setLogin(e.target.value)} className="m-auto  input-field"
                                       placeholder=" Login"></input>
                            </div>
                            <div className="row">
                                <input onChange={e => setPassword(e.target.value)} type="password"
                                       className="m-auto mt-3 input-field" placeholder=" Password">
                                </input>
                            </div>
                            <div className="row">
                                <button onClick={signIn} className="submit-btn fs-5 m-auto content-block mt-3">Sign in</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SignInForm;