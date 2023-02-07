import React from 'react'
import "../styles/index.css"
import icon from "../img/github-mark.svg"
import logout from "../img/logout_FILL0_wght400_GRAD0_opsz48.svg"
import AuthService from "../services/AuthService";

const Header = ({isAuth, setIsAuth,...props}) => {

    return (
        <div className="content-block border-bottom border-2" style={{height: 100}}>
            <div className="header-container mx-auto my-0">
                <div className="row justify-content-center  d-md-flex w-100 h-100">
                    <div className="col-4 p-0 d-flex text-center">
                        <h1 className="m-auto">Ivan Voronin</h1>
                    </div>
                    <div className="col-md p-0"></div>
                    <div className="col-4 col-md-2 p-0 d-flex">
                        <h1 className="m-auto">P32312</h1>
                    </div>
                    <div className="col-4 col-md-2 p-0 d-flex">
                        <h1 className="m-auto">336767</h1>
                    </div>
                </div>
            </div>
            <div className="position-absolute top-0 mt-md-3 mx-md-3 ">
                {
                    isAuth
                        ?
                        <img src={logout} width="32" height="32" onClick={() =>{
                            AuthService.logout(setIsAuth)
                        }
                        }/>
                        :
                        <a href="https://github.com/gamatacy/weblab4"><img src={icon} height="32" width="32"/></a>
                }
            </div>
        </div>
    );
};

export default Header;