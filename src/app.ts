import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

const getLocations = (req: Request, res: Response) => {
  pool.query("SELECT * FROM locations LIMIT 5", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

app.get("/", getLocations);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

const connectToDB = async () => {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
connectToDB();
