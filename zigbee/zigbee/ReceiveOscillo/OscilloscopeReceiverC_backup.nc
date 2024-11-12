#include "Oscilloscope.h"

module OscilloscopeReceiverC @safe() {
    uses {
        interface Boot;
        interface SplitControl as RadioControl;
        interface Receive;
        interface Leds;
    }
}

implementation {
    oscilloscope_t local;

    void report_problem() { call Leds.led0Toggle(); }
    void report_received() { call Leds.led2Toggle(); }

    event void Boot.booted() {
        if (call RadioControl.start() != SUCCESS)
            report_problem();
    }

    event void RadioControl.startDone(error_t error) {
        if (error != SUCCESS)
            report_problem();
    }

    event void RadioControl.stopDone(error_t error) {
        // Empty, no action needed for stopping.
    }

    event message_t* Receive.receive(message_t* msg, void* payload, uint8_t len) {
        oscilloscope_t *omsg = payload;

        report_received();  // 수신 시 LED2 토글

        if (omsg->version > local.version) {
            local.version = omsg->version;
            local.interval = omsg->interval;
        }
        if (omsg->count > local.count) {
            local.count = omsg->count;
        }
        return msg;
    }
}
