import axios from '../../config/https';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

export default function Watchlist() {
    const user = useSelector((state) => state.authenticate.user);

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

    const [watchlist, setWatchlist] = useState([]);

    const getWatchlist = async () => {
        try {
            const response = await axios.get('watchlist', { user: user.id });
            setWatchlist(response.data.data.watchlist);
        } catch (error) {
            createToastMessage("error", error?.response?.data?.message ?? error.message);
        }
    }

    useEffect(() => {
        getWatchlist();
    }, []);

    const shortName = (text, length) => {
        if (text.length > length) return (text.substring(0, length) + '...');
        else return text;
    }

    const removeFromWatchlist = async (e) => {
        const movie_id = e.target.id;
        try {
            const response = await axios.delete('watchlist', {
                data: { user: user.id, movie: movie_id }
            });
            createToastMessage(response.data.status ? "successful" : "error", response.data.message);
            await getWatchlist();
        } catch (error) {
            console.log(error);
            createToastMessage("error", error?.response?.data?.message ?? error.message);
        }
    }

    return (
        <div className='container'>
            <br />

            <div className='row justify-content-center'>
                {watchlist && watchlist.map((value, key) => {
                    return <div className='col-3 card' key={key}>
                        <img src={value.image_url} className="card-mg-top" alt={value.name} />
                        <div className='card-img-overlay d-flex justify-content-end'>
                            <div style={{ width: "2.5rem" }}>
                                <h5 className='card-title' style={{ backgroundColor: "white", color: "#8c1543", textAlign: "center" }}>{value.imdb}</h5>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-10'>
                                    <h5 className='card-title'>{shortName(value.name, 18)}</h5>
                                    <p className='card-text'>{shortName(value.genre, 25)}</p>
                                </div>
                                <div className='col-2' style={{ zIndex: "999999" }}>
                                    <button id={value.id} onClick={removeFromWatchlist} className='btn btn-error' style={{ border: "1px solid red", color: "red", borderRadius: "0" }}>-</button>
                                </div>
                            </div>
                        </div>
                    </div>;
                })}
            </div>

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