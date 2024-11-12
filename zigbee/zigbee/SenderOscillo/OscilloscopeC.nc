#include "Timer.h"
#include "Oscilloscope.h"

module OscilloscopeC @safe()
{
          uses {
              interface Boot;
              interface SplitControl as RadioControl;
              interface AMSend;
              interface Receive;
              interface Timer<TMilli>;
              interface Read<uint16_t>;
              interface Leds;
            }
}
implementation{
  message_t sendBuf;
  bool sendBusy;

  oscilloscope_t local;

  uint8_t reading;

  bool suppressCountChange;

  void report_problem() { call Leds.led0Toggle(); }
  void report_sent() { call Leds.led1Toggle(); }
  void report_received() { call Leds.led2Toggle(); }

  event void Boot.booted() {
          local.interval = DEFAULT_INTERVAL;
          local.id = TOS_NODE_ID;
          if (call RadioControl.start() != SUCCESS)
              report_problem();
  }


  void startTimer() {
       call Timer.startPeriodic(local.interval);
       reading = 0;
  }

  event void RadioControl.startDone(error_t error) {
       startTimer();
  }

  event void RadioControl.stopDone(error_t error) {
  }

  event message_t* Receive.receive(message_t* msg, void* payload, uint8_t len) {
     oscilloscope_t *omsg = payload;

     report_received();

     if (omsg->version > local.version){
             local.version = omsg->version;
             local.interval = omsg->interval;
             startTimer();
     }
     if (omsg->count > local.count){
             local.count = omsg->count;
             suppressCountChange = TRUE;
     }
     return msg;
  }

  event void Timer.fired() {
          if (reading == NREADINGS)
          {
                  if (!sendBusy && sizeof local <= call AMSend.maxPayloadLength())
                  {
                          memcpy(call AMSend.getPayload(&sendBuf, sizeof(local)), &local, sizeof local);
                          if (call AMSend.send(AM_BROADCAST_ADDR, &sendBuf, sizeof local) == SUCCESS)
                                  sendBusy = TRUE;
                  }
                  if (!sendBusy)
                          report_problem();
                  reading = 0;
                  if (!suppressCountChange)
                          local.count++;
                  suppressCountChange = FALSE;
          }
          if (call Read.read() != SUCCESS)
                  report_problem();
  }

  event void AMSend.sendDone(message_t* msg, error_t error) {
    if (error == SUCCESS)
      report_sent();
    else
      report_problem();

    sendBusy = FALSE;
  }

  event void Read.readDone(error_t result, uint16_t data) {
    if (result != SUCCESS)
      {
	data = 0xffff;
	report_problem();
      }
    if (reading < NREADINGS) 
      local.readings[reading++] = data;
  }

}
