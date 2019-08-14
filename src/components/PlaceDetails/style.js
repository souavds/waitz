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
    justify-content: space-around;
    margin-top: 10px;
  `,
  useStyles: makeStyles(theme => ({
    card: {
      maxWidth: 425,
      borderRadius: 15
    },
    checkInTitle: {
      paddingBottom: 10
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: '#dd4b3e'
    }
  }))
};
