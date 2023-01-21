import React, {useEffect, useState} from 'react';
import {Slider} from "primereact/slider";
import {Button} from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import {InputText} from "primereact/inputtext";
import $ from "jquery";
import {GraphManager} from "./graph";

const InputForm = ({hitsService, setTrigger, radius, setRadius, ...props}) => {

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isValuesValid, setIsValuesValid] = useState(true)
    const sendHit = () => {
        setIsLoading(true)
        hitsService.sendHit(x, y, radius).then(() => {
            setIsLoading(false)
            setTrigger()
        })
    }

    useEffect(() => {
        GraphManager.graphCoords(setX,setY,radius)
        validateX()
        validateR()
    }, [x, radius])

    const validateX = () => {
        if (x > 3 || x < -3 || x.length > 4) {
            $(".x-value").addClass("p-invalid block")
            $(".x-error").removeClass("opacity-0").addClass("opacity-100")
            setIsValuesValid(false)
        } else {
            $(".x-value").removeClass("p-invalid block")
            $(".x-error").removeClass("opacity-100").addClass("opacity-0")
            setIsValuesValid(true)
        }
    }
    const validateR = () => {
        if (radius > 3 || radius <= 0 || radius.length > 4) {
            $(".r-value").addClass("p-invalid block")
            $(".r-error").removeClass("opacity-0").addClass("opacity-100")
            setIsValuesValid(false)
        } else {
            $(".r-value").removeClass("p-invalid block")
            $(".r-error").removeClass("opacity-100").addClass("opacity-0")
            validateX()
        }
    }

    return (
        <div className="col-md p-0 m-auto">
            <div className="coords-container m-auto">
                <h5 className="mt-5 fs-1">X</h5>
                <InputText className="x-value " value={x} onChange={(e) => setX(e.target.value)}/>
                <small className="x-error p-error block opacity-0" style={{fontSize: 16}}>X must be within
                    [-3;3]</small>
                <h5 className="mt-2 fs-1">Y : {y}</h5>
                <Slider value={y} min={-3} max={5} onChange={(e) => setY(e.value)}/>
                <h5 className="mt-5 fs-1">R</h5>
                <InputText className="r-value" value={radius} onChange={(e) => setRadius(e.target.value)}/>
                <small className="r-error p-error block opacity-0" style={{fontSize: 16}}>R must be within (0;3]</small>
            </div>
            <div className="d-flex mt-3">
                <Button onClick={sendHit} disabled={!isValuesValid} loading={isLoading} className="fs-1 mx-auto submit-coords-btn" label="check"/>
            </div>
        </div>
    );

};

export default InputForm;