#include "Timer.h"
#include "Leds.h"

#define AM_SENDER 0x01 // AM ID 정의

module SenderC @safe()
{
  uses {
    interface Boot;
    interface SplitControl as RadioControl;
    interface AMSend;
    interface Receive;
    interface Timer<TMilli>;
    interface Leds;
  }
}
implementation
{
  message_t sendBuf;
  bool sendBusy = FALSE;

  event void Boot.booted() {
    call RadioControl.start();
  }

  event void RadioControl.startDone(error_t err) {
    if (err == SUCCESS) {
      call Timer.startPeriodic(5000); // 5초마다 송신
    }
  }

  event void Timer.fired() {
    if (!sendBusy) {
      sendBuf.data[0] = 100; // 송신할 데이터
      sendBusy = TRUE;
      call AMSend.send(AM_SENDER, &sendBuf, sizeof(sendBuf));
      call Leds.led0Toggle(); // LED0 토글
    }
  }

  event void AMSend.sendDone(message_t *msg, error_t err) {
    sendBusy = FALSE; // 송신 완료
  }

  event void Receive.receive(message_t *msg, void *payload, uint8_t len) {
    // 수신 처리 (필요 시 추가)
  }
}
