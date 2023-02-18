'use strict';


let ip_address = "localhost" /*"192.168.1.71";  ip of Server (localhost:)*/
let scale_project = "0.31";
let move_project_x = 130; /* + left, - right */
let move_project_y = 68;/* + up, - down*/ 
let counter_mission = 0;
let clicked_kara = "";
let clicked_made = "";
let color_boolean = 1;
let key = "";
let url = "";
let missions_data = []
let accepted_missions = [];
let rejectedmissions = [];
let to_array = [];
let from_array = [];
let i = 0;
let bar_progress = 1;
let number_of_missions = 0;

/* these are variable containing x and y */


let points_info = {
    coordinates: [
        /*Register new pickup or drop points here */
        { name: "0-A-Charger-HP", x: (-2.9), y: (0 - 0.5), action: "none" },
        { name: "0-PickUp1", x: -2.551, y: 8.287, action: "pickup" },
        { name: "0-PickUp2", x: 3.086, y: 8.218, action: "pickup" },
        { name: "0-PickUp3", x: 13.063, y: 6.594, action: "pickup" },
        /* Drops of emtpy carts */
        { name: "0-CargoDrop-1", x: -0.115, y: 1.842, action: "drop" },
        { name: "0-CargoDrop-2", x: -0.115, y: 0.504, action: "drop" },
        { name: "0-CargoDrop-3", x: -0.115, y: -0.834, action: "drop" },
        { name: "0-CargoDrop-4", x: 1.071, y: 1.842, action: "drop" },
        { name: "0-CargoDrop-5", x: 1.071, y: 0.504, action: "drop" },
        { name: "0-CargoDrop-6", x: 1.071, y: -0.834, action: "drop" },
        { name: "0-CargoDrop-7", x: 2.257, y: 1.842, action: "drop" },
        { name: "0-CargoDrop-8", x: 2.257, y: 0.504, action: "drop" },
        { name: "0-CargoDrop-9", x: 2.257, y: -0.834, action: "drop" },
        /* Drop of carts with Eggs */
        { name: "0-Drop1",  x: -7.585, y: -4.925, action: "drop" },
        { name: "0-Drop2", x: -8.923, y: -4.925, action: "drop" },
        { name: "0-Drop3",x: -7.585, y: -6.111, action: "drop" },
        { name: "0-Drop4", x: -8.923, y: -6.111, action: "drop" },
        { name: "0-Drop5", x: -7.585, y: -7.304, action: "drop" },
        { name: "0-Drop6",x: -8.923, y: -7.299, action: "drop" },
        { name: "0-Drop7",x: -7.585, y: -8.481 , action: "drop" },
        { name: "0-Drop8", x: -8.923, y: -8.485, action: "drop" },
        { name: "0-Drop9",  x: -7.585, y: -9.666, action: "drop" },
        { name: "0-Drop_10", x: -8.923, y: -9.672, action: "drop" },
        /* Pick Up of Empty carts */
        { name: "0-CargoP-1", x: -2.008, y: -5.643, action: "pickupE" },
        { name: "0-CargoP-2", x: -0.608, y: -5.643, action: "pickupE" },
        { name: "0-CargoP-3", x: 0.792, y: -5.643, action: "pickupE" },
        { name: "0-CargoP-4", x: -2.008, y: -6.849, action: "pickupE" },
        { name: "0-CargoP-5", x: -0.608, y: -6.849, action: "pickupE" },
        { name: "0-CargoP-6", x: 0.792, y: -6.849, action: "pickupE" },
        { name: "0-CargoP-7", x: -2.008, y: -8.055, action: "pickupE" },
        { name: "0-CargoP-8", x: -0.608, y: -8.055, action: "pickupE" },
        { name: "0-CargoP-9", x: 0.792, y: -8.055, action: "pickupE" },
        {  name: "groupDrop1", x: 12.9, y: -6.7, action: "white"},
        {  name: "groupDrop2", x: 14.1, y: -6.7, action: "white"},
        {  name: "groupDrop3", x: 15.3, y: -6.7, action: "white"},
        {  name: "groupPick1", x: 9.5, y: -15.8, action: "white"},
        {  name: "groupPick2", x: 9.5, y: -16.97, action: "white"},
        {  name: "groupPick3", x: 9.5, y: -18.2, action: "white"},

    ]
};

let info = points_info.coordinates;
create_points(info)

/* will locate rectangular boxes on each node (drop, pick up, chargers)*/
function create_points(info) {
    for (let i = 0, len = info.length; i < len; i++) {
        document.getElementById(info[i].name).style.transform = "translateX(" + (((info[i]['x'] * scale_project) * 100) - move_project_x) + "px)translateY(" + (((info[i]['y'] * scale_project) * -100) - move_project_y) + "px) scale(" + scale_project + ")";
    }
}

/* if any drop station is clicked, it will send the informatio to create a ticket (oct/06/2022)*/
function reply_click(clicked_id) {

    if (counter_mission === 0) {
        document.getElementById("kara").innerHTML = clicked_id;
        document.getElementById(clicked_id).style.backgroundColor = "#da8a09";
        clicked_kara = clicked_id;
        counter_mission += 1;

    }
    else if (counter_mission === 1) {
        document.getElementById("made").innerHTML = clicked_id;
        document.getElementById(clicked_id).style.backgroundColor = "#44da09";
        clicked_made = clicked_id;
        counter_mission += 1;
    }
    else {
        
        counter_mission = 0;
        document.getElementById(clicked_kara).style.backgroundColor = "#d4dce4";
        document.getElementById("kara").innerHTML = "から"
        document.getElementById(clicked_made).style.backgroundColor = "#d4dce4";
        document.getElementById("made").innerHTML = "まで"
        document.getElementById("groupDrop1").style.backgroundColor = "white";
        document.getElementById("groupDrop2").style.backgroundColor = "white";
        document.getElementById("groupDrop3").style.backgroundColor = "white";
        document.getElementById("groupPick1").style.backgroundColor = "white";
        document.getElementById("groupPick2").style.backgroundColor = "white";
        document.getElementById("groupPick3").style.backgroundColor = "white";
    }
}



/* Create missions */
async function create_mission() {
    /* will get Information from home.ejs, get the start point and the destination of a mission. */
    const response = await fetch("http://" + ip_address + ":8081/wms/monitor/session/login?username=admin&pwd=123456");
    const data = await response.json();
    let url = `http://${ip_address}:8081/wms/rest/missions?&sessiontoken=${data["payload"]["sessiontoken"]}`
    /* Get and assign the from where is the mission to where is the mission */
    let from = document.getElementById("kara").innerHTML
    let to = document.getElementById("made").innerHTML
    const api_create_missions = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            missionrequest: {
                requestor: "Tomaru Japan",
                missiontype: "7",
                fromnode: from,
                tonode: to,
                cardinality: "1",
                priority: 2,
                parameters: {
                    value: { "payload": "Default payload" },
                    desc: "Mission extension",
                    type: "org.json.JSONObject",
                    name: "parameters"
                }
            }
        })

    })
    const data_missions = await api_create_missions.json()
    
    /*will check the status of mission creation, if succesful, it will show info on screen */
    if (data_missions["payload"]["acceptedmissions"] != "") {
        accepted_missions.unshift(data_missions["payload"]["acceptedmissions"])
        document.getElementById("mission_status").innerHTML = `<h4> &nbsp; &nbsp; から    &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;まで  <br></h4>`;
        document.getElementById("mission_status").innerHTML += `<h4>${from}&nbsp; &nbsp;  >>>  &nbsp; &nbsp; &nbsp;  ${to}<br></h4>`;
        document.getElementById(clicked_kara).style.backgroundColor = "#d4dce4";
        document.getElementById("kara").innerHTML = "から"
        document.getElementById(clicked_made).style.backgroundColor = "#d4dce4";
        document.getElementById("made").innerHTML = "まで"

    }
    track_missions();

}

async function insert_agv(action) {
    /* This function will extract or insert the vehicle from the ANT server */
    bar_progress = 1;
        var elem = document.getElementById("myBar");           
        var id = setInterval(frame, 50);
        function frame() {
            if (bar_progress <= 100) {             
            bar_progress++;
            elem.style.width = bar_progress + "%";       
            }
        }



    const response = await fetch("http://" + ip_address + ":8081/wms/monitor/session/login?username=admin&pwd=123456");
    const data = await response.json();
    let url = `http://${ip_address}:8081/wms/rest/vehicles/stoclin_tomaru/command?&sessiontoken=${data["payload"]["sessiontoken"]}`
    const api_extract = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                command: {
                    name: `${action}`,
                    args: {
                        nodeId: info[0].name
                    }
                }
            })/*JSON.stringify*/
        })
        
        const extract_info = await api_extract.json()
        if (extract_info["payload"]["vehicle"]["operatingstate"]){

        }
        if ( action == "extract"){

    
        }
        console.log(extract_info["payload"]["vehicle"]["operatingstate"], action)


}/* extract or insert the vehicle*/

 
var tomaru = new antApi();

