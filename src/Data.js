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

        axios.get('http://3.35.112.81:3001/data/tem-hum')
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
                <h2>온습도 데이터</h2>
                {temHumData.map((temHum) => (
                    <div key={temHum.User_id} style={dataItemStyle}>
                        <p><strong>번호:</strong> {temHum.id}</p>
                        <p><strong>온습도:</strong> {temHum.Tem_Hum_Data}</p>
                    </div>
                ))}
            </div>
    
            {/* 이동 데이터 카드 */}
            <div style={cardStyle}>
                <h2>이동 데이터</h2>
                {moveData.map((move) => (
                    <div key={move.User_id} style={dataItemStyle}>
                        <p><strong>번호:</strong> {move.User_id}</p>
                        <p><strong>인체감지:</strong> {move.Move_Data}</p>
                    </div>
                ))}
            </div>
    
            {/* 가스 검출 데이터 카드 */}
            <div style={cardStyle}>
                <h2>가스 검출</h2>
                {gasData.map((gas) => (
                    <div key={gas.User_id} style={dataItemStyle}>
                        <p><strong>번호:</strong> {gas.User_id}</p>
                        <p><strong>가스:</strong> {gas.Gas_Data}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DataPage;
