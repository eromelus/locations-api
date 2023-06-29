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
exports.geocodeAddress = void 0;
const axios_1 = __importDefault(require("axios"));
const geocodeAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://dev.virtualearth.net/REST/v1/Locations", {
            params: {
                query: address,
                key: "Avk_H24dJEFyiHLK5_4kERsDWs0qNLCPEQGTkZ8nD1YBq8eikai-ih-e-Ox8M55n",
            },
        });
        if (response.data.resourceSets[0].resources.length > 0) {
            const location = response.data.resourceSets[0].resources[0].point.coordinates;
            const geocodedLocation = {
                latitude: location[0],
                longitude: location[1],
            };
            return geocodedLocation;
        }
        else {
            throw new Error("Failed to geocode the provided address. Please enter a valid address.");
        }
    }
    catch (error) {
        throw new Error("Failed to geocode the provided address. Please enter a valid address.");
    }
});
exports.geocodeAddress = geocodeAddress;
