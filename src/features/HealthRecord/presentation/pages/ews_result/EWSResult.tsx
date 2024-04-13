import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ews_result.scss";
import { baseUrl } from "../../../../../core/config";

interface Score {
    id: number
    record_id: number
    heart_score: string
    sys_score: string
    dias_score: string
    respiratory_score: string
    temp_score: string
    spo2_score: string
    ews_score: string
    created_at: string
    updated_at: string
}

export const EWSResult = () => {
    const { id } = useParams();
    const [data, setData] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const isToBeSaved = sessionStorage.getItem('isToBeSaved');

    useEffect(() => {
        axios.get(`${baseUrl}/patients/score/detail/${id}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="p-3">
            <div className="ews-result">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="title">Skor EWS Paisen :</div>
                    <div className="score">
                        {loading 
                            ? <h1>...</h1> 
                            : data.map((obj) => {
                                return obj.ews_score
                            })}
                    </div>
                </div>
                <div className="detail">
                    <div className="info">
                        <span className="info-item">Level Risiko</span>
                        <span className="semicolon">:</span>
                        <span className="info-value">Medium</span>
                    </div>
                    <div className="info">
                        <span className="info-item">Kode Protokol</span>
                        <span className="semicolon">:</span>
                        <span className="info-value">Urgent</span>
                    </div>
                    <div className="info">
                        <span className="info-item">Frekuensi Monitoring</span>
                        <span className="semicolon">:</span>
                        <span className="info-value">Min. setiap 1 jam</span>
                    </div>
                    <div className="info">
                        <span className="info-item">Protokol</span>
                        <span className="semicolon">:</span>
                        <ol className="info-value">
                            <li>Perawat yang sedang memantau pasien harus segera mengabari staf medis lainnya.</li>
                            <li>Perawat yang sedang memantau meminta penanganan medis darurat kepada dokter spesialis.</li>
                            <li>Memindahkan pasien ke ruangan dengan fasilitas monitoring yang lengkap.</li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="result-detail mt-3">
                <div className="title">Detail Skor Pasien</div>
                <div className="formula">
                    <div className="title">Rumus Menghitung Total Skor EWS</div>
                    <div className="content">Skor detak jantung + skor laju pernapasan + skor suhu tubuh + skor saturasi oksigen + skor tingkat kesadaran + skor tekanan darah sistolik</div>
                </div>
                <div className="row detail-score">
                    <div className="col-sm-3">
                        <div>Detak Jantung</div>
                        <div>Laju Pernapasan</div>
                        <div>Saturasi Oksigen</div>
                        <div>Tekanan Darah Sistolik</div>
                        <div>Tekanan Darah Diastolik</div>
                        <div>Suhu Tubuh</div>
                    </div>
                    <div className="col-sm-1 semicolon">
                        <div>:</div>
                        <div>:</div>
                        <div>:</div>
                        <div>:</div>
                        <div>:</div>
                        <div>:</div>
                    </div>
                    <div className="col-sm-2">
                        <div>
                            {data.map((obj) => {
                                return obj.heart_score
                            })}
                        </div>
                        <div>
                            {data.map((obj) => {
                                return obj.respiratory_score
                            })}
                        </div>
                        <div>
                            {data.map((obj) => {
                                return obj.spo2_score
                            })}
                        </div>
                        <div>
                            {data.map((obj) => {
                                return obj.sys_score
                            })}
                        </div>
                        <div>
                            {data.map((obj) => {
                                return obj.dias_score
                            })}
                        </div>
                        <div>
                            {data.map((obj) => {
                                return obj.temp_score
                            })}
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <hr />
                    <span className="ms-3 plus">+</span>
                </div>
                <div className="row score-total">
                    <div className="col-sm-3">Total Skor EWS</div>
                    <div className="col-sm-1">:</div>
                    <div className="col-sm-2">
                        {data.map((obj) => {
                            return obj.ews_score
                        })}
                    </div>
                </div>
            </div>
            <div className="button-wrap">
                <div className="col-md-5">
                    <Link to="/">
                        <div className="btn custom-btn">Simpan Data</div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EWSResult