import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Task from "../Task";
const LoginType = () => {

    const [TaskVisible, setTaskVisible] = useState(false);

    const showTask = () => {
        setTaskVisible(true)
    }

    const hideTask = () => {
        setTaskVisible(false)
    }

    return (
        <div className="registration-container mx-auto border border-2">
            <div className="row h-100 w-100 m-0">
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
                <div className="row text-left m-0 m-auto mt-5 mb-5 border-top border-2">
                    <div className="p-0 m-auto d-flex w-75 mt-5">
                        {TaskVisible
                            ? <Task callback={hideTask}/>
                            : <button style={{marginTop: 100}} onClick={showTask} className="submit-btn mx-auto content-block fs-5">Show task</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginType;