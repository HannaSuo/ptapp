import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import {format} from 'date-fns';
import Button from '@mui/material/Button';
import { API_URL } from '../constants';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';



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
        {field: 'duration', headerName: 'Duration (min.)', sortable: true, filter: true, width:180},
        {cellRenderer: params => 
            <Button 
                size="small" 
                variant="contained" 
                color="error" 
                onClick={() => deleteTraining(params.data)}> Delete </Button>, 
                width:100}
        
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

    const deleteTraining = (data) => {
        if(window.confirm("Delete training?")) {
            fetch(API_URL + '/trainings/' + data.id, {method: 'DELETE'})
                .then(response => {
                    if(response.ok)
                        getTrainings();
                    else
                        alert("Something went wrong")

                })
            }
    }


    return(
    <>
    <div className='ag-theme-material' style={{height:600, width: '85%', margin: 'auto'}}>
        <AgGridReact
        rowData={trainings}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10} />
    </div>
    </>)
}