import sys
import tos
import struct

AM_OSCILLOSCOPE = 0x93

class OscilloscopeMsg:
    def __init__(self, packet=None):
        tos.Packet.__init__(self,
                            [('srcID', 'int', 2),
                             ('seqNo', 'int', 4),
                             ('type', 'int', 2),
                             ('Data0', 'int', 2),
                             ('Data1', 'int', 2),
                             ('Data2', 'int', 2),
                             ('Data3', 'int', 2),
                             ('Data4', 'int', 2)],
                            packet)

if '-h' in sys.argv:
    print("Usage:", sys.argv[0], "serial@/dev/ttyUSB5:57600")
    sys.exit()

am = tos.AM(serial_port='/dev/ttyUSB5')  # KMote가 연결된 USB5 포트를 지정

while True:
    p = am.read()
    if p:
        msg = OscilloscopeMsg(p.data)
        
        if msg.type == 2:
            battery = msg.Data3
            Illumi = int(msg.Data2)
            humi = -2.0468 + (0.0367 * msg.Data1) + (-1.5955 * 0.000001) * msg.Data1 * msg.Data1
            temp = -(39.6) + (msg.Data0 * 0.01)

            print("ID:", msg.srcID, 
                  "Count:", msg.seqNo, 
                  "Temperature:", temp, 
                  "Humidity:", humi, 
                  "Illumination:", Illumi, 
                  "Battery:", battery)
