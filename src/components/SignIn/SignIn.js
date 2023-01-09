import axios from '../../config/https';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import { saveToLocalStorage } from '../Services/user';
import { log_in } from '../Store/Authenticate';

const initalCredentials = {
    email: '',
    password: ''
}

export default function SignIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createToastMessage = (state, message) => {
    
        const options = {
            autoClose: false
        }
    
        switch (state) {
            case 'successful':
                toast.success(message, options);
                break;
            case 'error':
                toast.error(message, options);
                break;
            default:
                break;
        }
    }

    const [credentials, setCredentials] = useState(initalCredentials);

    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setCredentials({
            ...credentials,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        toast.dismiss();
        try {
            const response = await axios.post('login', credentials);
            createToastMessage(response.data.status ? "successful" : "error", response.data.message);
            setCredentials(initalCredentials);
            setTimeout(() => {
                saveToLocalStorage(response.data.token);
                dispatch(log_in(response.data.user));
                navigate("/");
            }, 2000)
        } catch (error) {
            createToastMessage("error", error?.response?.data?.message ?? error.message);
        }
    }

    return (
        <div>
            <input type="text" name="email" value={credentials.email} onChange={handleChange} /><br />
            <input type="text" name="password" value={credentials.password} onChange={handleChange} /><br />
            <button onClick={handleSubmit} >Giriş Yap</button>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </div>
    );
}