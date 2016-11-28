import React, { Component, PropTypes } from 'react';
import '../css/Table.css';
import Sensor from '../model/Sensor';
import Row from './Row';

// ne fonctionne pas à cause de webpack
//const mqtt = require('mqtt')
const mqtt = require('../../public/mqtt.js')

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

  render() {

    let rows = [];
    const numberOfSensor = this.sensors.length;
    for (var i=0; i < numberOfSensor; i++) {
      const id = this.sensors[i].id;
      const type = this.sensors[i].type;
      const valueSensor = this.sensors[i].data.value;
      rows.push(<Row id={id} type={type} value={valueSensor} key={i}/>);
    }

    return (
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
    );
  }
}

export default Table;
