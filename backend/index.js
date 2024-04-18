// backend/index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { getCred, createUser } from './database.js';

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // configuring express.js

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

const JWT_SECRET = 'password123' //change the secret key easy to break for hacking;

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const cred = await getCred(username, password);
    if (cred.length === 0) {
      console.log(`User not found or incorrect credentials`);
      res.status(404).json({ error: "User not found or incorrect credentials" });
    } else {
      const token = jwt.sign({ username: cred[0].username }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful", token });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await getCred(username);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create the new user
    await createUser(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/frontpage", authenticateToken, (req, res) => {
  res.send("Welcome to the content page!");
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
