import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { log_out } from '../Store/Authenticate';
import './Header.css';

export default function Header() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(log_out());
        navigate("/signin");
    }

    return (
        <div className='headerStyle'>
            <div className='headerContainerDiv'>
                <ul className="menu-bar">
                    <Link style={{ textDecoration: 'none' }} to="/"><li>Tüm Filmler</li></Link>
                    <Link style={{ textDecoration: 'none' }} to="/watchlist"><li>İzleme Listesi</li></Link>
                    <Link style={{ textDecoration: 'none' }} onClick={handleClick} to="/"><li>Çıkış Yap</li></Link>
                </ul>
            </div>
        </div>
    );
}