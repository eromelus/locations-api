"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const filter_locations_1 = require("./filter-locations");
const locations_1 = require("./locations");
const geocode_address_1 = require("./geocode-address");
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // pool.query("SELECT * FROM locations", (error, results) => {
    //   if (error) {
    //     throw error;
    //   }
    let ref;
    if (req.params.address) {
        try {
            ref = yield (0, geocode_address_1.geocodeAddress)(req.params.address);
        }
        catch (err) {
            return res.status(500).json({ error: "Failed to geocode address" });
        }
    }
    const locations = locations_1.jobsiteLocations;
    const topFive = (0, filter_locations_1.findNearestLocations)(ref, locations, 5);
    res.status(200).json(topFive);
    // });
});
const app = (0, express_1.default)();
dotenv_1.default.config(); //Reads .env file and makes it accessible via process.env
app.get("/location/:address", getLocations);
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
    }
    catch (err) {
        console.log(err);
    }
});
connectToDB();
