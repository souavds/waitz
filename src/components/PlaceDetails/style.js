import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export default {
  Container: styled.div`
    display: flex;
    position: absolute;
    top: 0;
    margin: 15px 15px;
  `,
  CheckInContainer: styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 8px;
  `,
  CheckInSingle: styled.div`
    display: flex;
    align-items: center;
  `,
  useStyles: makeStyles(theme => ({
    card: {
      maxWidth: 425,
      borderRadius: 15
    },
    checkInTitle: {
      paddingBottom: 10
    },
    cardActions: {
      justifyContent: 'flex-end'
    },
    avatar: {
      backgroundColor: '#dd4b3e'
    }
  }))
};
