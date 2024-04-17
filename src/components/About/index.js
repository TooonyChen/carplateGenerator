import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './About.css';

function About() {
    const navigate  = useNavigate ();

    const handleGoToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="about-container">
            <button className="home-button" onClick={handleGoToLogin}>主頁</button>
            <h1>關於澳門車輛入境車牌生成</h1>
            <p>
                歡迎來到澳門車輛入境車牌生成系統。本系統專為澳門車輛在入境中國大陸時，提供對應的車牌號碼生成服務。
            </p>
            <p>
                我們的目標是為澳門車主提供一個快速、準確的車牌生成工具，以便在過境或進入中國大陸時使用。本系統依據最新的車牌規則和要求，確保生成的車牌號碼符合中國大陸的標準和規定。
            </p>
            <p>
                若您有任何疑問或需要進一步的幫助，請透過我們的聯絡方式與我們聯繫。感謝您的使用與支持！
            </p>
        </div>
    );
}

export default About;
