import React from 'react';
import { useSelector } from 'react-redux';

import Map from '../../components/Map';
import PlaceMarker from '../../components/PlaceMarker';

const Home = () => {
  const places = useSelector(state => state.map.nearbyPlaces);

  return (
    <>
      <Map>
        {places &&
          places.map((place, index) => (
            <PlaceMarker
              key={index}
              lat={place.geometry.location.lat}
              lng={place.geometry.location.lng}
              info={place}
            />
          ))}
      </Map>
    </>
  );
};

export default Home;
