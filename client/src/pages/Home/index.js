import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';

import { Types as MapTypes } from '../../store/ducks/map';

import Map from '../../components/Map';
import PlaceMarker from '../../components/PlaceMarker';

const Home = () => {
  const storeDispatch = useDispatch();
  const gmaps = useSelector(state => state.map.gmaps);
  const places = useSelector(state => state.map.nearbyPlaces);
  const userLocation = useSelector(state => state.user.location);
  const [placesStorage] = useLocalStorage('places');

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      if (gmaps.maps !== null) {
        const location = new gmaps.maps.LatLng(
          userLocation.lat,
          userLocation.lng
        );
        const placesService = new gmaps.maps.places.PlacesService(gmaps.map);
        placesService.nearbySearch(
          {
            location,
            radius: '50000',
            type: 'hospital'
          },
          res => {
            console.log('PLACES API');
            writeStorage('places', res);
            return res;
          }
        );
      }
    };

    if (!placesStorage) {
      fetchNearbyPlaces();
    }
    if (places.length === 0) {
      storeDispatch({
        type: MapTypes.SET_NEARBY_PLACES,
        payload: {
          places: placesStorage
        }
      });
    }
    // eslint-disable-next-line
  }, [gmaps.maps, placesStorage]);

  return (
    <>
      <Map>
        {places.map(place => (
          <PlaceMarker
            key={place.place_id}
            lat={place.geometry.location.lat}
            lng={place.geometry.location.lng}
          />
        ))}
      </Map>
    </>
  );
};

export default Home;
