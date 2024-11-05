import serial
import mysql.connector
import time

#아두이노와 연결된 시리얼 포트설정
#serial_port = '/dev/ttyACM0' 리눅스 기준
serial_port = 'COM4'  #윈도우는 COMn
baud_rate = 9600

#아두이노와 연결
ser = serial.Serial(serial_port, baud_rate)

#아두이노에서 데이터를 읽어서 출력하는 함수
def read_sensor_data():
    while True:
        if ser.in_waiting > 0:  # 시리얼 버퍼에 데이터가 있으면
            data = ser.readline().decode('utf-8').strip()  # 데이터 한 줄 읽고, 디코딩
            #print(f"수신 데이터: {data}")
            #print()

            # 데이터 처리 예시 (파싱)
            if 'temperature:' in data and 'humidity:' in data:
                # 온도 및 습도 데이터 처리
                temp_index = data.find('temperature:') + len('temperature: ')
                humi_index = data.find('humidity:') + len('humidity: ')
                temperature = int(float(data[temp_index-1:data.find(' ', temp_index)]))
                humidity = float(data[humi_index:])
                print(f"온도: {temperature}°C, 습도: {humidity}%")

            elif 'PIR,' in data:
                # PIR 센서 데이터 처리
                pir_status = data.split(',')[1].strip()
                print(f"PIR 센서 상태: {pir_status}")

            elif 'Gas_Value:' in data:
                # 가스 센서 데이터 처리
                gas_value = int(data.split(':')[1].strip())
                print(f"가스 센서 값: {gas_value}")

        time.sleep(1)  # 1초마다 반복
        print()

# 함수 실행
if __name__ == '__main__':
    try:
        print("시리얼 데이터 읽기 시작...")
        read_sensor_data()  # 데이터 읽기 시작
    except KeyboardInterrupt:
        print("프로그램 종료")
    finally:
        ser.close()  # 시리얼 포트 닫기





