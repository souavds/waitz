import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import { Types as UserTypes } from '../../store/ducks/user';
import { Types as MapTypes } from '../../store/ducks/map';

import Controls from './controls';
import ThemeUtils from '../../utils/theme';
import Styles from './style';
import MapStyle from './mapStyle';
import { ZOOM } from '../../config/map';

const createMapOptions = maps => ({
  styles:
    ThemeUtils.whichTheme() === 'dark'
      ? MapStyle.darkTheme
      : MapStyle.lightTheme,
  fullscreenControl: false,
  zoomControl: false
});

const Map = ({ children }) => {
  const storeDispatch = useDispatch();

  const viewport = useSelector(state => state.map.current.viewport);
  const zoom = useSelector(state => state.map.current.zoom);
  const [initViewport, setInitViewport] = useState(false);
  const userLocation = useSelector(state => state.user.location);

  const setViewport = ({ lat, lng }) => {
    storeDispatch({
      type: MapTypes.SET_VIEWPORT,
      payload: {
        lat,
        lng
      }
    });
  };

  const setZoom = z => {
    storeDispatch({
      type: MapTypes.SET_ZOOM,
      payload: {
        zoom: z
      }
    });
  };

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (!initViewport) {
          setViewport({
            lat: latitude,
            lng: longitude
          });
          setInitViewport(true);
        }
        if (latitude !== userLocation.lat || longitude !== userLocation.lng) {
          storeDispatch({
            type: UserTypes.SET_LOCATION,
            payload: {
              lat: latitude,
              lng: longitude
            }
          });
        }
      },
      null,
      { enableHighAccurary: true }
    );
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  });

  const centerUserLocation = () => {
    setViewport({
      lat: userLocation.lat,
      lng: userLocation.lng
    });
    setZoom(ZOOM);
  };

  const handlerMapChange = map => {
    setViewport({
      lat: map.center.lat,
      lng: map.center.lng
    });
    setZoom(map.zoom);
  };

  const onGMapsAPI = (map, maps) => {
    storeDispatch({
      type: MapTypes.SET_GMAPS,
      payload: {
        map,
        maps
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
