import expect from 'expect';

import { data } from './sensors_data';

import Sensor from '../src/model/Sensor';

function SensorTest() {
  const sensors = new Array(data.length);
  // création des données à partir des données
  let i = 0;
  for (i = 0; i < data.length; i += 1) {
    sensors[i] = new Sensor(data[i].id, data[i].name, data[i].type, data[i].data);
    console.log(sensors[i].toString());
  }

  // Test sur les sensors
  describe('Sensor model tests', () => {
    /** Test sur les types de sensor **/
    describe('Test Sensor\'s Type', () => {
      // Si le type de sensor est bien transmis
      it('SensorType TEMPERATURE is TEMPERATURE', () => {
        const s = new Sensor('id', 'name', 'TEMPERATURE', { value: 1 });
        expect(s.type).toEqual('TEMPERATURE');
      });

      // Si le type de sensor n'est pas définie lancer une erreur.
      it('SensorType is not in the enum, throw an Error', () => {
        expect(() => {
          const s = new Sensor('id1', 'name', 'type', 2, { value: 1 });
        }).toThrow(Error, 'Unknown type');
      });

      // Si le type de sensor est écrit en minuscule le mettre en majuscule.
      it('SensorType fan_speed equals to FAN_SPEED', () => {
        const s = new Sensor('id2', 'name', 'fan_speed', { value: 1 });
        expect(s.type).toEqual('FAN_SPEED');
      });

      // Si le type de sensor n'est pas une chaîne de caractère lancer une erreur.
      it('SensorType isn\'t a string throw an Error', () => {
        expect(() => {
          const s = new Sensor('id3', 'name', 1, { value: 1 });
        }).toThrow(Error, 'Unknown type');
      });
    });

    /** Test sur les datas **/
    describe('Test Sensor\'s Data', () => {
      // Test sur les Datum
      // Si la data avec la valeur 0 est bien reconnu
      it('Data with single value 0 is ok', () => {
        expect(sensors[1].data.value).toEqual(0);
      });

      // Test sur les TimeSeries
      // Le nombre de labels et égal à onmbre de données
      it('TimeSeries labels and values must have the same length, if not throw Error', () => {
        expect(() => {
          const s = new Sensor(5, 'name', 'temperature', {
            values: [23, 23, 22, 21, 23, 23, 23, 25, 25],
            labels: ['2016-10-19T08:00:00.000Z', '2016-10-19T09:00:00.000Z'],
          });
        }).toThrow(Error, 'Invalid data length');
      });
    });

    /** Test sur l'Id' **/
    describe('Test Sensor\'s Id', () => {
      // test du get
      it('Ids are strings', () => {
        for (i = 0; i < data.length; i += 1) {
          expect(sensors[i].id).toBeA('string');
        }
      });
      // Si l'identifiant n'est pas une chaine de caractère le convertir en chaine de caractère'
      it('Integer id is convert to string', () => {
        const s = new Sensor(1, 'name', 'TEMPERATURE', { value: 1 });
        expect(s.attributes[0]).toBeA('string');
      });
      it('Float id is convert to string', () => {
        const s = new Sensor(1.5, 'name', 'TEMPERATURE', { value: 1 });
        expect(s.attributes[0]).toBeA('string');
      });

      // Si l'id est un objet lancer une erreur
      it('Object id throw Error', () => {
        expect(() => {
          const s = new Sensor({
            truc: 1,
            machin: 'blablabla',
          }, 'name', 'TEMPERATURE', { value: 1 });
        }).toThrow(Error, 'Unknown id');
      });

      // Si l'id est undefined lancer une erreur
      it('Undefined ids throw Error', () => {
        expect(() => {
          const s = new Sensor(null, 'name', 'TEMPERATURE', { value: 1 });
        }).toThrow(Error, 'Unknown id');
      });

      // Vérifier si l'id est unique <= (stocké les objets dans une base de données ?)
      it('If id is already use send Error', () => {
        expect(() => {
          const s = new Sensor(1, 'name', 'TEMPERATURE', { value: 1 });
        }).toThrow(Error, 'Id is already use');
      });
    });
  });

}

export default SensorTest;
