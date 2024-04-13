import "./ews_table.scss"

export const EWSTablePage = () => {
    return (
        <div className="ews-table">
            <div className="title mb-3">Tabel Early Warning Score (EWS)</div>
            <span>Tabel ini digunakan sebagai acuan untuk menghitung skor EWS seorang pasien dan menentukan protokol yang akan dijalankan.</span>
            {/* EWS TABLE */}
            <div className="vsign-table mt-4">
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
            <div className="footer-sticker">
                <img src="footer-sticker.svg" alt="" />
            </div>
        </div>
    )
}

export default EWSTablePage