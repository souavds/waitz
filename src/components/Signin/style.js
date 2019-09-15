import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export default {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
  `,
  Actions: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
  `,
  useStyles: makeStyles(theme => ({
    Form: {
      margin: 0,
      '&:nth-child(odd)': {
        margin: '25px 0'
      }
    }
  }))
};
