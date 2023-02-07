import React, {useContext, useEffect, useState} from 'react';
import InputForm from "./InputForm";
import Graph from "./graph/Graph";
import Table from "./table/Table";
import {HitsService} from "../../services/HitsService";

const MainPage = () => {

    const hitsService = new HitsService()
    const [tableTrigger, setTableTrigger] = useState(false)
    const [radius, setRadius] = useState(1)

    const trigger = () => {
        setTableTrigger(!tableTrigger)
    }

    return (
        <div>
            <div className="row input-container mx-auto mt-5">
                <Graph
                    hitsService={hitsService}
                    setTrigger={trigger}
                    radius={radius}/>
                <InputForm
                   hitsService={hitsService}
                   setTrigger={trigger}
                   radius={radius}
                   setRadius={setRadius}
                />
            </div>
            <Table
                hitsService={hitsService}
                tableTrigger={tableTrigger}
                radius={radius}
            />
        </div>
    );
};

export default MainPage;