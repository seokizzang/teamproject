#define RX_SIZE 6

module SendSerialC @safe()
{
    uses interface Boot;
    uses interface Leds;
    uses interface Timer<TMilli> as Timer0;
    uses interface Serial as SerialPort;  // 시리얼 포트 인터페이스 추가
}

implementation
{
    typedef nx_struct beacon {
        nx_uint16_t id;
        nx_uint16_t seqNo;
        nx_uint16_t buf[RX_SIZE];
    } beacon_t;

    message_t sendMsg;
    beacon_t *beacon;
    uint8_t rxBuf[RX_SIZE];

    event void Boot.booted(){
        call Leds.led0Toggle();  // 부팅 시 LED0 토글

        beacon = (beacon_t *)call AMSend.getPayload(&sendMsg, sizeof(beacon_t));
        beacon->id = TOS_NODE_ID;  // 노드 ID 설정
        beacon->seqNo = 0;  // 초기 시퀀스 번호 설정
        call Timer0.startPeriodic(5000);  // 5초마다 타이머 이벤트 발생
    }

    task void sendTask() {
        call Leds.led1Toggle();  // 송신 시작 시 LED1 토글
        beacon->seqNo++;  // 시퀀스 번호 증가
        memcpy(&beacon->buf, rxBuf, RX_SIZE);  // rxBuf의 데이터를 beacon 구조체에 복사

        // 시리얼 포트를 통해 데이터 송신
        call SerialPort.send(&sendMsg, sizeof(beacon_t));  // 시리얼 포트로 송신

        call Leds.led2Toggle();  // 송신 완료 시 LED2 토글
    }

    event void Timer0.fired() {
        post sendTask();  // 주기적으로 송신 작업을 트리거
    }

    event void SerialPort.sendDone(message_t *msg, error_t error) {
        // 시리얼 송신 완료 시 호출
        call Leds.led2Toggle();  // 송신 완료 시 LED2 토글
    }
}
