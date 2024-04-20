import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const usernamePattern = "^[a-zA-Z0-9]+$";
    const passwordPattern = "^[a-zA-Z0-9-=+_.?!/@#$%^&*]+$";

    const handleRegistration = async (event) => {

        event.preventDefault();  // Prevent the default form submission

        // Construct the user data in the required JSON format
        const userData = {
            name: name,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            console.log("HTTP Status Code:", response.status); // 打印状态码
            const data = await response.json();
            console.log("Response from server:", data); // 打印从服务器返回的数据

            if (data.success) {
                // Redirect to login page if registration is successful
                navigate('/login');
            } else {
                // Show error message if registration failed
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
                               value={name}
                               onChange={(e) => setName(e.target.value)}
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
