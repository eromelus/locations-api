import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";
import { findNearestLocations } from "./filter-locations";
import { jobsiteLocations } from "./locations";
import { geocodeAddress } from "./geocode-address";

const getLocations = async (req: Request, res: Response) => {
  // pool.query("SELECT * FROM locations", (error, results) => {
  //   if (error) {
  //     throw error;
  //   }

  let ref: any;
  if (req.params.address) {
    try {
      ref = await geocodeAddress(req.params.address);
    } catch (err) {
      return res.status(500).json({ error: "Failed to geocode address" });
    }
  }

  const locations = jobsiteLocations;
  const topFive = findNearestLocations(ref, locations, 5);

  res.status(200).json(topFive);
  // });
};

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

app.get("/location/:address", getLocations);

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
