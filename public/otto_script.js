document.getElementById("fifteen_parking_mpx").style.transform = "translateX(150mm) translateY(50mm) rotate(0.25turn)";
document.getElementById("fifteen_parking_kardex").style.transform = "translateX(28mm) translateY(165mm) ";
document.getElementById("drop_100_A").style.transform = "translateX(18mm) translateY(6mm) ";
document.getElementById("drop_100_B").style.transform = "translateX(48mm) translateY(6mm) ";
document.getElementById("drop_100_C").style.transform = "translateX(78mm) translateY(6mm) ";
document.getElementById("drop_100_A").innerHTML = "<h1>A</h1>";

function reply_click(clicked_id){
    console.log(clicked_id)
}

kardex_right = "f93ba577-75c8-4d13-9a4d-94b0bbc96857"
kardex_left = "76db5835-bf5a-4cd0-b14d-b838bd8f23eb"
A_place = "ea4cb1cb-a22b-4215-9973-61fd69167737"
B_place = "e2261cb9-ca8d-4791-9bcd-b206708f435d"
C_place = "a91dc8c2-f104-48d5-b107-faa72f5dd7aa"
parking2_pl = "703e61e3-f86a-4ef5-8b58-47f581358059" 
Supply_pl = "c9031fbe-50f0-440c-a567-a620ee91b2ee" 
parkingbykardexid = "8785e6e3-4137-4d8e-927c-9e6fe49276c5"
parkingshowid = "e3788992-894d-4b6b-baf1-1757df360c16"
parking_wp_place = "bc3a9ae2-78ff-48a3-afb0-e83164961349" 


async function pick_up_at_kardex() {
  console.log("Hello, you are in crete mission")
    let url = "https://192.168.128.40/api/fleet/v2/operations/post"
    const api_otto_mission = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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

        })
    })
    const data_missions = await api_otto_mission.json()
    console.log(data_missions);
}

async function pick_up_at_A() {
  console.log("Hello, you are in crete mission")
    let url = "https://192.168.128.40/api/fleet/v2/operations/post"
    const api_otto_mission = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": 11112,
          "jsonrpc": "2.0",
          "method": "createMission",
          "params": {
            "mission": {
              "description": "More Red cart from point A to kardex",
              "finalized": "true"
            },
            "tasks": [
              {
                "description": "Move to point A",
                "place": A_place,
                "task_type": "MOVE"
              },
              {
                "description": "Pickup a payload",
                "payload": "64f6677e-d971-4aed-9a1f-994fd4f74d58",
                "place": A_place,
                "task_type": "LOAD"
              },
              {
                "description": "Move red cart to kardex",
                "payload": "64f6677e-d971-4aed-9a1f-994fd4f74d58",
                "place": kardex_right,
                "task_type": "TRANSPORT"
              },
              {
                "description": "Drop off red cart at kardex",
                "payload": "64f6677e-d971-4aed-9a1f-994fd4f74d58",
                "place": kardex_right,
                "task_type": "UNLOAD"
        },
      ]
    }

        })
    })
    const data_missions = await api_otto_mission.json()
    console.log(data_missions);
}

async function get_battery() {
  let url_info = `https://192.168.128.40/api/fleet/v2/robots/batteries/?fields=percentage,robot&limit=100&ordering=id`
  const get_otto_battery = await fetch(url_info)
  const battery_otto_percentage = await get_otto_battery.json()
  console.log(battery_otto_percentage);
}