import React, { useEffect, useState } from "react";
import "./protocols.scss"
import { baseUrl } from "../../../../../core/config";
import axios from "axios";
import { 
    createColumnHelper, 
    flexRender, 
    getCoreRowModel, 
    getPaginationRowModel, 
    useReactTable } from "@tanstack/react-table";
import { Table as BsTable } from 'react-bootstrap';
import { Link } from "react-router-dom";

type Protocol = {
    id: number
    score_thres_id: number
    risk_level_id: number
    category_id: number
    monitor_freq_id: number
    threshold: string
    level: string
    category: string
    frequency: string
    protocol_list: string
}

export const ProtocolLists = () => {
    const [data, setData] = useState<Protocol[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    useEffect(() => {
        getProtocols();
    }, []);

    function TextWithLineBreaks(props:any) {
        const textWithBreaks = props.text.split('\\n').map((text:any, index:any) => (
            <React.Fragment key={index}>
                {text}
                <br />
            </React.Fragment>
        ));
    
        return <div>{textWithBreaks}</div>;
    }

    const columnHelper = createColumnHelper<Protocol>();

    const columns = [
        columnHelper.accessor(row => row.id, {
            id: 'row_number',
            cell: info => (
                <i>{info.row.index + 1}</i>
            ),
            header: () => 'No.',
            size: 40
        }),
        columnHelper.accessor(row => row.threshold, {
            id: 'threshold',
            header: () => 'Acuan Skor EWS',
        }),
        columnHelper.accessor(row => row.level, {
            id: 'level',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Tingkat Risiko',
        }),
        columnHelper.accessor(row => row.category, {
            id: 'category',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Kategori Protokol',
        }),
        columnHelper.accessor(row => row.frequency, {
            id: 'frequency',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Frekuensi Monitoring',
        }),
        columnHelper.accessor(row => row.protocol_list, {
            id: 'protocol_list',
            cell: info => <TextWithLineBreaks text={info.getValue()} />,
            header: () => 'Daftar Protokol',
            size: 400
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

    function getProtocols() {
        axios.get(`${baseUrl}/protocol/all`)
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
        <div className="protocols">
            <div className="title mb-3">Daftar Protokol</div>
            <span>Daftar protokol berikut dapat disesuaikan dengan perubahan standar yang ada.</span>
            {/* TABEL PROTOKOL */}
            <div className="protocol-table mt-4">
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
            </div>
            <div className="table-controller d-flex align-items-center justify-content-center">
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

export default ProtocolLists