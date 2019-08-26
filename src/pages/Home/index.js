import React from 'react';
import { useSelector } from 'react-redux';

import Map from '../../components/Map';
import PlaceMarker from '../../components/PlaceMarker';
import PlaceDetails from '../../components/PlaceDetails';

const Home = () => {
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
      <PlaceDetails />
    </>
  );
};

export default Home;
