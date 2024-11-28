import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DataPage() {
    const [temData, setTemData] = useState([]); 
    const [humData, setHumData] = useState([]); 
    const [moveData, setMoveData] = useState([]); 
    const [gasData, setGasData] = useState([]); 

    useEffect(() => {
        axios.get('http://3.35.112.81:3001/data/tem')
            .then((response) => setTemData(response.data))
            .catch((error) => console.error(error));

        axios.get('http://3.35.112.81:3001/data/hum')
            .then((response) => setHumData(response.data))
            .catch((error) => console.error(error));

        axios.get('http://3.35.112.81:3001/data/move')
            .then((response) => setMoveData(response.data))
            .catch((error) => console.error(error));

        axios.get('http://3.35.112.81:3001/data/gas')
            .then((response) => setGasData(response.data))
            .catch((error) => console.error(error));
    }, []);

    const temHumChartData = {
        labels: temData.map((item) => `ID: ${item.user_id}`), 
        datasets: [
            {
                label: 'Temperature',
                data: temData.map((item) => item.tem_data),
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
            },
            {
                label: 'Humidity',
                data: humData.map((item) => item.hum_data),
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                fill: true,
            },
        ],
    };

    const moveChartData = {
        labels: moveData.map((item) => `ID: ${item.user_id}`), 
        datasets: [
            {
                label: 'Movement Data',
                data: moveData.map((item) => item.move_data),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const gasChartData = {
        labels: gasData.map((item) => `ID: ${item.user_id}`), 
        datasets: [
            {
                label: 'Gas Detection',
                data: gasData.map((item) => item.gas_data),
                borderColor: 'rgba(255, 206, 86, 1)',
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                fill: true,
            },
        ],
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>데이터 출력</h1>
            <div style={{ marginBottom: '40px' }}>
                <h2>온습도 데이터</h2>
                <Line data={temHumChartData} />
            </div>
            <div style={{ marginBottom: '40px' }}>
                <h2>인체 감지 데이터</h2>
                <Line data={moveChartData} />
            </div>
            <div style={{ marginBottom: '40px' }}>
                <h2>가스 검출 데이터</h2>
                <Line data={gasChartData} />
            </div>
        </div>
    );
}

export default DataPage;
