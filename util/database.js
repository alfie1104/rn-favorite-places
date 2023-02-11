import * as SQLite from "expo-sqlite";

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
