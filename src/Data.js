import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataPage() {
    const [user_id, setUser_id] = useState([]);
    const [temHumData, setTemHumData] = useState([]);
    const [moveData, setMoveData] = useState([]);
    const [gasData, setGasData] = useState([]);

    //css
    const cardStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '300px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };
    
    const dataItemStyle = {
        marginBottom: '12px',
        borderBottom: '1px solid #eee',
        paddingBottom: '8px',
    };    


    useEffect(() => {
        axios.get('http://3.35.112.81:3001/data/user_id')
            .then((response) => setUser_id(response.data))
            .catch((error) => console.error(error));

        axios.get('http://3.35.112.81:3001/data/tem')
            .then((response) => setTemHumData(response.data))
            .catch((error) => console.error(error));

        axios.get('http://3.35.112.81:3001/data/hum')
            .then((response) => setTemHumData(response.data))
            .catch((error) => console.error(error));

        axios.get('http://3.35.112.81:3001/data/move')
            .then((response) => setMoveData(response.data))
            .catch((error) => console.error(error));

        axios.get('http://3.35.112.81:3001/data/gas')
            .then((response) => setGasData(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* 온습도 데이터 카드 */}
            <div style={cardStyle}>
                <h2>온도 데이터</h2>
                {temHumData.map((tem) => (
                    <div key={tem.User_id} style={dataItemStyle}>
                        <p><strong>번호:</strong> {tem.user_id}</p>
                        <p><strong>온습도:</strong> {tem.tem_data}</p>
                    </div>
                ))}
            </div>
            {/* 습도 데이터 카드 */}
            <div style={cardStyle}>
                <h2>습도 데이터</h2>
                {temHumData.map((hum) => (
                    <div key={hum.user_id} style={dataItemStyle}>
                        <p><strong>번호:</strong> {hum.user_id}</p>
                        <p><strong>온습도:</strong> {hum.hum_data}</p>
                    </div>
                ))}
            </div>
            {/* 이동 데이터 카드 */}
            <div style={cardStyle}>
                <h2>이동 데이터</h2>
                {moveData.map((move) => (
                    <div key={move.user_id} style={dataItemStyle}>
                        <p><strong>번호:</strong> {move.user_id}</p>
                        <p><strong>인체감지:</strong> {move.move_data}</p>
                    </div>
                ))}
            </div>
    
            {/* 가스 검출 데이터 카드 */}
            <div style={cardStyle}>
                <h2>가스 검출</h2>
                {gasData.map((gas) => (
                    <div key={gas.user_id} style={dataItemStyle}>
                        <p><strong>번호:</strong> {gas.user_id}</p>
                        <p><strong>가스:</strong> {gas.gas_data}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default DataPage;
