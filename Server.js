const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '비번',
  database: 'Customer_data'
});

db.connect((err) => {
  if (err) throw err;
  console.log('연동 성공');
});
app.post('/login', (req, res) => {
  const { user_id, password } = req.body;
  const sql = 'SELECT * FROM users WHERE User_id = ? AND password = ?';
  db.query(sql, [user_id, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: '성공' });
    } else {
      res.json({ success: false, message: '실패' });
    }
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`백엔드 파일 실행중 포트 : ${PORT}`);
});
