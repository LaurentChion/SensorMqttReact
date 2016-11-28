import React, { Component, PropTypes } from 'react';
import '../css/Table.css';
import Sensor from '../model/Sensor';
import Row from './Row';
//const mqtt = require('mqtt')
// ne fonctionne pas à cause de webpack
const mqtt = require('../../public/mqtt.js')

const RadarChart = require("react-chartjs").Radar;

class Table extends Component {

  constructor() {
    super();
    this.sensors = [];
    this.initConnection();
  }

  static propTypes = {
    update: PropTypes.func.isRequired
  }

  addSensor = (sensor) => {
    this.sensors.push(sensor);
    this.props.update();
  }

  updateSensor = (sensor) => {
      for (let i=0; i<this.sensors.length; i++) {
        if(this.sensors[i].id === sensor.id) {
          this.sensors[i].data.value = sensor.value;
          this.props.update();
        }
      }
  }

  initConnection() {
    const clientMQTT = mqtt.connect('mqtt://localhost:8080');
    clientMQTT.subscribe('value/#');

    clientMQTT.on('message', (topic, message) => {


      // récupération des valeurs
      const json = JSON.parse(message)
      const split = topic.split("/");
      const id =`${split[1]}`;
      const value = `${json.value}`;
      const data = {value: value};

      // si le sensor existe déja
      if(Sensor.idIsValid(id)) {
        try {
            const s = new Sensor(split[1], split[1], json.type, data);
            this.addSensor(s);
            //console.log(`Creation d'un sensor : ${s}`);
        } catch (e) {
          console.log(`Error create sensor : ${e}`);
        }
      }
      else {
        //console.log("Update");
        const up = {
          id,
          value
        }

        this.updateSensor(up);
      }

    });

  }

  count(string) {
    let compteur = 0;
    for (var i=0; i < this.sensors.length; i++) {
      if (this.sensors[i].type === string) {
        compteur++;
      }
    }
    return compteur;
  }

  getData() {
    var data = {
        labels: ["TEMPERATURE","HUMIDITY","LIGHT","SWITCH","DOOR","FAN_SPEED","POSITIVE_NUMBER","PERCENT","ON_OFF","OPEN_CLOSE"],
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: [ this.count("TEMPERATURE"), this.count("HUMIDITY"), this.count("LIGHT"), this.count("SWITCH"), this.count("DOOR"), this.count("FAN_SPEED"), this.count("POSITIVE_NUMBER"), this.count("PERCENT"), this.count("ON_OFF"), this.count("OPEN_CLOSE")]
            }
        ]
    };
    return data;
  }

  render() {

    let rows = [];
    for (var i=0; i < this.sensors.length; i++) {
      const id = this.sensors[i].id;
      const type = this.sensors[i].type;
      const valueSensor = this.sensors[i].data.value;
      rows.push(<Row id={id} type={type} value={valueSensor} key={i}/>);
    }

    const data = this.getData();
    const options = {
            scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
    }

    return (
      <div>
        <RadarChart data={data} options={options} redraw />
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>TYPE</th>
                <th>VALUE</th>
              </tr>
            </thead>
            <tbody id="table">
              {rows}
            </tbody>
          </table>

        </div>
      </div>
    );
  }
}

export default Table;
