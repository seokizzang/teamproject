configuration SenderAppC { }
implementation
{
  components SenderC, MainC, ActiveMessageC, LedsC,
    new TimerMilliC() as Timer, 
    new AMSenderC(AM_SENDER), new AMReceiverC(AM_SENDER);

  SenderC.Boot -> MainC;
  SenderC.RadioControl -> ActiveMessageC;
  SenderC.AMSend -> AMSenderC;
  SenderC.Receive -> AMReceiverC;
  SenderC.Timer -> Timer;
  SenderC.Leds -> LedsC;
}
