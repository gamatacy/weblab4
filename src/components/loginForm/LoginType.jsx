import React from 'react';
import {Link} from "react-router-dom";
const LoginType = () => {

    return (
        <div className="registration-container mx-auto border border-2">
            <div className="row h-100 w-100">
                <div className="row mx-auto  m-0 w-100">
                    <div className="col d-flex justify-content-center">
                        <Link to="/SignIn">
                            <button style={{marginTop: 50}} className="submit-btn content-block fs-5">Sign in</button>
                        </Link>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <Link to="SignUp">
                            <button style={{marginTop: 50}} className="submit-btn content-block fs-5">Sign up</button>
                        </Link>
                    </div>
                </div>
                <div className="row mx-auto w-100">

                </div>
            </div>
        </div>
    );
};

export default LoginType;