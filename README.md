## 📟 사용된 센서 목록

1. **🌡️ Zigbee 온습도 센서**
   - 온도와 습도를 측정하며, Zigbee 통신을 통해 데이터를 전송하여 저전력으로 안정적인 연결을 제공합니다.

2. **💨 가스 센서 (MQ 시리즈)**
   - 일산화탄소(CO)와 메탄(CH₄) 등등을 감지하여 가스 누출 시 경고를 보낼 수 있습니다.

3. **👤 인체 감지 센서 (PIR 센서)**
   - 사람의 움직임을 감지하여 독거노인의 활동 상태를 모니터링하며, 일정 시간 동안 움직임이 없으면 비상 경고를 발생시킵니다.

## 기술 스택
- 프론트엔드: React
- 데이터베이스: MySQL
- 서버: AWS
- 통신 모듈: Zigbee 

---
## H/W
**1. Zigbee 온습도 데이터 송수신 시스템**

kmote 모듈을 활용하여 온습도 센서 데이터를 Zigbee와 시리얼 통신을 활용하여 송수신하고, Raspberry Pi와 연결하여 MySQL에 데이터를 저장하는 구조입니다.
- 송신측 : TinyOS기반의 kmote 모듈을 통해 온습도 데이터를 0.25초 간격으로 수집하고, Zigbee로 브로드캐스트 송신.
- 수신측: kmote 모듈을 통해 송신된 데이터를 수신하고, 시리얼 포트를 통해 Raspberry Pi로 전송.
- Raspberry Pi는 수신된 데이터를 Python으로 처리하여 MySQL에 자동 저장.
이 시스템은 Zigbee 통신과 TinyOS를 활용하여 저전력 및 효율적인 데이터 송수신을 구현하며, MySQL 데이터베이스를 통해 온습도 데이터를 안정적으로 관리합니다.

**2. 아두이노 기반 가스 및 움직임 감지 시스템**

Raspberry Pi와 연결된 아두이노에 가스 센서(MQ-5)와 움직임 감지 센서(PIR 센서)가 장착되어, 각 센서 데이터를 수집하고 MySQL에 자동으로 저장합니다.
- 가스 센서: MQ 시리즈를 활용하여 일산화탄소(CO) 및 메탄(CH₄) 가스를 감지하고, 3초 간격으로 Raspberry Pi에 전송.
-  움직임 감지 센서: PIR 센서를 통해 사람의 움직임을 감지하고, 1초 간격으로 Raspberry Pi에 전송.
-  Raspberry Pi는 아두이노에서 수신된 데이터를 Python으로 처리하여 MySQL에 자동 저장.
 
각 센서는 특정 간격(가스 3초, 움직임 1초)에 따라 데이터를 송신하며, 이를 MySQL에 기록하여 실시간으로 모니터링하고 이상 상황에 대한 경고 시스템을 제공합니다.

![image](https://github.com/user-attachments/assets/25cb074f-6945-4103-8486-d88b38ffc09b)


**ERD**
- 1:1 관계인 구조로 UserID를 PK로 이용하여 센서데이터를 수집한다.
  
![image](https://github.com/user-attachments/assets/37832aa2-7107-4fc2-a66d-3f5f3b1cdec4)

---
**Architecture**
- 프로젝트 설계도

![image](https://github.com/user-attachments/assets/31a61277-5b48-4e87-b40d-243e28ef2749)



---
**DashBoard**
- 대쉬보드에서 간단하게 데이터를 확인하여 이상현상이 발생하는지 확인할 수 있습니다. 
  
![image](https://github.com/user-attachments/assets/284e4f22-0a25-4316-8858-7c86429e541d)



---
**Data Chart**
- 일정 기간동안의 변화를 확인 하여 이상현상을 확실히 판단할 수 있습니다. 
![image](https://github.com/user-attachments/assets/ef5b3335-e3a0-4b99-aebe-07dc29805bdf)
