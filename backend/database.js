

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

export async function checkCred(username) {
  try{
    const [result] = await pool.query('SELECT * FROM cred WHERE username = ?', 
      [username]);
      return result;
  } catch (error) {
    console.error('Error checking credential:', error);
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

export async function createReview(id, username, stars, review){
  try{
    const [result] = await pool.query(
      'INSERT INTO reviews (id, username, stars, review) VALUES (?, ?, ?, ?)',
      [id, username, stars, review]
    );
    console.log(result)
    return result.inserId;
  } catch (error) {
    console.error('Error inserting review:', error);
    throw new Error('Database error');
  }
}

export async function fetchReview(id) {
  try{
    const [result] = await pool.query(
      `SELECT * FROM reviews where id = '${id}' `
    )
    console.log(result)
    return result
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Database error');
  }
}


export async function checkProducts() {
  try{
    const [products] = await pool.query('SELECT * FROM products')
    return products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Database error');
  }
}


export async function sortProducts(rating) {
  try{
    const [products] = await pool.query(`SELECT * FROM products WHERE stars >= '${rating}'`)
    console.log(products)
    return products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Database error');
  }
}