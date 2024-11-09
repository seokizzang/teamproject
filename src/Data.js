import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataPage() {
    const [User_id, setUser_id] = useState([])
    const [Tem_Hum_Data, setTemHumData] = useState([]);
    const [Move_Data, setMoveData] = useState([]);
    const [Gas_Data, setGasData] = useState([]);

    useEffect(() => {
        axios.get('3.35.112.81:3001/data/user_id')
            .then((response) => setUser_id(response.data))
            .catch((error) => console.error(error));
        axios.get('3.35.112.81:3001/data/tem-hum')
            .then((response) => setTemHumData(response.data))
            .catch((error) => console.error(error));
        axios.get('3.35.112.81:3001/data/move')
            .then((response) => setMoveData(response.data))
            .catch((error) => console.error(error));
        axios.get('3.35.112.81:3001/data/gas')
            .then((response) => setGasData(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h2>온습도 데이터</h2>
            <table>
                <thead>
                    <tr key={data.User_id}>
                        <th>번호</th>
                        <th>온습도</th>
                    </tr>
                </thead>
                <tbody>
                    {Tem_Hum_Data.map((data) => (
                        <tr key={data.User_id}>
                            <td>{data.id}</td>
                            <td>{data.Tem_Hum_Data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Move_Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>인체감지</th>
                    </tr>
                </thead>
                <tbody>
                    {Move_Data.map((data) => (
                        <tr key={data.User_id}>
                            <td>{data.User_id}</td>
                            <td>{data.Move_Data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Gas_Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>가스</th>
                    </tr>
                </thead>
                <tbody>
                    {Gas_Data.map((data) => (
                        <tr key={data.User_id}>
                            <td>{data.User_id}</td>
                            <td>{data.Gas_Data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataPage;
