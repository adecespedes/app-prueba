import * as SQLite from "expo-sqlite";

export async function createTables() {
	const db = await SQLite.openDatabaseAsync("transfermovil.db");

	await db.execAsync(
		`
    CREATE TABLE IF NOT EXISTS sms (_id STRING PRIMARY KEY UNIQUE NOT NULL,thread_id STRING,address STRING,date STRING,date_string STRING, date_sent STRING,protocol STRING,read STRING,status STRING,type STRING,reply_path_present STRING,body STRING,service_center STRING,locked STRING,error_code STRING,sub_id STRING,creator STRING,seen STRING,deletable STRING,sim_slot STRING,hidden STRING,app_id STRING, id_subcategoria NUMERIC REFERENCES subcategoria (id), user STRING, json STRING, no_transferencia STRING);
    CREATE TABLE IF NOT EXISTS categoria (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL REFERENCES subcategoria (id_categoria),nombre STRING);
    CREATE TABLE IF NOT EXISTS subcategoria (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,nombre STRING,id_categoria INTEGER REFERENCES categoria (id));
    `,
	);
	// const db = SQLite.openDatabase('transfermovil.db');
	// const query1 =
	//   'CREATE TABLE IF NOT EXISTS sms (_id STRING PRIMARY KEY UNIQUE NOT NULL,thread_id STRING,address STRING,date STRING,date_string STRING, date_sent STRING,protocol STRING,read STRING,status STRING,type STRING,reply_path_present STRING,body STRING,service_center STRING,locked STRING,error_code STRING,sub_id STRING,creator STRING,seen STRING,deletable STRING,sim_slot STRING,hidden STRING,app_id STRING, id_subcategoria NUMERIC REFERENCES subcategoria (id), user STRING, json STRING, no_transferencia STRING);';
	// const query2 =
	//   'CREATE TABLE IF NOT EXISTS concepto (_id INTEGER PRIMARY KEY AUTOINCREMENT,nombre STRING);';
	// const query3 =
	//   'CREATE TABLE IF NOT EXISTS ente_monetario (_id INTEGER PRIMARY KEY AUTOINCREMENT,nombre STRING);';
	// const query4 =
	//   'CREATE TABLE IF NOT EXISTS [Relacion: ente_monetario | concepto] (_id INTEGER PRIMARY KEY,ente_monetario INTEGER REFERENCES ente_monetario (_id),concepto INTEGER REFERENCES concepto (_id));';
	// const query5 =
	//   'CREATE TABLE IF NOT EXISTS categoria (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL REFERENCES subcategoria (id_categoria),nombre STRING);';
	// const query6 =
	//   'CREATE TABLE IF NOT EXISTS subcategoria (id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,nombre STRING,id_categoria INTEGER REFERENCES categoria (id));';

	// db.transaction(tx => {
	//   tx.executeSql(query1);
	//   tx.executeSql(query2);
	//   tx.executeSql(query3);
	//   tx.executeSql(query4);
	//   tx.executeSql(query5);
	//   tx.executeSql(query6);
	// });
}

export function initDatabase() {
	createTables();
}
