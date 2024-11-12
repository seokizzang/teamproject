import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DataPage() {
    const [user_id, setUser_id] = useState([]);
    const [temHumData, setTemHumData] = useState([]);
    const [moveData, setMoveData] = useState([]);
    const [gasData, setGasData] = useState([]);

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
        <div>
            <h2>온습도 데이터</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>온습도</th>
                    </tr>
                </thead>
                <tbody>
                    {temHumData.map((temHum) => (
                        <tr key={temHum.User_id}>
                            <td>{temHum.id}</td>
                            <td>{temHum.Tem_Hum_Data}</td>
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
                    {moveData.map((move) => (
                        <tr key={move.User_id}>
                            <td>{move.User_id}</td>
                            <td>{move.Move_Data}</td>
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
                    {gasData.map((gas) => (
                        <tr key={gas.User_id}>
                            <td>{gas.User_id}</td>
                            <td>{gas.Gas_Data}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataPage;
