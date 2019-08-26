import axios from '../config/axios';

export default {
  getCommentsById: async placeId => {
    return axios.get(`/comment?place_id=${placeId}`);
  }
};
