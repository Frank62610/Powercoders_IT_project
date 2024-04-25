// import mysql from 'mysql2';
// import dotenv from 'dotenv';
// dotenv.config();

// const pool = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DATABASE
// }).promise();



// async function getCreds() {
//     try {
//         const [rows] = await pool.query("SELECT * FROM cred")
//         return rows }
//     catch (error) {
//         console.log('Error:', error);
//         throw error;
//     }
// }

// export async function getCred(user){
//     const [rows] = await pool.query(`
//     SELECT * FROM cred WHERE username = '${user}'
//     `)
//     return rows
// }


// // more secure way:
// // async function getCred(user){
// //     const [rows] = await pool.query(`
// //     SELECT * FROM cred WHERE username = ?
// //     `,[user])
// //     return rows
// // }

// // (async () => {
// //     try {
// //       const creds = await getCreds();
// //       console.log(creds);
// //     } catch (error) {
// //       console.error('Error fetching credentials:', error);
// //     } finally {
// //       // Close the database connection
// //       pool.end();
// //     }
// //   })();


// // const creds = await getCreds()
// // console.log(creds)

// // const cred = await getCred('admin\' UNION SELECT null,database(); -- -')
// // console.log(cred)



// backend/database.js
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  queueLimit: 0
}).promise();


export async function getCred(username, password) {
  try {
        const [rows] = await pool.query(`
        SELECT * FROM cred WHERE username = 
            '${username}' and password = '${password}'`)
    // Intentionally making it attackable to sql injection
    // const [rows] = await pool.query(
    //   'SELECT * FROM cred WHERE username = ?',
    //   [username]
    // );
    return rows;
  } catch (error) {
    console.error('Error fetching credential:', error);
    throw new Error('Database error');
  }
}

export async function createUser(username, password) {
  try {
    const [result] = await pool.query(
      'INSERT INTO cred (username, password) VALUES (?, ?)',
      [username, password]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Database error');
  }
}
