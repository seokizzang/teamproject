configuration TestAppC{}
implementation
{
    components TestC, MainC, LedsC;

    MainC.Boot <- TestC;
    TestC.Leds -> LedsC;

    components PlatformSerialC;
    TestC.SerialControl -> PlatformSerialC;
    TestC.UartByte -> PlatformSerialC;
    TestC.UartStream -> PlatformSerialC;

    components ActiveMessageC, new AMSenderC(0x94);
    TestC.RadioControl -> ActiveMessageC;
    TestC.AMSend -> AMSenderC;
}

