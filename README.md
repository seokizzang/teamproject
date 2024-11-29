## 📟 사용된 센서 목록

1. **🌡️ Zigbee 온습도 센서**
   - 온도와 습도를 측정하며, Zigbee 통신을 통해 데이터를 전송하여 저전력으로 안정적인 연결을 제공합니다.

2. **💨 가스 센서 (MQ 시리즈)**
   - 일산화탄소(CO)와 메탄(CH₄) 등등을 감지하여 가스 누출 시 경고를 보낼 수 있습니다.

3. **👤 인체 감지 센서 (PIR 센서)**
   - 사람의 움직임을 감지하여 독거노인의 활동 상태를 모니터링하며, 일정 시간 동안 움직임이 없으면 비상 경고를 발생시킵니다.



---
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
