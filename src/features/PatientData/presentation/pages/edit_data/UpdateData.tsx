import { useEffect, useState } from "react";
import axios from 'axios';
import "./update_data.scss";

import { Form, Button as BsButton} from 'react-bootstrap';
import { baseUrl } from "../../../../../core/config";
import { useNavigate } from "react-router-dom";

export const UpdateData = () => {
    const patientId = sessionStorage.getItem('patientId');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState({
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        phone: ''
    });
    const [data, setData] = useState({
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        phone: ''
    });

    useEffect(() => {
        getPatient();
    });

    const handleInput = (e:any) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        checkInput();
        
        axios.put(`${baseUrl}/patients/update/${patientId}`, data)
            .then((res) => {
                setLoading(false);
                sessionStorage.setItem('patientId', '');
                sessionStorage.setItem('isPatientUpdated', 'true');
                navigate('/');
            })
            .catch((err) => console.log(err));
    }

    function getPatient() {
        axios.get(`${baseUrl}/patients/${patientId}`)
            .then((res) => {
                setInitialData(res.data);
            })
            .catch((err) => console.log(err));
    }

    function checkInput() {
        if(data.name == '') {
            data.name = initialData.name;
        }
        if(data.age == '') {
            data.age = initialData.age;
        }
        if(data.gender == '') {
            data.gender = initialData.gender;
        }
        if(data.height == '') {
            data.height = initialData.height;
        }
        if(data.weight == '') {
            data.weight = initialData.weight;
        }
        if(data.phone == '') {
            data.phone = initialData.phone;
        }
    }

    return (
        <div className="update_data">
            <div className="title">Update Data Pasien</div>
            <Form 
                onSubmit={handleSubmit}
                method="PUT"
            >
                <div className="mt-4 row align-items-start justify-content-between">
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="name">
                            <Form.Label className="label">Nama Pasien</Form.Label>
                            <Form.Control type="text" placeholder="Jumiati" 
                            name="name" onChange={handleInput} defaultValue={initialData.name}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="gender">
                            <Form.Label className="label">Jenis Kelamin</Form.Label>
                            <Form.Select aria-label="gender" name="gender" onChange={handleInput}>
                                <option>Pilih salah satu</option>
                                <option value="P">Perempuan</option>
                                <option value="L">Laki-Laki</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="age">
                            <Form.Label className="label">Usia</Form.Label>
                            <Form.Control type="number" placeholder="50" name="age" 
                            defaultValue={initialData.age} onChange={handleInput}/>
                        </Form.Group>
                    </div>
                    <div className="col-md-6 pe-5">
                    <Form.Group className="mb-4" controlId="height">
                            <Form.Label className="label">Tinggi Badan</Form.Label>
                            <Form.Control type="number" name="height" onChange={handleInput} step=".01" 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal"
                            defaultValue={initialData.height}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="weight">
                            <Form.Label className="label">Berat Badan</Form.Label>
                            <Form.Control type="number" name="weight" onChange={handleInput} 
                            placeholder="Gunakan tanda titik untuk menandakan bilangan desimal"
                            defaultValue={initialData.weight}/>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="phone">
                            <Form.Label className="label">Nomor Telepon</Form.Label>
                            <Form.Control type="number" name="phone" onChange={handleInput} 
                            placeholder="08xxxxxxxxxx" defaultValue={initialData.phone} />
                        </Form.Group>
                    </div>
                </div>
                {loading
                    ?   <BsButton className="btn btn-success mt-4">
                            ...
                        </BsButton>
                    :   <BsButton type="submit" className="btn btn-success mt-4">
                            Submit
                        </BsButton>
                }
            </Form>
        </div>
    )
}

export default UpdateData