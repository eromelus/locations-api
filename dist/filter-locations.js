"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNearestLocations = void 0;
const geolib = require("geolib");
const findNearestLocations = (referencePoint, locations, topN) => {
    const distances = locations.map((location) => {
        return Object.assign(Object.assign({}, location), { distance: geolib.getDistance(referencePoint, {
                latitude: location.latitude,
                longitude: location.longitude,
            }) });
    });
    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, topN).map((location) => location.address);
};
exports.findNearestLocations = findNearestLocations;
