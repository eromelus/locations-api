const geolib = require("geolib");

type Location = {
  latitude: string;
  longitude: string;
  address: string;
};

type ReferencePoint = {
  latitude: string;
  longitude: string;
};

export const findNearestLocations = (
  referencePoint: ReferencePoint,
  locations: Location[],
  topN: number
): string[] => {
  const distances = locations.map((location) => {
    return {
      ...location,
      distance: geolib.getDistance(referencePoint, {
        latitude: location.latitude,
        longitude: location.longitude,
      }),
    };
  });

  distances.sort((a, b) => a.distance - b.distance);

  return distances.slice(0, topN).map((location) => location.address);
};
