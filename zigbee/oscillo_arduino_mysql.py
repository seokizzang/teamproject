import sys
import tos
import datetime
import threading
import requests, json
import time
import mysql.connector
import serial
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
                             ('Data4', 'int', 2)],
                            packet)


# MySQL Section
def connect_mysql():
    try:
        connection = mysql.connector.connect(
            host='119.197.155.172',  # MySQL URL
            database='zigbee_db',    # Database name
            user='zigbee_user',      # MySQL username
            password='1234'          # MySQL password
        )
        if connection.is_connected():
            print("MySQL connected successfully!")
            return connection
    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
        return None


def insert_data(connection, tem_data, hum_data, gas_data, move_data=None):
    if move_data == None:
        move_data = 0
    try:
        # Check if the connection is still active
        if not connection.is_connected():
            print("MySQL connection lost. Reconnecting...")
            connection = connect_mysql()
            if connection is None:
                print("Failed to reconnect to MySQL. Skipping data insertion.")
                return

        cursor = connection.cursor()
        insert_query = """INSERT INTO Sensor_Data (user_id, tem_data, hum_data, gas_data, move_data)
                          VALUES (%s, %s, %s, %s, %s)"""
        user_id = '1'
        cursor.execute(insert_query, (user_id, tem_data, hum_data, gas_data, move_data))
        connection.commit()
        print(f"Data inserted: Temp={tem_data}, Humi={hum_data}, Gas={gas_data}, Move={move_data}")
    except Error as e:
        print(f"Error while inserting data: {e}")
    finally:
        cursor.close()  # Ensure the cursor is closed to prevent resource leaks.


# Periodic MySQL Saving
def save_to_mysql():
    global temp_data, humi_data, gas_data, pir_data
    print(f"temp{temp_data}, humi{humi_data}, gas{gas_data}")
    if temp_data is not None and humi_data is not None and gas_data is not None:
        insert_data(connection, temp_data, humi_data, gas_data, move_data=pir_data)
        temp_data, humi_data, gas_data, pir_data = None, None, None, None

    # Repeat every 10 seconds
    threading.Timer(10, save_to_mysql).start()


# Arduino Section
def setup_serial(port, baudrate=9600):
    try:
        ser = serial.Serial(port, baudrate, timeout=1)
        print(f"Serial port {port} opened successfully.")
        return ser
    except serial.SerialException as e:
        print(f"Error opening serial port {port}: {e}")
        return None


def read_arduino_data(ser):
    try:
        if ser.in_waiting > 0:  # Check if data is available
            line = ser.readline().decode('utf-8').strip()
            print(f"Arduino Data: {line}")
            return line
    except Exception as e:
        print(f"Error reading from Arduino: {e}")
        return None


# Global Variables
global temp_data, humi_data, gas_data, pir_data
temp_data = None
humi_data = None
gas_data = None
pir_data = None


# Function to handle PIR detection
def handle_pir_data():
    global pir_data
    while True:
        if pir_data:
            print(f"PIR Detection: {pir_data}")
            # Here you can implement specific logic when PIR data is detected
            #pir_data = 0  # Store "Detected" or other values as needed
        time.sleep(1)  # To avoid busy waiting


# Function to handle gas value
def handle_gas_data():
    global gas_data
    while True:
        if gas_data is not None:
            print(f"Gas Value: {gas_data}")
            # Here you can implement logic for processing gas data
            #gas_data = None
        time.sleep(1)  # To avoid busy waiting


if '-h' in sys.argv:
    print("Usage:", sys.argv[0], "serial@/dev/ttyUSB0:112500")
    sys.exit()

# Start saving to MySQL periodically
save_to_mysql()

# Setup TinyOS and Arduino serial
am = tos.AM()
arduino_serial = setup_serial("/dev/ttyACM0", 9600)  # Update to the correct port if using Windows

# MySQL Connection
connection = connect_mysql()
if connection is None:
    print("MySQL connection failed. Exiting program.")
    sys.exit()

# Start PIR and GAS handling threads
threading.Thread(target=handle_pir_data, daemon=True).start()
threading.Thread(target=handle_gas_data, daemon=True).start()

while True:
    # TinyOS data processing
    p = am.read()
    if p is None:
        print("No data received from TinyOS.")
        continue

    try:
        msg = OscilloscopeMsg(p.data)
        #print("TinyOS Data:", p)

        if msg.type == 2:
            battery = msg.Data3
            Illumi = int(msg.Data2)
            humi = -2.0468 + (0.0367 * msg.Data1) + (-1.5955 * 0.000001) * msg.Data1 ** 2
            temp = -(39.6) + (msg.Data0 * 0.01)
            #print(f"ID={msg.srcID}, SeqNo={msg.seqNo}, Temp={temp}, Humi={humi}, Illumi={Illumi}, Battery={battery}")

            # Save parsed TinyOS data
            temp_data = temp
            humi_data = humi

    except Exception as e:
        print("Error processing TinyOS message:", e)

    # Arduino data processing
    if arduino_serial:
        arduino_data = read_arduino_data(arduino_serial)
        if arduino_data:
            # Check if the data is gas data or PIR data
            if arduino_data.startswith("Gas_Value:"):
                gas_value = int(arduino_data.split(":")[1].strip())
                gas_data = gas_value
            elif arduino_data == "PIR,Detection complete":
                pir_data = 1  # Store "Detected" or other values as needed

# Close MySQL connection when done
connection.close()
