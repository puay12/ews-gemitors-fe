import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Table as BsTable } from 'react-bootstrap';
import "./patient_health_record.scss";
import { baseUrl } from '../../../../../core/config';

type Record = {
    id: number
    heart_rate: string
    systolic_blood_pressure: string
    diastolic_blood_pressure: string
    respiratory_rate: string
    temperature: string
    spo2: string
    created_at: string
    updated_at: string
}

export const PatientHealthRecord = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    useEffect(() => {
        axios.get(`${baseUrl}/patients/vsign/all/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleAddVsign = () => {
        sessionStorage.setItem("patientId", id ?? '');
    }

    const handleToResult = (e:any) => {
        sessionStorage.setItem('recordId', e.currentTarget.getAttribute('value'));
    }

    const columnHelper = createColumnHelper<Record>()

    const columns = [
        columnHelper.accessor(row => row.id, {
            id: 'row_number',
            cell: info => (
                <i>{info.row.index + 1}</i>
            ),
            header: () => 'No.',
            size: 40
        }),
        columnHelper.accessor(row => row.created_at, {
            id: 'created_at',
            header: () => 'Dicatat Tanggal',
        }),
        columnHelper.accessor(row => row.heart_rate, {
            id: 'heart_rate',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Denyut Nadi',
            size: 100
        }),
        columnHelper.accessor(row => row.systolic_blood_pressure, {
            id: 'systolic_blood_pressure',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Tekanan Darah Sistolik',
            size: 100
        }),
        columnHelper.accessor(row => row.diastolic_blood_pressure, {
            id: 'diastolic_blood_pressure',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Tekanan Darah Diastolik',
            size: 100
        }),
        columnHelper.accessor(row => row.respiratory_rate, {
            id: 'respiratory_rate',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Laju Pernapasan',
            size: 100
        }),
        columnHelper.accessor(row => row.temperature, {
            id: 'temperature',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Suhu Tubuh',
            size: 100
        }),
        columnHelper.accessor(row => row.spo2, {
            id: 'spo2',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'SPO2',
            size: 100
        }),
        columnHelper.accessor(row => row.id, {
            id: 'id',
            cell: info => (
                <Link to={`/patient/ews/result`}>
                    <button className='btn btn-success ms-3' onClick={handleToResult} value={info.getValue()}>
                        Lihat
                    </button>
                </Link>
            ),
            header: () => 'Skor EWS',
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            pagination,
        },
    });

    return (
        <div className="home">
            <div className="row mt-4 mb-3">
                <div className="col-md-6">
                    <div className="title mb-3">Riwayat Tanda Vital Pasien</div>
                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <div className="panels">
                        <Link to={`/patient/records/add/`} onClick={handleAddVsign}>
                            <div className="add-btn py-2 ps-2 pe-4">    
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5 12H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span>Tambah Riwayat</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            {/* TABLES */}
            {loading 
                ? <p>Loading...</p> 
                : <BsTable striped bordered hover responsive size="sm">
                        <thead 
                            style={{
                                display: 'grid',
                            }}
                        >
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr 
                                    key={headerGroup.id} 
                                    style={{ display: 'flex', width: '100%' }}
                                >
                                    {headerGroup.headers.map(header => (
                                        <th 
                                            key={header.id} 
                                            style={{
                                                display: 'flex',
                                                width: header.getSize(),
                                            }}
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

                        <tbody 
                            style={{
                                display: 'grid',
                            }}
                        >
                            {table.getRowModel().rows.map(row => (
                                <tr 
                                    key={row.id}
                                    style={{
                                        display: 'flex',
                                        width: '100%',
                                    }}
                                >
                                    {row.getVisibleCells().map(cell => (
                                        <td 
                                            key={cell.id}
                                            style={{
                                                display: 'flex',
                                                width: cell.column.getSize(),
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </BsTable>}
                    <div className='d-flex justify-content-center align-items-center mb-3'>
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
        </div>
    )
}

export default PatientHealthRecord