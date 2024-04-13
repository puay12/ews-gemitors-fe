import { useState } from "react";
import axios from 'axios';
import "./add_update_record.scss";

import { Form, Button as BSButton } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { baseUrl, baseUrlEWS } from "../../../../../core/config";
import { Alert, Snackbar, Button } from "@mui/material";

type EWSScore = {
    heart_score: string
    sys_score: string
    dias_score: string
    respiratory_score: string
    temp_score: string
    spo2_score: string
    ews_score: string
}

export const AddUpdateRecord = () => {
    const patientId = sessionStorage.getItem("patientId");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        patient_id: patientId!,
        heart_rate: '',
        systolic_blood_pressure: '',
        diastolic_blood_pressure: '',
        respiratory_rate: '',
        temperature: '',
        spo2: ''
    });

    const handleInput = (e:any) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${baseUrl}/patients/vsign/add`, data)
            .then((res) => {
                sessionStorage.setItem('recordId', res.data.record_id);
                handleCalculateEWS(e);
            })
            .catch((err) => console.log(err));
    };

    async function handleCalculateEWS(e:any) {
        e.preventDefault();
        setLoading(true);

        axios.post(`${baseUrlEWS}/getEWSScore`, {
            heart_rate: data.heart_rate,
            systolic_blood_pressure: data.systolic_blood_pressure,
            diastolic_blood_pressure: data.diastolic_blood_pressure,
            respiratory_rate: data.respiratory_rate,
            temperature: data.temperature,
            spo2: data.spo2
        }).then((res) => {
                sessionStorage.setItem('scores', JSON.stringify(res.data['data']));
                setOpen(true);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    };

    const action = (
        <Link to='/patient/ews/result'>
            <Button size="small" color="inherit" variant="outlined">
                Lihat Skor
            </Button>
        </Link>
    );

    return (
        <div className="add_update_record">
            <div className="title">Tambah Tanda Vital Baru</div>
            <Form onSubmit={handleSubmit}>
                <div className="mt-4 row align-items-start justify-content-between">
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="heart_rate">
                            <Form.Label className="label">Detak Jantung</Form.Label>
                            <Form.Control type="number" step="0.01" name="heart_rate" onChange={handleInput} placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="respiratory_rate">
                            <Form.Label className="label">Laju Pernapasan</Form.Label>
                            <Form.Control type="number" step="0.01" name="respiratory_rate" onChange={handleInput} placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="systolic_blood_pressure">
                            <Form.Label className="label">Tekanan Darah Sistolik</Form.Label>
                            <Form.Control type="number" step="0.01" name="systolic_blood_pressure" onChange={handleInput} placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                    </div>
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="diastolic_blood_pressure">
                            <Form.Label className="label">Tekanan Darah Diastolik</Form.Label>
                            <Form.Control type="number" step="0.01" name="diastolic_blood_pressure" onChange={handleInput} placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="spo2">
                            <Form.Label className="label">Saturasi Oksigen</Form.Label>
                            <Form.Control type="number" step="0.01" name="spo2" onChange={handleInput} placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="temperature">
                            <Form.Label className="label">Suhu Tubuh</Form.Label>
                            <Form.Control type="number" step="0.01" name="temperature" onChange={handleInput} placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                    </div>
                </div>
                {loading
                    ?   <BSButton className="btn btn-success mt-4">
                            ...
                        </BSButton>
                    :   <BSButton type="submit" className="btn btn-success mt-4">
                            Submit dan Hitung EWS
                        </BSButton>
                }
            </Form>

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
                Berhasil menambahkan tanda vital pasien dan menghitung skor EWS!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddUpdateRecord