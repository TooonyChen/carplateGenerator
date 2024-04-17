import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './plateGenerate.css';

const PlateGenerateInput = () => {
    const [carPlate, setCarPlate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://your-backend-url/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ macauCarPlate: carPlate })
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

    const handleReturn = (e) => {
        e.preventDefault();
        navigate('/login');
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
