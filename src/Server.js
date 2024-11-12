import express from 'express';
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: 'database1.chy2co2ssp0n.ap-northeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'admin1111',
  database: 'database1'
});

db.connect((err) => {
  if (err) throw err;
  console.log('연동 성공');
});
app.post('/login', (req, res) => {
  const { user_id, password } = req.body;
  const sql = 'SELECT * FROM Customer_Data WHERE User_id = ? AND password = ?';
  db.query(sql, [user_id, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: '성공' });
    } else {
      res.json({ success: false, message: '실패' });
    }
  });
});
app.get('/data/user_id', (req, res) =>{
  const sql = "SELECT User_id FROM Sensor_Data ORDER BY User_id DESC LIMIT 1"
  db.query(sql, (err, results) => {
    if(err) throw err;
    res.json(results);
  });
});
app.get('/data/tem-hum', (req, res) => {
  const sql = "SELECT Tem_Hum_Data FROM Sensor_Data ORDER BY User_id DESC LIMIT 1";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/data/move', (req, res) => {
  const sql = "SELECT Move_Data FROM Sensor_Data ORDER BY User_id DESC LIMIT 1";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
app.get('/data/gas', (req, res) => {
  const sql = "SELECT Gas_Data FROM Sensor_Data ORDER BY User_id DESC LIMIT 1";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`백엔드 파일 실행중 포트 : ${PORT}`);
});
