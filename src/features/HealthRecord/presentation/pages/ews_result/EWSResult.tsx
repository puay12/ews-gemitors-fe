import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./ews_result.scss";
import { baseUrl } from "../../../../../core/config";
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
    const [data, setData] = useState<Score[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [openUpdt, setOpenUpdt] = useState(false);
    const [openScoreUpdt, setOpenScoreUpdt] = useState(false);

    const recordId = sessionStorage.getItem('recordId');
    const patientId = sessionStorage.getItem('patientId');
    const navigate = useNavigate();
    const scores = JSON.parse(sessionStorage.getItem('scores')!) ?? JSON.stringify('');

    useEffect(() => {
        if (scores != '') {
            setData([scores]);
        } else {
            axios.get(`${baseUrl}/patients/score/detail/${recordId}`)
                .then((res) => {
                    setData(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        setLoading(false);

        if((sessionStorage.getItem('isRecordUpdated') != '') &&
            (sessionStorage.getItem('isRecordUpdated') != null)) {
            setOpenUpdt(true);
            sessionStorage.setItem('isRecordUpdated', '');
        }
        if((sessionStorage.getItem('isScoreUpdated') != '') &&
            (sessionStorage.getItem('isScoreUpdated') != null)) {
            setOpenScoreUpdt(true);
            sessionStorage.setItem('isScoreUpdated', '');
        }
    }, []);

    const handleOnClick = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        
        axios.post(`${baseUrl}/patients/score/add`, {
            record_id: recordId,
            heart_score: data.map((obj) => {return obj.heart_score}).pop(),
            sys_score: data.map((obj) => {return obj.sys_score[0]}).pop(),
            dias_score: data.map((obj) => {return obj.dias_score[0]}).pop(),
            respiratory_score: data.map((obj) => {return obj.respiratory_score}).pop(),
            temp_score: data.map((obj) => {return obj.temp_score}).pop(),
            spo2_score: data.map((obj) => {return obj.spo2_score}).pop(),
            ews_score: data.map((obj) => {return obj.ews_score}).pop()
        })
            .then((res) => {
                setLoading(false);
                sessionStorage.setItem('scores', JSON.stringify(''));
                setOpen(true);
            })
            .catch((err) => console.log(err));
    }

    const handleEditScore = () => {
        navigate('/patient/ews/update');
    }

    const action = (
        <Link to={`/patient/records/${patientId}`}>
            <Button size="small" color="inherit" variant="outlined">
                Ok
            </Button>
        </Link>
    );

    return (
        <div className="p-3">
            <div className="ews-result">
                {scores != ''
                    ?   <div className="container d-flex align-items-center justify-content-end mt-3">
                            <button className="btn btn-primary" onClick={handleEditScore}>
                                    <i className='fa fa-pencil-square-o me-2'></i>
                                    Edit
                            </button>
                        </div>
                    :   <div></div>
                }
                <div className="d-flex flex-column align-items-center justify-content-center">
                    <div className="title">Skor EWS Paisen :</div>
                    <div className="score">
                        {loading 
                            ? <h1>...</h1>
                            : data.map((obj) => {return obj.ews_score})}
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
                            {loading 
                                ? '...'
                                : data.map((obj) => {return obj.heart_score})}
                        </div>
                        <div>
                        {loading 
                                ? '...'
                                : data.map((obj) => {return obj.respiratory_score})}
                        </div>
                        <div>
                        {loading 
                                ? '...'
                                : data.map((obj) => {return obj.spo2_score})}
                        </div>
                        <div>
                        {loading 
                                ? '...'
                                : data.map((obj) => {return obj.sys_score})}
                        </div>
                        <div>
                        {loading 
                                ? '...'
                                : data.map((obj) => {return obj.dias_score})}
                        </div>
                        <div>
                        {loading 
                                ? '...'
                                : data.map((obj) => {return obj.temp_score})}
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
                    {loading 
                                ? '...'
                                : data.map((obj) => {return obj.ews_score})}
                    </div>
                </div>
            </div>
            {scores != ''
                ?   <div className="button-wrap">
                        <div className="col-md-5">
                            <div className="btn custom-btn" onClick={handleOnClick}>
                                {loading ? '...' : 'Simpan Data'}
                            </div>
                        </div>
                    </div>
                :   <div className="mb-5"></div>
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
            <Snackbar
                open={openUpdt}
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
                Berhasil menambahkan tanda vital pasien dan menghitung skor EWS!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openScoreUpdt}
                anchorOrigin={{ 
                    vertical: 'top',
                    horizontal: 'center'
                }}
                autoHideDuration={3000}
                onClose={() => setOpenScoreUpdt(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                Berhasil mengupdate skor EWS!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default EWSResult