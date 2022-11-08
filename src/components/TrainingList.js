import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import {format} from 'date-fns';

export default function TrainingList() {
    
    const [trainings, setTrainings] = useState([]);
   
    const dateFormatter = (params) => {
        return format(new Date(params.data.date), 'ccc dd.MM.yyyy H:mm');
    }

    const [columnDefs] = useState([
        {field: 'customer.firstname', headerName: 'First name', sortable: true, filter: true},
        {field: 'customer.lastname', headerName: 'Lastname', sortable: true, filter: true},
        {field: 'activity', headerName: 'Activity', sortable: true, filter: true},
        {field: 'date', headerName: 'Date', sortable: true, filter: true, valueFormatter:dateFormatter} ,
        {field: 'duration', headerName: 'Duration (min.)', sortable: true, filter: true}
        
    ])

    useEffect (() => {
        getTrainings();
    }, []);

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => {
            if(response.ok)
               return response.json();
            else
                alert("Something went wrong!");
        }) 
        .then (data => setTrainings(data))
        .catch(err => console.error(err))
    }


    return(<div className='ag-theme-material' style={{height:600, width: '70%', margin: 'auto'}}>
        <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10} />

    </div>)
}