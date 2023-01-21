import React from 'react';
import {GraphManager} from "./index";

const Graph = ({hitsService, setTrigger, radius, ...props}) => {

    return (
        <div className="col-md p-0 d-flex">
            <canvas onClick={() => {
                GraphManager.applyHit(radius, hitsService, setTrigger)
            }} className="graph mx-auto my-5"/>
        </div>
    );
};

export default Graph;