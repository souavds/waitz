import axios from '../config/axios';

export default {
  checkIn: async (user, place, type) => {
    return axios.post('/checkin', {
      user,
      place,
      type
    });
  }
};
