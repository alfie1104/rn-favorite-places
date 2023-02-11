import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      let sql = `CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`;

      const onSuccess = () => {
        resolve();
      };
      const onError = (_, error) => {
        reject(error);
      };
      tx.executeSql(sql, [], onSuccess, onError);
    });
  });

  return promise;
}

export function insertPlace(place) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
        (_, resultSet) => {
          resolve(resultSet);
        },
        (_, err) => {
          reject(err);
        }
      );
    });

    return promise;
  });

  return promise;
}

export function fetchPlaces() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, resultSet) => {
          const places = [];
          for (const data of resultSet.rows._array) {
            places.push(
              new Place(
                data.title,
                data.imageUri,
                {
                  address: data.address,
                  lat: data.lat,
                  lng: data.lng,
                },
                data.id
              )
            );
          }
          resolve(places);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}

export function fetchPlaceDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id = ?`,
        [id],
        (_, resultSet) => {
          const data = resultSet.rows._array[0];
          const place = new Place(
            data.title,
            data.imageUri,
            {
              address: data.address,
              lat: data.lat,
              lng: data.lng,
            },
            data.id
          );

          resolve(place);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
}
