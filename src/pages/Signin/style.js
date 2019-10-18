import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

import BackgroundImage from '../../assets/images/background.jpg';

export default {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url(${BackgroundImage});
    background-size: 25%;
    background-repeat: repeat;

    @media screen and (max-width: 768px) {
      background-size: contain;
    }
  `,
  Header: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  useStyles: makeStyles(theme => ({
    Paper: {
      width: 450,
      padding: '48px 40px 36px',
      '@media screen and (max-width: 425px)': {
        width: '90%',
        padding: '48px 30px 36px'
      }
    }
  }))
};
