configuration OscilloscopeReceiverAppC { }
implementation {
    components OscilloscopeReceiverC, MainC, ActiveMessageC, LedsC, new AMReceiverC(AM_OSCILLOSCOPE);

    OscilloscopeReceiverC.Boot -> MainC;
    OscilloscopeReceiverC.RadioControl -> ActiveMessageC;
    OscilloscopeReceiverC.Receive -> AMReceiverC;
    OscilloscopeReceiverC.Leds -> LedsC;
}
