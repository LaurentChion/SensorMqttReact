const clientMQTT = mqtt.connect('mqtt://localhost:8080'); // you add a ws:// url here
clientMQTT.subscribe('value/#');

clientMQTT.on('message', (topic, message) => {
  const line = document.createElement('li');
  const messages = document.querySelector('#messages');
  console.log(`ID : ${topic} message : ${message.toString()}`);
  line.textContent = `ID : ${topic} message : ${message.toString()}`;
  messages.appendChild(line);
});
