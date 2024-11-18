import sys
import tos
import datetime
import threading
import requests, json
import time
import mysql.connector
from mysql.connector import Error

AM_OSCILLOSCOPE = 0x93

class OscilloscopeMsg(tos.Packet):
    def __init__(self, packet=None):
        tos.Packet.__init__(self,
                            [('srcID', 'int', 2),
                             ('seqNo', 'int', 4),
                             ('type', 'int', 2),
                             ('Data0', 'int', 2),
                             ('Data1', 'int', 2),
                             ('Data2', 'int', 2),
                             ('Data3', 'int', 2),
                             ('Data4', 'int', 2),
                             ],
                            packet)

# MySQL connect
def connect_mysql():
    try:
        # MySQL 
        connection = mysql.connector.connect(
            host='119.197.155.172',        # MySQL url
            database='zigbee_db',  # databse name
            user='zigbee_user',             # MySQL userName
            password='1234'  # MySQL pw
        )
        if connection.is_connected():
            print("MySQL connect success!")
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None


def insert_data(connection, tem_data, hum_data):
    try:
        cursor = connection.cursor()
        insert_query = """INSERT INTO Sensor_Data (user_id, tem_data, hum_data, move_data, gas_data)
                          VALUES (%s, %s, %s, %s, %s)"""
                          
        user_id = '1'
        move_data = 0
        gas_data = 0
        cursor.execute(insert_query, (user_id, tem_data, hum_data, move_data, gas_data))
        connection.commit()
        print(f"Data inserted: Temp: {tem_data}, Humi: {hum_data}, Move: {move_data}, Gas: {gas_data}")
    except Error as e:
        print(f"Error while inserting data: {e}")


if '-h' in sys.argv:
    print("Usage:", sys.argv[0], "serial@/dev/ttyUSB0:57600")
    sys.exit()

am = tos.AM()

# MySQL connect
connection = connect_mysql()
if connection is None:
    print("MySQL connect failed. Close the program.")
    sys.exit()

while True:
    p = am.read()

    if p is None:
        print("No data received.")
        continue

    try:
        msg = OscilloscopeMsg(p.data)
        print(p)  

        ####### THL Logic ############
        if msg.type == 2:
            battery = msg.Data3
            Illumi = int(msg.Data2)
            humi = -2.0468 + (0.0367 * msg.Data1) + (-1.5955 * 0.000001) * msg.Data1 * msg.Data1
            temp = -(39.6) + (msg.Data0 * 0.01)
            print("id:", msg.srcID, "Count:", msg.seqNo, "Temperature:", temp,
                  "Humidity:", humi, "Illumination:", Illumi, "Battery:", battery)

            # MySQL
            insert_data(connection, temp, humi)

    except Exception as e:
        print("Error processing message:", e)


connection.close()
