import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Place = () => {
  const placeSelected = useSelector(state =>
    state.map.places.nearby.find(
      place => place._id === state.map.places.selected
    )
  );

  useEffect(() => {
    if (!placeSelected) window.location = '/';
  }, [placeSelected]);

  return <p>place</p>;
};

export default Place;
