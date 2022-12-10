import SQLite from 'tauri-plugin-sqlite-api';

const sqlite = await SQLite.open('./dict.db');


export default sqlite;
