configuration SendSerialAppC {}
implementation
{
    components SendSerialC, MainC, LedsC;
    components new TimerMilliC() as Timer0;

    MainC.Boot <- SendSerialC;
    SendSerialC.Timer0 -> Timer0;
    SendSerialC.Leds -> LedsC;

    components PlatformSerialC;

    components ActiveMessageC, new AMSenderC(0x94);
    SendSerialC.RadioControl -> ActiveMessageC;
    SendSerialC.AMSend -> AMSenderC;
}
