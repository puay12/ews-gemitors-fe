import { useEffect, useState } from "react";
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
    score_thres: string
    risk_level: string
    category: string
    monitor_freq: string
    protocols: string
}

export const ProtocolLists = () => {
    const [data, setData] = useState<Protocol[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    useEffect(() => {
        axios.get(`${baseUrl}/patients/vsign/all`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

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
        columnHelper.accessor(row => row.score_thres, {
            id: 'score_thres',
            header: () => 'Acuan Skor EWS',
        }),
        columnHelper.accessor(row => row.risk_level, {
            id: 'risk_level',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Tingkat Risiko',
            size: 100
        }),
        columnHelper.accessor(row => row.category, {
            id: 'category',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Kategori Protokol',
            size: 100
        }),
        columnHelper.accessor(row => row.monitor_freq, {
            id: 'monitor_freq',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Frekuensi Monitoring',
            size: 100
        }),
        columnHelper.accessor(row => row.protocols, {
            id: 'protocols',
            cell: info => <i>{info.getValue()}</i>,
            header: () => 'Daftar Protokol',
            size: 100
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
        <div className="protocols">
            <div className="title mb-3">Daftar Protokol</div>
            <span>Protokol yang ada dapat disesuaikan dengan perubahan standar yang ada.</span>
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
        </div>
    )
}

export default ProtocolLists