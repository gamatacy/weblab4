import React, {useContext, useState} from 'react';
import "../../styles/index.css";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {AuthContext} from "../context";
const SignUpForm = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext)
    const [Name, setName] = useState()
    const [Login, setLogin] = useState()
    const [Password, setPassword] = useState()
    const [RepeatedPassword, setRepeatedPassword] = useState()

    const signUp = () => {

        if (!isPasswordsEquals()) {
            errorMessage("Different passwords")
        }

        setIsAuth(true)
    }
    const isPasswordsEquals = () => {
        return Password == RepeatedPassword
    }
    const errorMessage = (text) => {
        alert(text)
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
                                <input onChange={e => setName(e.target.value)} className="m-auto input-field"
                                       placeholder=" Name"></input>
                            </div>
                            <div className="row">
                                <input onChange={e => setLogin(e.target.value)} className="m-auto mt-3 input-field"
                                       placeholder=" Login"></input>
                            </div>
                            <div className="row">
                                <input onChange={e => setPassword(e.target.value)} type="password"
                                       className="m-auto mt-3 input-field" placeholder=" Password">
                                </input>
                            </div>
                            <div className="row">
                                <input onChange={e => setRepeatedPassword(e.target.value)} type="password"
                                       className="m-auto mt-3 input-field" placeholder=" Repeat password">
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex">
                            <button onClick={signUp} className="submit-btn fs-5 m-auto content-block">Sign up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;