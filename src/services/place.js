import axios from '../config/axios';

export default {
  getNearbyPlaces: async (lat, lng) => {
    return axios.get(`/place/nearby?lat=${lat}&lng=${lng}`);
  }
};
