import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0%   { transform: scale(1); opacity: 1; }
  70%  { transform: scale(3); opacity: 0; }
  100% { transform: scale(1); opacity: 0; }
`;

export default {
  Container: styled.div`
    position: relative;
    height: 100%;
    width: 100%;
  `,
  UserLocationMarker: styled.div`
    position: absolute;
    background-color: #a01cd4;
    width: 15px;
    height: 15px;
    border-radius: 50%;

    &::before {
      background-color: #a01cd4;
      content: '';
      width: 15px;
      height: 15px;
      border-radius: 50%;
      position: absolute;
      animation: ${pulseAnimation} 2s infinite;
    }

    &::after {
      border-radius: 50%;
      border: 2px solid #fff;
      content: '';
      height: 19px;
      left: -2px;
      position: absolute;
      top: -2px;
      width: 19px;
      box-sizing: border-box;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
    }
  `
};
