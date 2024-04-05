import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();



async function getCreds() {
    try {
        const [rows] = await pool.query("SELECT * FROM cred")
        return rows }
    catch (error) {
        console.log('Error:', error);
        throw error;
    }
}

async function getCred(user){
    const [rows] = await pool.query(`
    SELECT * FROM cred WHERE username = '${user}'
    `)
    return rows
}


// more secure way:
// async function getCred(user){
//     const [rows] = await pool.query(`
//     SELECT * FROM cred WHERE username = ?
//     `,[user])
//     return rows
// }

// (async () => {
//     try {
//       const creds = await getCreds();
//       console.log(creds);
//     } catch (error) {
//       console.error('Error fetching credentials:', error);
//     } finally {
//       // Close the database connection
//       pool.end();
//     }
//   })();


export const creds = await getCreds()
console.log(creds)

const cred = await getCred('admin\' UNION SELECT null,database(); -- -')
console.log(cred)