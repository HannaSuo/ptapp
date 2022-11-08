import React, {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL } from '../constants';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState([
        {field: 'firstname', headerName: 'First name', sortable: true, filter: true},
        {field: 'lastname', headerName: 'Lastname', sortable: true, filter: true},
        {field: 'streetaddress', headerName: 'Address', sortable: true, filter: true},
        {field: 'postcode', headerName: 'Postcode', sortable: true, filter: true},
        {field: 'city', headerName: 'City', sortable: true, filter: true},
        {field: 'email', headerName: 'E-mail', sortable: true, filter: true},
        {field: 'phone' , headerName: 'Phonenumber',  sortable: true, filter: true}
    ])

    useEffect (() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(API_URL + '/customers')
        .then(response => {
            if(response.ok)
               return response.json();
            else
                alert("Something went wrong!");
        }) 
        .then (data => setCustomers(data.content))
        .catch(err => console.error(err))
    }


    return(<div className='ag-theme-material' style={{height:600, width: '95%', margin: 'auto'}}>
        <AgGridReact
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10} />

    </div>)
}