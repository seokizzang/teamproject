require('dotenv').config();
const mysql = require('mysql2/promise');

// AWS RDS 연결 설정
//npm install dotenv 다운로드 필요
const dbConfig = {
  host: awsData.env.DB_HOST,
  user: awsData.env.DB_USER,
  password: awsData.env.DB_PASSWORD,
  database: awsData.env.DB_NAME
};

// 최신 데이터 값을 가져오는 함수
async function getSensorData() {
  let connection;

  try {
    // 데이터베이스 연결
    connection = await mysql.createConnection(dbConfig);

    // 최신 index 값 조회 쿼리
    const [rows] = await connection.execute(
      `SELECT * FROM your_table_name ORDER BY index DESC LIMIT 1` //가장 최근 데이터값들을 가져옴 (움직임, 가스, 온습도)
    );

    if (rows.length > 0) {
      console.log("value:", rows); //가져오는데 성공했을 시 나오는 값
      const dataSet = [rows[0].data1, rows[0].data2, rows[0].data3] //각 테이블 이름으로 data1,2,3으로 저장될것으로 예상됨
      return dataSet;
    } else {
      console.log("No data"); //데이터 테이블이 비어있음.
      return null;
    }
  } catch (error) {
    console.error("Database query error:", error); //쿼리문제
  } finally {
    if (connection) {
      await connection.end(); // 연결 해제
    }
  }
}

// 주기적으로 최신 index 값 호출
setInterval(getSensorData, 1000); //1초
