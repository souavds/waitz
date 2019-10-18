import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export default {
  Container: styled.div`
    display: flex;
    position: absolute;
    top: 63px;
    margin: 15px 15px;

    @media screen and (min-width: 426px) {
      top: 0;
    }
  `,
  CheckInContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 8px 0;

    @media screen and (max-width: 425px) {
      flex-direction: column;
    }
  `,
  CheckInSingle: styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 425px) {
      justify-content: space-between;
      margin-bottom: 10px;

      &:last-child {
        margin: 0;
      }
    }
  `,
  useStyles: makeStyles(theme => ({
    card: {
      width: 425,
      borderRadius: 15,
      '@media screen and (max-width: 425px)': {
        width: 395
      },
      '@media screen and (max-width: 375px)': {
        width: 345
      },
      '@media screen and (max-width: 320px)': {
        width: 290
      }
    },
    checkInTitle: {
      paddingBottom: 10
    },
    cardActions: {
      justifyContent: 'flex-end',
      padding: '8px 3px'
    },
    commentButton: {
      padding: 0
    },
    avatar: {
      backgroundColor: '#dd4b3e'
    }
  }))
};
