#include <DHT11.h>
DHT11 dht11(A0);


void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
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

  delay(2000);
  
}
