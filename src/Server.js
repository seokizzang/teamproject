const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: 'IP주소',
  user: '유저ID',
  password: '유저PW',
  database: 'DB이름'
});

db.connect((err) => {
  if (err) throw err;
  console.log('연동 성공');
});
app.post('/login', (req, res) => {
  const { user_id, password } = req.body;
  const sql = 'SELECT * FROM Customer_Data WHERE user_id = ? AND password = ?';
  db.query(sql, [user_id, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: '성공' });
    } else {
      res.json({ success: false, message: '실패' });
    }
  });
});
app.get('/data/tem', (req, res) =>{
  const sql = "SELECT tem_data FROM Sensor_Data ORDER BY user_id"
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});
app.get('/data/tem', (req, res) => {
  const sql = "SELECT hum_data FROM Sensor_Data ORDER BY user_id";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/data/move', (req, res) => {
  const sql = "SELECT move_data FROM Sensor_Data ORDER BY user_id";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/data/gas', (req, res) => {
  const sql = "SELECT gas_data FROM Sensor_Data ORDER BY user_id";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`백엔드 파일 실행중 포트 : ${PORT}`);
});
