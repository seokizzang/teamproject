//BreadBoard를 이용해서 센서 여러개 연결
//빨간선(+) = VCC(전압) , 파란선(-) = GND(접지)
#include <DHT11.h>
DHT11 dht11(A0);

int pirPin = 2;     //pir센서 출력값 D2

void setup() {
  // put your setup code here, to run once:
  pinMode(pirPin, INPUT);         //pir센서출력 입력으로 받음
  pinMode(LED_BUILTIN, OUTPUT);   //내장 LED를 출력 모드로 설정
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  DHT_Sensor();
  pir_Sensor();
  delay(2000);
}

void DHT_Sensor(){
  float temp, humi;

  int result = dht11.read(humi, temp);

  if(result == 0){
    Serial.print("temperature:");
    Serial.print(temp);//온도값
    Serial.print(" humidity: ");
    Serial.println(humi);//습도값
  }else{
    Serial.println();
    Serial.print("Error No : ");
    Serial.print(result);
    Serial.println();
  }

  //delay(2000);
}

void pir_Sensor(){
  int sensorValue = digitalRead(pirPin);

  if(sensorValue == HIGH){
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("인체감지");
  }else{
    digitalWrite(LED_BUILTIN, LOW);  //LED끄기
  }
  //delay(1000);  //반복지연
}
