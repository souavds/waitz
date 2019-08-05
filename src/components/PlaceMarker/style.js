import styled from 'styled-components';
// import { Badge } from '@material-ui/core';
// import { withStyles } from '@material-ui/core/styles';

export default {
  PlaceMarker: styled.div`
    position: absolute;
    transform: translate(-50%, -50%);
  `,
  Counter: styled.div`
    height: 10px;
    width: 10px;
    border-radius: 100%;
  `
  // CustomBadge: withStyles(theme => ({
  //   badge: {
  //     // The border color match the background color.
  //     border: `2px solid ${
  //       theme.palette.type === 'light'
  //         ? theme.palette.grey[200]
  //         : theme.palette.grey[900]
  //     }`
  //   }
  // }))(Badge)
};
