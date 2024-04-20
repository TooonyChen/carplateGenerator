import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './plateGenerate.css';
import { useUser } from '../UserContext'; // 引入 useUser

const PlateGenerateInput = () => {
    const [carPlate, setCarPlate] = useState('');
    const navigate = useNavigate();
    const { user } = useUser(); // 使用 user 对象

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.isLogin) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.isLogin) {
                user(storedUser); // Set the user context from local storage
            } else {
                alert('Unauthorized access!');
                navigate('/login'); // Redirect to login if no user info is found
                return;
            }
        }
        try {
            const response = await fetch('http://localhost:8080/api/v1/user/carplate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user.username, macauCarPlate: carPlate })
            });
            const data = await response.json();

            if (response.ok) {
                navigate(`/pdf`, { state: { chinaCarPlate: data.chinaCarPlate } });
            } else {
                alert("Error retrieving China car plate.");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Network error, try again later.");
        }
    };

    const handleReturn = () => {
        navigate('/login'); // 导航回登录页面
    };

    return (
        <div className="plateGenerate-page-base">
            <div className="content-container">
                <section className="plateGenerate-section">
                    <h1 className="plateGenerate-title">澳門車輛入境車牌生成</h1>
                    <form className="plateGenerate-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="请输入你的澳门车牌"
                               className="plateGenerate-input"
                               value={carPlate}
                               onChange={e => setCarPlate(e.target.value)}
                               pattern="^[A-Za-z]{2}\d{4}$" required/>
                        <button type="submit" className="plateGenerate-button">提交</button>
                    </form>
                    <button onClick={handleReturn} className="plateGenerate-button">返回主頁</button>
                </section>
            </div>
        </div>
    );
};

export default PlateGenerateInput;
