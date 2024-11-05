int pirPin = 2;

void setup() {
  // put your setup code here, to run once:
  pinMode(pirPin, INPUT);   //센서받은거 입력으로 받기
  pinMode(LED_BUILTIN, OUTPUT);  //내장 LED를 출력 모드로 설정
  Serial.begin(9600);       
}

void loop() {
  // put your main code here, to run repeatedly:
  int sensorValue = digitalRead(pirPin);  //센서의 상태를 읽음

  if(sensorValue == HIGH) {  
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.println("인체감지 완료");
  }else{
    digitalWrite(LED_BUILTIN, LOW); //LED끄기
  }
  delay(1000);  //반복 지연
}
