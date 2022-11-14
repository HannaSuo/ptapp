import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { API_URL } from '../constants';

import Button from '@mui/material/Button';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

export default function CustomerList() {

    const gridRef = useRef();

    const getColumns = () => {
        return({columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone']});
    }

    const [customers, setCustomers] = useState([]);

    const [columnDefs] = useState([
        {
            cellRenderer: params =>
                <AddTraining data={params.data} saveTraining={saveTraining} />,
            width: 70
        },
        { field: 'firstname', headerName: 'First name', sortable: true, filter: true, width: 150 },
        { field: 'lastname', headerName: 'Lastname', sortable: true, filter: true },
        { field: 'streetaddress', headerName: 'Address', sortable: true, filter: true },
        { field: 'postcode', headerName: 'Postcode', sortable: true, filter: true, width: 150 },
        { field: 'city', headerName: 'City', sortable: true, filter: true, width: 150 },
        { field: 'email', headerName: 'E-mail', sortable: true, filter: true },
        { field: 'phone', headerName: 'Phonenumber', sortable: true, filter: true },
        {
            cellRenderer: params =>
                <EditCustomer data={params.data} updateCustomer={updateCustomer} />,
            width: 100
        },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={() => deleteCustomer(params.data)}> Delete </Button>,
            width: 100
        }
    ])

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = () => {
        fetch(API_URL + '/customers')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    alert("Something went wrong!");
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch(API_URL + '/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    alert("New customer saved");
                    getCustomers();
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => console(err))
    }

    const deleteCustomer = (data) => {
        if (window.confirm("Delete customer?")) {
            fetch(data.links[1].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok)
                        getCustomers();
                    else
                        alert("Something went wrong")

                })
        }
    }

    const updateCustomer = (customer, url) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok)
                    getCustomers();
                else
                    alert("Soemthing went wrong")
            })
            .catch(err => console.error(err))
    }

    const saveTraining = (training, custName) => {
        fetch(API_URL + '/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok)
                    alert("New training session booked for " + custName + "!");
                else
                    alert("Something went wrong");
            })
            .catch(err => console(err))

    }

    const exportToCsv = useCallback(() => {
        const exportColumns = getColumns();
        gridRef.current.api.exportDataAsCsv(exportColumns);
    }, []);

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <Button startIcon={<FileDownloadIcon/>} size="small" onClick={exportToCsv}>Export to CSV</Button>
            <div className='ag-theme-material' style={{ height: 600, width: '100%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={customers}
                    columnDefs={columnDefs}
                    pagination={true}
                    paginationPageSize={8} />

            </div>
        </>)

}