import { ChangeEventHandler, FormEvent, useState } from "react";
import axios from 'axios';
import "./add_update_data.scss";

import Form from 'react-bootstrap/Form';
import { baseUrl } from "../../../../../core/config";
import { Alert, Snackbar, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const AddUpdateData = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        phone: ''
    });

    const handleInput = (e:any) => {
        setData({...data, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${baseUrl}/patients/add`, data)
            .then((res) => {
                setOpen(true);
                setLoading(false);
                sessionStorage.setItem('patientId', res.data.patient_id);
            })
            .catch((err) => console.log(err));
    }

    const action = (
        <Link to={'/patient/records/add'}>
            <Button size="small" color="inherit" variant="outlined">
                Lanjut
            </Button>
        </Link>
    );

    return (
        <div className="add_update_data">
            <div className="title">Tambah Data Pasien</div>
            <Form 
                onSubmit={handleSubmit}
            >
                <div className="mt-4 row align-items-start justify-content-between">
                    <div className="col-md-6 pe-5">
                        <Form.Group className="mb-4" controlId="name">
                            <Form.Label className="label">Nama Pasien</Form.Label>
                            <Form.Control type="text" placeholder="Jumiati" name="name" onChange={handleInput}/>
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
                            <Form.Control type="number" placeholder="50" name="age" onChange={handleInput}/>
                        </Form.Group>
                    </div>
                    <div className="col-md-6 pe-5">
                    <Form.Group className="mb-4" controlId="height">
                            <Form.Label className="label">Tinggi Badan</Form.Label>
                            <Form.Control type="number" name="height" onChange={handleInput} step=".01" placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="weight">
                            <Form.Label className="label">Berat Badan</Form.Label>
                            <Form.Control type="number" name="weight" onChange={handleInput} placeholder="Gunakan tanda titik untuk menandakan bilangan desimal" />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="phone">
                            <Form.Label className="label">Nomor Telepon</Form.Label>
                            <Form.Control type="number" name="phone" onChange={handleInput} placeholder="08xxxxxxxxxx"/>
                        </Form.Group>
                    </div>
                </div>
                {loading
                    ?   <Button className="btn btn-success mt-4">
                            ...
                        </Button>
                    :   <Button type="submit" className="btn btn-success mt-4">
                            Submit
                        </Button>
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
                Berhasil menambahkan data pasien!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AddUpdateData