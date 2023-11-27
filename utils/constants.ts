// export * from './exports-mapbox';
// export { default as default } from './exports-mapbox';
import { v4 as uuidv4 } from "uuid";
const sessionToken = uuidv4();
const MAPBOX_BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest";
const MAPBOX_DRIVING_ENDPOINT =
  "https://api.mapbox.com/directions/v5/mapbox/driving/";
const MAPBOX_RETRIVE_URL =
  "https://api.mapbox.com/search/searchbox/v1/retrieve/";
const SESSION_TOKEN = uuidv4();
export {
  MAPBOX_BASE_URL,
  MAPBOX_DRIVING_ENDPOINT,
  MAPBOX_RETRIVE_URL,
  SESSION_TOKEN,
};