function antApi() {
    track_stoclin()

    this.tocken = fetch("http://" + ip_address + ":8081/wms/monitor/session/login?username=admin&pwd=123456")
        .then((response) => response.json())
        .then((data) => { return data; });


    async function track_stoclin() {
        /* This function call an api to get location of AGV. With the coordinates of AGV, the program will plot the AGV on screen */
        const response = await fetch("http://" + ip_address + ":8081/wms/monitor/session/login?username=admin&pwd=123456");
        const data = await response.json();

        let key_coordinates = data["payload"]["sessiontoken"];
        let url_coordinates = "http://" + ip_address + ":8081/wms/rest/vehicles/stoclin_tomaru/info?&sessiontoken="
        url_coordinates += key_coordinates;
        const get_coordinates = await fetch(url_coordinates)
        const data_coordinates = await get_coordinates.json()
        const xyz_coordinates = data_coordinates["payload"]["vehicles"][0]["location"]["coord"];
        const is_stracted = data_coordinates["payload"]["vehicles"][0]["action"]["name"];
        let x_stoclin = xyz_coordinates[0];
        let y_stoclin = xyz_coordinates[1];
        let z_stoclin = data_coordinates["payload"]["vehicles"][0]["location"]["course"];

        /* Get the coordinates, and positions the stoclin at intervals on the screen 
        console.log(x_stoclin, y_stoclin, z_stoclin)*/
        if (is_stracted == "extracted"){
            document.getElementById("stoclin").style.transform = "translateX(-570px) translateY(-280px) scale(" + scale_project + ") rotate(0.25turn)";
        }
        else {
        document.getElementById("stoclin").style.transform = "translateX(" + ((((x_stoclin - 2) * scale_project) * 100) - move_project_x) + "px) translateY(" + ((((y_stoclin - 2.2) * scale_project) * -100) - move_project_x) + "px) scale(" + scale_project + ") rotate(" + z_stoclin * -0.1592356688 + "turn)";
        }
        track_missions()
        document.getElementById("mission_status").innerHTML = ""
        /*console.log(data_coordinates["payload"]["vehicles"][0]["location"]["course"], (z_stoclin * 0.1592356688));*/
    } setInterval(() => { track_stoclin() }, 2500);

    async function missions_info() {

        for (let i in missions_data)
            document.getElementById('mission_status').innerHTML = "<h1>" + missions_data[i] + "</h1>"


    }


}
async function track_missions() {
    /* This function will get informatiton on the missions,  */
    const response = await fetch("http://" + ip_address + ":8081/wms/monitor/session/login?username=admin&pwd=123456");
    const data = await response.json();
    let url_filter = `&dataorderby=%5B%5B%22navigationstate%22%2C%22asc%22%5D%5D`
    let url_coordinates = `http://${ip_address}:8081/wms/rest/missions?&sessiontoken=${data["payload"]["sessiontoken"]}${url_filter}`       
    const get_missions = await fetch(url_coordinates)
    const data_missions = await get_missions.json()
    

    for (let i = 0, len = data_missions["payload"]["missions"].length; i < len; i++){       
        if(data_missions["payload"]["missions"][i]["navigationstate"] == "1"){
            let from = data_missions["payload"]["missions"][i]["fromnode"];
            let to = data_missions["payload"]["missions"][i]["tonode"];
            let mision_id = data_missions["payload"]["missions"][i]["missionid"];
            document.getElementById("mission_status").innerHTML += `<h4>${from}&nbsp; &nbsp;  >>>  &nbsp; &nbsp; &nbsp;  ${to}<br></h4>`;
            
        }
    }
    for (let i = 0, len = data_missions["payload"]["missions"].length; i < len; i++){       
        if(data_missions["payload"]["missions"][i]["navigationstate"] == "3"){
            let from = data_missions["payload"]["missions"][i]["fromnode"];
            let to = data_missions["payload"]["missions"][i]["tonode"];
            console.log(from)
            document.getElementById(from).style.backgroundColor = "yellow";
            document.getElementById(to).style.backgroundColor = "yellow";
            
        }
    }
    
}

async function clearCargocarts() {
    /* will get Information from home.ejs, get the start point and the destination of a mission. */
    const response = await fetch("http://" + ip_address + ":8081/wms/monitor/session/login?username=admin&pwd=123456");
    const data = await response.json();
    let url = `http://${ip_address}:8081/wms/rest/missions?&sessiontoken=${data["payload"]["sessiontoken"]}`
    /* Get and assign the from where is the mission to where is the mission 
    let from = document.getElementById("kara").innerHTML
    let to = document.getElementById("made").innerHTML*/
    let drop_cargo = ["nothing","0-CargoDrop-3","0-CargoDrop-2","0-CargoDrop-1","0-CargoDrop-6","0-CargoDrop-5","0-CargoDrop-4","0-CargoDrop-9","0-CargoDrop-8","0-CargoDrop-7"]
    for (let i = 1, len = 10; i < len; i++){
        let from = `0-CargoP-${i}`
        let to = drop_cargo[i]
    const api_create_missions = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            missionrequest: {
                requestor: "Tomaru Japan",
                missiontype: "7",
                fromnode: from,
                tonode: to,
                cardinality: "1",
                priority: 2,
                parameters: {
                    value: { "payload": "Default payload" },
                    desc: "Mission extension",
                    type: "org.json.JSONObject",
                    name: "parameters"
                }
            }
        })

    })
    const data_missions = await api_create_missions.json()
}
   
}