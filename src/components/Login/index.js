import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // 引入 useUser

import './Login.css';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setUser } = useUser(); // 使用 setUser 函数

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: name, password })
            });

            const data = await response.json();
            if (data.success) {
                setUser({ isLogin: true, username: name }); // 设置用户登录状态和用户名
                localStorage.setItem('user', JSON.stringify({ isLogin: true, username: name }));
                navigate('/generate');
            } else {
                alert('Login failed!');
            }
        } catch (error) {
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
