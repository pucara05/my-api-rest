
import mysql from 'mysql2';
import { config } from 'dotenv';

// Carga variables de entorno desde .env y verifica si se cargaron correctamente
const dotenvConfig = config();

if (dotenvConfig.error) {
  throw new Error("No se pudieron cargar las variables de entorno desde .env");
}

console.log('Variables de entorno cargadas:', dotenvConfig.parsed);

// Imprime las variables de entorno para verificación
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 3306
});

// Promisify para usar async/await
const promisePool = pool.promise();

// Test the connection
promisePool.query('SELECT NOW()')
  .then(([rows]) => {
    console.log('Database connection successful. Current time:', rows[0]['NOW()']);
  })
  .catch(err => {
    console.error('Error connecting to the database:', err);
  });

// Manejo de errores en la conexión
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default promisePool;






/* para conetarme a postgresql
import pkg from 'pg';
const { Pool } = pkg;

import { config } from 'dotenv';

// Carga variables de entorno desde .env y verifica si se cargaron correctamente
const dotenvConfig = config();

if (dotenvConfig.error) {
  throw new Error("No se pudieron cargar las variables de entorno desde .env");
}

console.log('Variables de entorno cargadas:', dotenvConfig.parsed);

// Imprime las variables de entorno para verificación
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connection successful. Current time:', res.rows[0].now);
  }
});


// Manejo de errores en la conexión
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
*/
