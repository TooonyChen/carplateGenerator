import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const usernamePattern = "^[a-zA-Z0-9]+$";
    const passwordPattern = "^[a-zA-Z0-9-=+_.?!/@#$%^&*]+$";

    const handleRegistration = async (event) => {
        event.preventDefault();  // Prevent the default form submission

        try {
            const response = await fetch('https://your-backend-url/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (data.success) {
                alert("Registration Successful!");
                navigate('/generate');  // Redirect to '/generate' page
            } else {
                // If backend returns an error or unsuccessful registration
                alert("Registration failed, please check the network connection.");
            }
        } catch (error) {
            // Handle errors if the fetch fails
            console.error('Registration error:', error);
            alert("Registration failed, please check the network connection.");
        }
    };

    return (
        <div className="register-page-base">
            <section className="register-section">
                <h1 className="register-title">註冊</h1>
                <form className="register-form" onSubmit={handleRegistration}>
                    <div className="register-buttons">
                        <input type="text" placeholder="Username" className="register-input"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                               pattern={usernamePattern} title="Username can only contain letters and numbers." required/>
                        <input type="password" placeholder="Password" className="register-input"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               pattern={passwordPattern}
                               title="Password may contain letters, numbers, and -=+_.?!/@#$%^&* characters." required/>
                        <button type="submit" className="register-button">提交</button>
                    </div>
                    <div className="footer">
                        已經有帳號？ <a className="footer-link" href="/login">點這裡登錄</a>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Register;
