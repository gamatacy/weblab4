import React from 'react';
import "../styles/index.css"
const Header = () => {
    return (
        <div className="content-block border border-2" style={{height:100}}>
            <div className="header-container mx-auto my-0">
                <div className="row w-100 h-100">
                    <div className="col-4 p-0 d-flex">
                        <h1 className="m-auto">Ivan Voronin</h1>
                    </div>
                    <div className="col-lg p-0"></div>
                    <div className="col-2 p-0 d-flex">
                        <h1 className="my-auto">P32312</h1>
                    </div>
                    <div className="col-2 p-0 d-flex">
                        <h1 className="my-auto">336767</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;