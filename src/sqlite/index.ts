import SQLite from 'tauri-plugin-sqlite-api';

const sqlite = await SQLite.open('./古代汉语词典.db');


export default sqlite;
