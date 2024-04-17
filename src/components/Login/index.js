import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the form from being submitted in the traditional way

        // API call to the backend for validation
        try {
            const response = await fetch('https://your-backend-url/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            // Check the response from the backend
            if (data.success) {
                // If login is successful, navigate to the '/generate' page
                navigate('/generate');
            } else {
                // If login failed, handle it here (e.g., show an error message)
                alert('Login failed!');
            }
        } catch (error) {
            // Handle errors if the fetch fails
            console.error('Login error:', error);
            alert('Login error!');
        }
    };

    return (
        <div className="login-page-base">
            <section className="login-section">
                <h1 className="login-title">澳門車輛入境車牌生成</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-buttons">
                        <input
                            type="text"
                            placeholder="Username"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="login-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="login-button">登錄</button>
                    </div>
                    <a href="/about"><button type="button" className="about-button" >關於</button></a>
                    <div className="footer">
                        沒有帳號？ <a className="footer-link" href="/register"> 點這裡註冊 </a>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;
