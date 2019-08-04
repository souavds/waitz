import moment from 'moment';

const whichTheme = () => {
  return moment().hour() >= 18 || moment().hour() <= 5 ? 'dark' : 'light';
};

export default {
  whichTheme
};
