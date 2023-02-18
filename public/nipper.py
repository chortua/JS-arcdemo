import requests
import warnings
import time

warnings.filterwarnings('ignore', message='Unverified HTTPS request')
ipport = "http://192.168.128.182:8081" #192.168.128.182 for windows server

def otto_battery():
    # here is the battery level on OTTO's unit
    response_battery = requests.get(url="https://192.168.128.40/api/fleet/v2/robots/batteries/?fields=percentage,robot&limit=100&ordering=id", verify=False)
    response_battery.raise_for_status()
    token_data = response_battery.json()
    o_battery = []
    o_battery.append((token_data['results'][0]['percentage']) * 100)  # OTTO 1500
    o_battery.append((token_data['results'][1]['percentage']) * 100)  # OTTO 100
    return( o_battery)

kardex_right = "f93ba577-75c8-4d13-9a4d-94b0bbc96857"
kardex_left = "76db5835-bf5a-4cd0-b14d-b838bd8f23eb"
A_place = "ea4cb1cb-a22b-4215-9973-61fd69167737"
B_place = "e2261cb9-ca8d-4791-9bcd-b206708f435d" # not being used 100
C_place = "a91dc8c2-f104-48d5-b107-faa72f5dd7aa" # not being used 100
parking2_pl = "703e61e3-f86a-4ef5-8b58-47f581358059" # # not being used 100
Supply_pl = "c9031fbe-50f0-440c-a567-a620ee91b2ee" # not being used
parkingbykardexid = "8785e6e3-4137-4d8e-927c-9e6fe49276c5"
parkingshowid = "e3788992-894d-4b6b-baf1-1757df360c16"
parking_wp_place = "bc3a9ae2-78ff-48a3-afb0-e83164961349" # use this with keypad

ottoserver = "https://192.168.128.40"

kardextoA = {
  "id": 11111,
  "jsonrpc": "2.0",
  "method": "createMission",
  "params": {
    "mission": {
      "description": "OTTO > kardex > pointA > kardex > parking.",
      "finalized": "true"
    },
    "tasks": [
      {
        "description": "Move to Kardex loading section",
        "place": kardex_right,
        "task_type": "MOVE"
      },
      {
        "description": "Pickup red cart",
        "payload": "64f6677e-d971-4aed-9a1f-994fd4f74d58",
        "place": kardex_right,
        "task_type": "LOAD"
      },
      {
        "description": "Transport cart to point A",
        "payload": "64f6677e-d971-4aed-9a1f-994fd4f74d58",
        "place": A_place,
        "task_type": "TRANSPORT"
      },
      {
        "description": "Drop the red card at point A",
        "payload": "64f6677e-d971-4aed-9a1f-994fd4f74d58",
        "place": A_place,
        "task_type": "UNLOAD"
      },
    ]
  }
}

def gotoMPX100():
    requests.post("https://192.168.128.40/api/fleet/v2/operations/post", json=kardextoA, verify=False)
