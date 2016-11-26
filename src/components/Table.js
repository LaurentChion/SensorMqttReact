import React, { Component } from 'react';
import '../css/Table.css';

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

      id.textContent =`${topic}`;
      type.textContent = `${message.toString()}`;
      value.textContent = `${message.toString()}`;
      line.appendChild(id);
      line.appendChild(type);
      line.appendChild(value);
      table.appendChild(line);

      });

    return (
      <div className="Table">
        <table id="table">
          <tr>
            <th>Id</th>
            <th>Type</th>
            <th>Value</th>
          </tr>
        </table>
      </div>
    );
  }
}

export default Table;
