import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  todos: 'id, text, lat, lng', // Primary key and indexed props
});