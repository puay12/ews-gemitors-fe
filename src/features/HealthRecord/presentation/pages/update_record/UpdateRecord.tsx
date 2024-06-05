import { useEffect, useState } from "react";
import axios from 'axios';
import "./update_record.scss";

import { Form, Button as BSButton } from 'react-bootstrap';
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl, baseUrlEWS } from "../../../../../core/config";
import { Alert, Snackbar, Button } from "@mui/material";

export const UpdateRecord = () => {
    const patientId = sessionStorage.getItem("patientId");
    const recordId = sessionStorage.getItem("recordId");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState({
        patient_id: patientId!,
        heart_rate: '',
        systolic_blood_pressure: '',
        diastolic_blood_pressure: '',
        respiratory_rate: '',
        temperature: '',
        spo2: ''
    });
    const [data, setData] = useState({
        patient_id: patientId!,
        heart_rate: '',
        systolic_blood_pressure: '',
        diastolic_blood_pressure: '',
        respiratory_rate: '',
        temperature: '',
        spo2: ''
    });

    useEffect(() => {
        getRecord();
    });

    const handleInput = (e:any) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        setLoading(true);
        checkInput();
        handleDeleteScore(e);
    };

    function checkInput() {
        if(data.heart_rate == '') {
            data.heart_rate = initialData.heart_rate;
        }
        if(data.systolic_blood_pressure == '') {
            data.systolic_blood_pressure = initialData.systolic_blood_pressure;
        }
        if(data.diastolic_blood_pressure == '') {
            data.diastolic_blood_pressure = initialData.diastolic_blood_pressure;
        }
        if(data.respiratory_rate == '') {
            data.respiratory_rate = initialData.respiratory_rate;
        }
        if(data.temperature == '') {
            data.temperature = initialData.temperature;
        }
        if(data.spo2 == '') {
            data.spo2 = initialData.spo2;
        }
    }

    async function handleDeleteScore(e:any) {
        axios.delete(`${baseUrl}/patients/score/delete/${recordId}`)
            .then((res) => {
                axios.put(`${baseUrl}/patients/vsign/update/${recordId}`, data)
                    .then((res) => {
                        handleCalculateEWS(e);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }

    async function handleCalculateEWS(e:any) {
        e.preventDefault();
        
        axios.post(`${baseUrlEWS}/getEWSScore`, {
            heart_rate: data.heart_rate,
            systolic_blood_pressure: data.systolic_blood_pressure,
            diastolic_blood_pressure: data.diastolic_blood_pressure,
            respiratory_rate: data.respiratory_rate,
            temperature: data.temperature,
            spo2: data.spo2
        }).then((res) => {
                sessionStorage.setItem('scores', JSON.stringify(res.data['data']));
                sessionStorage.setItem('isRecordUpdated', 'true');
                setLoading(false);
                navigate('/patient/ews/result');
            })
            .catch((err) => console.log(err));
    };

    function getRecord() {
        axios.get(`${baseUrl}/patients/vsign/${recordId}`)
            .then((res) => {
                setInitialData(res.data);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="update_record">
            <div className="title">Update Tanda Vital</div>
            <Form onSubmit={handleSubmit}>
                <div className="mt-4 row align-items-start justify-content-between">
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="heart_rate">
                            <Form.Label className="label">Detak Jantung</Form.Label>
                            <Form.Control type="number" step="0.01" name="heart_rate" onChange={handleInput} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" 
                            defaultValue={initialData.heart_rate}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="respiratory_rate">
                            <Form.Label className="label">Laju Pernapasan</Form.Label>
                            <Form.Control name="respiratory_rate" type="number" step="0.01" 
                            onChange={handleInput} defaultValue={initialData.respiratory_rate}
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal"/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="systolic_blood_pressure">
                            <Form.Label className="label">Tekanan Darah Sistolik</Form.Label>
                            <Form.Control type="number" step="0.01" name="systolic_blood_pressure" 
                            onChange={handleInput} defaultValue={initialData.systolic_blood_pressure} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                    </div>
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="diastolic_blood_pressure">
                            <Form.Label className="label">Tekanan Darah Diastolik</Form.Label>
                            <Form.Control type="number" step="0.01" name="diastolic_blood_pressure" 
                            onChange={handleInput} defaultValue={initialData.diastolic_blood_pressure} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="spo2">
                            <Form.Label className="label">Saturasi Oksigen</Form.Label>
                            <Form.Control type="number" step="0.01" name="spo2" 
                            onChange={handleInput} defaultValue={initialData.spo2} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="temperature">
                            <Form.Label className="label">Suhu Tubuh</Form.Label>
                            <Form.Control type="number" step="0.01" name="temperature" 
                            onChange={handleInput} defaultValue={initialData.temperature} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
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
        </div>
    )
}

export default UpdateRecord