import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Table as BsTable } from 'react-bootstrap';
import { baseUrl } from '../../../../../core/config';
import "./home.scss";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from '@mui/material';

type Patient = {
    id: number
    name: string
    gender: string
    age: string
    height: string
    weight: string
    phone: string
    created_at: Date
    updated_at: Date
}

export const Home = () => {
    const [data, setData] = useState([]);
    const [openUpdtSnackbar, setOpenUpdt] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    useEffect(() => {
        getAllPatients();

        if((sessionStorage.getItem('isPatientUpdated') != '') &&
            (sessionStorage.getItem('isPatientUpdated') != null)) {
            setOpenUpdt(true);
            sessionStorage.setItem('isPatientUpdated', '');
        }

        sessionStorage.setItem('patientId', '');
    }, []);

    // TABLE CONFIGS
    const columnHelper = createColumnHelper<Patient>()

    const columns = [
        columnHelper.accessor(row => row.id, {
            id: 'row_number',
            cell: info => (
                <i>{info.row.index + 1}</i>
            ),
            header: () => 'No.',
            size: 30
        }),
        columnHelper.accessor(row => row.created_at, {
            id: 'created_at',
            size: 10,
            header: () => 'Dibuat Tanggal',
        }),
        columnHelper.accessor(row => row.name, {
            id: 'name',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Nama Pasien',
        }),
        columnHelper.accessor(row => row.gender, {
            id: 'gender',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Jenis Kelamin',
        }),
        columnHelper.accessor(row => row.age, {
            id: 'age',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Usia',
        }),
        columnHelper.accessor(row => row.height, {
            id: 'height',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Tinggi Badan',
        }),
        columnHelper.accessor(row => row.weight, {
            id: 'weight',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Berat Badan',
        }),
        columnHelper.accessor(row => row.phone, {
            id: 'phone',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Telepon',
        }),
        columnHelper.accessor(row => row.id, {
            id: 'id',
            cell: info => (
                <Link to={`/patient/records/${info.getValue()}`} 
                        className='d-flex align-items-center justify-content-center'>
                    <button className='btn btn-success ms-3'>
                        <i className='fa fa-eye me-2'></i>
                        Lihat
                    </button>
                </Link>
            ),
            header: () => 'Riwayat Kesehatan',
        }),
        columnHelper.accessor(row => row.id, {
            id: 'action',
            cell: info => (
                <Link to={`/patient/update-data`}
                    className='d-flex justify-content-around align-items-center'
                    onClick={() => sessionStorage.setItem('patientId', info.getValue().toString())}>
                    <button className='btn btn-primary ms-3'>
                        <i className='fa fa-pencil-square-o me-2'></i>
                        Edit
                    </button>
                </Link>
            ),
            header: () => 'Action'
        })
    ];

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        columnResizeMode: 'onChange', 
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    function getAllPatients() {
        axios.get(`${baseUrl}/patients/`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <div className="home">
            <div className="title mb-3">Data Pasien</div>
            <div className="panels mb-3">
                <div className="search p-2">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M21 21L16.65 16.65" stroke="#9D9D9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input className="form-control me-2 search-input" type="search" placeholder="Cari Data..." aria-label="Search"/>
                </div>
                <Link to="/patient/add-data">
                    <div className="add-btn py-2 ps-2 pe-4">    
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Tambah Data</span>
                    </div>
                </Link>
            </div>
            {/* TABLES */}
            {loading 
                ? <p>Loading...</p> 
                :   <BsTable striped bordered hover responsive size="sm">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr 
                                    key={headerGroup.id} 
                                >
                                    {headerGroup.headers.map(header => (
                                        <th 
                                            key={header.id} 
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>

                        <tbody >
                            {table.getRowModel().rows.map(row => (
                                <tr 
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td 
                                            key={cell.id}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </BsTable>}
            <div className='table-controller d-flex justify-content-center align-items-center mb-3'>
                <div className='d-flex align-items-center gap-2'>
                    <button
                        className="btn btn-success p-2"
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                    >{'<<'}</button>
                    <button
                        className="btn btn-success p-2"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >{'<'}</button>
                    <button
                        className="btn btn-success p-2"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >{'>'}</button>
                    <button
                        className="btn btn-success p-2"
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >{'>>'}</button>
                </div>
                <span className="d-flex align-items-center gap-2 ms-2">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1}
                    </strong>
                    <span>
                    of{' '} {table.getPageCount().toLocaleString()}
                    </span>
                </span>
                <span className="flex items-center gap-2 ms-2">
                    | Go to page: 
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        table.setPageIndex(page)
                        }}
                        className="border p-1 rounded w-16 ms-3"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                    className='ms-3 btn btn-success'
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <Snackbar
                open={openUpdtSnackbar}
                anchorOrigin={{ 
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
                onClose={() => setOpenUpdt(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                Berhasil mengupdate data pasien!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Home