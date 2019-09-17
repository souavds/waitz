import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export default {
  Container: styled.div`
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    margin: 15px 15px;
  `,
  useStyles: makeStyles(theme => ({
    Signin: {
      textDecoration: 'none'
    },
    Card: {
      minWidth: 345
    }
  }))
};
