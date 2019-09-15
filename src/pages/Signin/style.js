import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export default {
  Container: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `,
  Header: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  useStyles: makeStyles(theme => ({
    Paper: {
      width: 450,
      padding: '48px 40px 36px'
    }
  }))
};
