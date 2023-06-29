import axios from "axios";

type GeocodedLocation = {
  latitude: number;
  longitude: number;
};

export const geocodeAddress = async (
  address: string
): Promise<GeocodedLocation> => {
  try {
    const response = await axios.get(
      "https://dev.virtualearth.net/REST/v1/Locations",
      {
        params: {
          query: address,
          key: "Avk_H24dJEFyiHLK5_4kERsDWs0qNLCPEQGTkZ8nD1YBq8eikai-ih-e-Ox8M55n",
        },
      }
    );

    if (response.data.resourceSets[0].resources.length > 0) {
      const location =
        response.data.resourceSets[0].resources[0].point.coordinates;
      const geocodedLocation: GeocodedLocation = {
        latitude: location[0],
        longitude: location[1],
      };
      return geocodedLocation;
    } else {
      throw new Error(
        "Failed to geocode the provided address. Please enter a valid address."
      );
    }
  } catch (error) {
    throw new Error(
      "Failed to geocode the provided address. Please enter a valid address."
    );
  }
};
