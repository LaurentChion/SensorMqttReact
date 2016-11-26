import React, { Component } from 'react';
import '../css/Table.css';
import Sensor from '../model/Sensor';
import Row from './Row';

const mqtt = require('../../public/mqtt.js')

class Table extends Component {

  render() {
    const clientMQTT = mqtt.connect('mqtt://localhost:8080'); // you add a ws:// url here
    clientMQTT.subscribe('value/#');

    clientMQTT.on('message', (topic, message) => {

      // Récupération du tableau
      const table = document.querySelector('#table');

      // création de la nouvelle ligne
      const line = document.createElement('tr');
      const id = document.createElement('td');
      const type = document.createElement('td');
      const value = document.createElement('td');

      // récupération des valeurs
      const json = JSON.parse(message)
      const split = topic.split("/");
      id.textContent =`${split[1]}`;
      type.textContent = `${json.type}`;
      value.textContent = `${json.value}`;
      const data = {value: value};

        try {
            const s = new Sensor(split[1], split[1], json.type, data);
            line.appendChild(id);
            line.appendChild(type);
            line.appendChild(value);
            table.appendChild(line);
        } catch (e) {
          console.log(e);
        }
      });

    return (
      <div className="Table">
        <table>
          <tbody id="table">
            <th>ID</th>
            <th>TYPE</th>
            <th>VALUE</th>
            {
              () => {
                for (var i=0; i < Sensor.getTab().length; i++) {
                  <Row id="1" type="2" value="3"/>
                }
              }
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
