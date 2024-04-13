import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./ews_result.scss";
import { baseUrl } from "../../../../../core/config";
import { Button as BSButton } from 'react-bootstrap';
import { Alert, Snackbar, Button } from "@mui/material";

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
    const [data, setData] = useState<Score>();
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    
    const id = sessionStorage.getItem('recordId');
    const scores = JSON.parse(sessionStorage.getItem('scores') ?? '');

    useEffect(() => {
        if (scores != '') {
            setData(scores);
        } else {
            axios.get(`${baseUrl}/patients/score/detail/${id}`)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        setLoading(false);
    }, []);

    const handleOnClick = async (e:any) => {
        e.preventDefault();
        setLoading(true);

        axios.post(`${baseUrl}/patients/score/add`, {
            record_id: id,
            heart_score: data?.heart_score,
            sys_score: data?.sys_score,
            dias_score: data?.dias_score,
            respiratory_score: data?.respiratory_score,
            temp_score: data?.temp_score,
            spo2_score: data?.spo2_score,
            ews_score: data?.ews_score
        })
            .then((res) => {
                setOpen(true);
                setLoading(false);
                sessionStorage.setItem('scores', '');
            })
            .catch((err) => console.log(err));
    }

    const action = (
        <Link to='/'>
            <Button size="small" color="inherit" variant="outlined">
                Ok
            </Button>
        </Link>
    );

    return (
        <div className="p-3">
            <div className="ews-result">
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="title">Skor EWS Paisen :</div>
                    <div className="score">
                        {loading 
                            ? <h1>...</h1>
                            : data?.ews_score}
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
                            {data?.heart_score}
                        </div>
                        <div>
                            {data?.respiratory_score}
                        </div>
                        <div>
                            {data?.spo2_score}
                        </div>
                        <div>
                            {data?.sys_score}
                        </div>
                        <div>
                            {data?.dias_score}
                        </div>
                        <div>
                            {data?.temp_score}
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
                        {data?.ews_score}
                    </div>
                </div>
            </div>
            {scores != ''
                ?   <div className="button-wrap">
                        <div className="col-md-5">
                            <div className="btn custom-btn" onClick={handleOnClick}>Simpan Data</div>
                        </div>
                    </div>
                : <div></div>
            }
            <Snackbar
                open={open}
                anchorOrigin={{ 
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                    action={action}
                >
                Berhasil menyimpan skor EWS pasien!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EWSResult