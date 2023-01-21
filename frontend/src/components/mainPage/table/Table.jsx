import React, {useState, useEffect} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import {GraphManager} from "../graph";

const Table = ({hitsService, tableTrigger, radius, ...props}) => {
    const [hits, setHits] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(2)

    useEffect(() => {
        hitsService.getPagesCount().then(count => {
            if (pagesCount != count && count - currentPage == 1) {
                setCurrentPage(count)
            }
            setPagesCount(count)
        })
        hitsService.getHits(currentPage).then(data => {
            setHits(data)
            GraphManager.drawHits(radius, data)
        })
    }, [currentPage, tableTrigger, radius])


    return (
        <div className="card w-75 mx-auto mt-5">
            <DataTable value={hits}>
                <Column field="result" header="result"></Column>
                <Column field="x" header="x"></Column>
                <Column field="y" header="y"></Column>
                <Column field="r" header="r"></Column>
                <Column field="execTime" header="execTime"></Column>
                <Column field="time" header="date"></Column>
            </DataTable>
            {
                pagesCount > 1
                    ?
                    <div className="row w-50 mx-auto">
                        <Button label="Previous" className="col-md-4 table-btn" onClick={() => {
                            setCurrentPage(currentPage - 1)
                        }} disabled={currentPage < 2}/>
                        <span className="col m-auto page-text">
                            {currentPage} of &nbsp;<span onClick={() => {
                            setCurrentPage(pagesCount)
                        }}>{pagesCount}</span>
                        </span>
                        <Button label="Next" className="col-md-4 table-btn" onClick={() => {
                            setCurrentPage(currentPage + 1)
                        }} disabled={pagesCount - currentPage <= 0}/>
                    </div>
                    :
                    <div/>
            }
        </div>
    );
}

export default Table;