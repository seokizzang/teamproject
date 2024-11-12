#define RX_SIZE 6

module SendSerialC @safe()
{
    uses interface Boot;
    uses interface Leds;
    uses interface Timer<TMilli>as Timer0;
    uses interface SplitControl as RadioControl;
    uses interface AMSend;
}

implementation
{
    typedef nx_struct beacon{
        nx_uint16_t id;
        nx_uint16_t seqNo;
        nx_uint16_t buf[RX_SIZE];
    }beacon_t;

    message_t sendMsg;
    beacon_t *beacon;

    uint8_t rxBuf[RX_SIZE];

    event void Boot.booted(){
        call Leds.led0Toggle();  // 부팅 시 LED0 토글

        beacon = (beacon_t *)call AMSend.getPayload(&sendMsg, sizeof(beacon_t));
        beacon->id = TOS_NODE_ID;  // 노드 ID 설정
        beacon->seqNo = 0;  // 초기 시퀀스 번호 설정
        call RadioControl.start();  // 라디오 시작
    }

    task void sendTask() {
        call Leds.led1Toggle();  // 송신 시작 시 LED1 토글
        beacon->seqNo++;  // 시퀀스 번호 증가
        memcpy(&beacon->buf, rxBuf, RX_SIZE);  // rxBuf의 데이터를 beacon 구조체에 복사
	call Timer0.startPeriodic(1000);
        call AMSend.send(AM_BROADCAST_ADDR, &sendMsg, sizeof(beacon_t));  // 데이터 송신
    }

    event void Timer0.fired()
    {
        call Leds.led2Toggle();
    } 

    event void RadioControl.startDone(error_t error) {
        post sendTask();  // 송신 작업 시작
    }

    event void RadioControl.stopDone(error_t error) {
        // 라디오 정지 시 처리할 내용은 없음
    }

    event void AMSend.sendDone(message_t* msg, error_t error) {
        call Leds.led2Toggle();  // 송신 완료 시 LED2 토글
    }
}