import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { Types as UserTypes } from '../../store/ducks/user';
import { Types as MapTypes } from '../../store/ducks/map';

import Controls from './controls';
import ThemeUtils from '../../utils/theme';
import Styles from './style';
import MapStyle from './mapStyle';

const ZOOM = 15;

const createMapOptions = maps => ({
  styles:
    ThemeUtils.whichTheme() === 'dark'
      ? MapStyle.darkTheme
      : MapStyle.lightTheme,
  fullscreenControl: false,
  zoomControl: false
});

const Map = ({ children }) => {
  const dispatch = useDispatch();

  const [viewport, setViewport] = useState({
    lat: null,
    lng: null
  });
  const [zoom, setZoom] = useState(ZOOM);
  const userLocation = useSelector(state => state.user.location);

  const centerUserLocation = () => {
    setViewport({
      lat: userLocation.lat,
      lng: userLocation.lng
    });
    setZoom(ZOOM);
  };

  useEffect(() => {
    navigator.geolocation.watchPosition(
      position => {
        centerUserLocation();
        dispatch({
          type: UserTypes.SET_LOCATION,
          payload: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        });
      },
      null,
      { enableHighAccurary: true }
    );
  });

  const handlerMapChange = map => {
    setViewport({
      lat: map.center.lat,
      lng: map.center.lng
    });
    setZoom(map.zoom);
  };

  const onGMapsAPI = (map, maps) => {
    dispatch({
      type: MapTypes.SET_GMAPS,
      payload: {
        map,
        api: maps
      }
    });
  };

  return (
    <Styles.Container>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GMAPS_KEY,
          libraries: ['places']
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => onGMapsAPI(map, maps)}
        options={createMapOptions}
        onChange={handlerMapChange}
        center={{ ...viewport }}
        defaultZoom={ZOOM}
        zoom={zoom}
      >
        <Styles.UserLocationMarker {...userLocation} />
        {children}
      </GoogleMapReact>
      <Controls
        onLocation={centerUserLocation}
        zoom={zoom}
        onZoom={z => {
          setZoom(z);
        }}
      />
    </Styles.Container>
  );
};

export default Map;
