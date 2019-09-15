import React from 'react';
import { useSelector } from 'react-redux';

import Auth from '../../components/Auth';
import Map from '../../components/Map';
import PlaceMarker from '../../components/PlaceMarker';
import PlaceDetails from '../../components/PlaceDetails';

const HomePage = () => {
  const places = useSelector(state => state.place.nearby);

  return (
    <>
      <Map>
        {places &&
          places.map((place, index) => (
            <PlaceMarker
              key={index}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
              place={place}
            />
          ))}
      </Map>
      <Auth />
      <PlaceDetails />
    </>
  );
};

export default HomePage;
