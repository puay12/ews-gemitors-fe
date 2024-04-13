import "./protocols.scss"

export const ProtocolLists = () => {
    return (
        <div className="protocols">
            <div className="title mb-3">Daftar Protokol</div>
            <span>Protokol yang ada dapat disesuaikan dengan perubahan standar yang ada.</span>
            {/* TABEL PROTOKOL */}
            <div className="protocol-table mt-4">
                <table className="table table-hover">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>Thornton</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProtocolLists