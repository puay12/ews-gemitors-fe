import { useEffect, useState } from "react";
import "./update_score.scss";

import { Form, Button as BSButton } from 'react-bootstrap';
import { useNavigate} from "react-router-dom";

export const UpdateScore = () => {
    const scores = JSON.parse(sessionStorage.getItem('scores')!) ?? JSON.stringify('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        heart_score: '',
        sys_score: '',
        dias_score: '',
        respiratory_score: '',
        temp_score: '',
        spo2_score: '',
        ews_score: ''
    });

    const handleInput = (e:any) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        setLoading(true);
        checkInput();
        sessionStorage.setItem("scores", JSON.stringify(data));
        sessionStorage.setItem("isScoreUpdated", "true");
        setLoading(false);
        navigate('/patient/ews/result');
    };

    function updateTotalScore() {
        var result = parseInt(data.dias_score) + parseInt(data.heart_score) + 
                        parseInt(data.respiratory_score) + parseInt(data.spo2_score) + 
                        parseInt(data.sys_score) + parseInt(data.temp_score)
        data.ews_score = result.toString()
    }

    function checkInput() {
        if(data.heart_score == '') {
            data.heart_score = scores.heart_score;
        }
        if(data.sys_score == '') {
            data.sys_score = scores.sys_score;
        }
        if(data.dias_score == '') {
            data.dias_score = scores.dias_score;
        }
        if(data.respiratory_score == '') {
            data.respiratory_score = scores.respiratory_score;
        }
        if(data.temp_score == '') {
            data.temp_score = scores.temp_score;
        }
        if(data.spo2_score == '') {
            data.spo2_score = scores.spo2_score;
        }
        updateTotalScore()
    }

    return (
        <div className="update_score">
            <div className="title">Update Skor EWS</div>
            <Form onSubmit={handleSubmit}>
                <div className="mt-4 row align-items-start justify-content-between">
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="heart_score">
                            <Form.Label className="label">Skor Detak Jantung</Form.Label>
                            <Form.Control type="number" step="0.01" name="heart_score" onChange={handleInput} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" 
                            defaultValue={scores.heart_score}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="respiratory_score">
                            <Form.Label className="label">Skor Laju Pernapasan</Form.Label>
                            <Form.Control name="respiratory_score" type="number" step="0.01" 
                            onChange={handleInput} defaultValue={scores.respiratory_score}
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal"/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="sys_score">
                            <Form.Label className="label">Skor Tekanan Darah Sistolik</Form.Label>
                            <Form.Control type="number" step="0.01" name="sys_score" 
                            onChange={handleInput} defaultValue={scores.sys_score} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                    </div>
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="dias_score">
                            <Form.Label className="label">Skor Tekanan Darah Diastolik</Form.Label>
                            <Form.Control type="number" step="0.01" name="dias_score" 
                            onChange={handleInput} defaultValue={scores.dias_score} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="spo2_score">
                            <Form.Label className="label">Skor Saturasi Oksigen</Form.Label>
                            <Form.Control type="number" step="0.01" name="spo2_score" 
                            onChange={handleInput} defaultValue={scores.spo2_score} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="temp_score">
                            <Form.Label className="label">Skor Suhu Tubuh</Form.Label>
                            <Form.Control type="number" step="0.01" name="temp_score" 
                            onChange={handleInput} defaultValue={scores.temp_score} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                    </div>
                </div>
                {loading
                    ?   <BSButton className="btn btn-success mt-4">
                            ...
                        </BSButton>
                    :   <BSButton type="submit" className="btn btn-success mt-4">
                            Submit
                        </BSButton>
                }
            </Form>
        </div>
    )
}

export default UpdateScore