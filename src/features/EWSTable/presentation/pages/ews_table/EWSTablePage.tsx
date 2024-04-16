import "./ews_table.scss"

export const EWSTablePage = () => {
    return (
        <div className="ews-table">
            <div className="title mb-3">Tabel Early Warning Score (EWS)</div>
            <span>Tabel ini digunakan sebagai acuan untuk menghitung skor EWS seorang pasien dan menentukan protokol yang akan dijalankan.</span>
            {/* EWS TABLE */}
            <div className="vsign-table mt-4">
                <table className="table table-hover table-striped table-bordered table-hover">
                    <thead className="table-success">
                        <tr>
                            <th scope="col">Tanda Vital</th>
                            <th scope="col">3</th>
                            <th scope="col">2</th>
                            <th scope="col">1</th>
                            <th scope="col">0</th>
                            <th scope="col">1</th>
                            <th scope="col">2</th>
                            <th scope="col">3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Heart Rate</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>65.18,70.49</td>
                            <td>95.07,96.1</td>
                            <td>96.11,109.26</td>
                            <td>109.27</td>
                        </tr>
                        <tr>
                            <td>Systolic Blood Pressure</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>110.54,143.95</td>
                            <td>143.96,157.26</td>
                            <td>157.27,159.85</td>
                            <td>159.86</td>
                        </tr>
                        <tr>
                            <td>Diastolic Blood Pressure</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>42.44,50.28</td>
                            <td>50.29,73.6</td>
                            <td>73.61,75.19</td>
                            <td>75.2</td>
                        </tr>
                        <tr>
                            <td>Respiratory Rate</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>16.25,16.63</td>
                            <td>22.14,23.14</td>
                            <td>23.15,23.31</td>
                            <td>23.32</td>
                        </tr>
                        <tr>
                            <td>Temperature</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>36.41,36.62</td>
                            <td>36.63,38.13</td>
                            <td>38.14,38.24</td>
                            <td>38.25</td>
                        </tr>
                        <tr>
                            <td>SPO2</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>93.42,94.73</td>
                            <td>94.74,99.41</td>
                            <td>99.42,99.52</td>
                            <td>99.53</td>
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