import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import Services from '../../services';

import { MapContext } from '../../context/gmaps';
import { Actions as UserActions } from '../../store/ducks/user';
import { Actions as MapActions } from '../../store/ducks/map';
import { Actions as PlaceActions } from '../../store/ducks/place';

import Controls from './controls';
import ThemeUtils from '../../utils/theme';
import Styles from './style';
import MapStyle from './mapStyle';
import { DEFAULT_ZOOM } from '../../config/map';

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
  const mapContext = useContext(MapContext);

  const viewport = useSelector(state => state.map.viewport);
  const zoom = useSelector(state => state.map.zoom);
  const [initViewport, setInitViewport] = useState(false);
  const userLocation = useSelector(state => state.user.location);

  useEffect(() => {
    const getNearbyPlaces = async (latitude, longitude) => {
      const response = await Services.PlaceService.getNearbyPlaces(
        latitude,
        longitude
      );
      storeDispatch(PlaceActions.setNearbyPlaces(response.data));
    };

    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (!initViewport) {
          storeDispatch(MapActions.setViewport(latitude, longitude));
          setInitViewport(true);
          getNearbyPlaces(latitude, longitude);
        }
        if (latitude !== userLocation.lat || longitude !== userLocation.lng) {
          storeDispatch(UserActions.setLocation(latitude, longitude));
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
    storeDispatch(MapActions.setViewport(userLocation.lat, userLocation.lng));
    storeDispatch(MapActions.setZoom(DEFAULT_ZOOM));
  };

  const handlerMapChange = map => {
    storeDispatch(MapActions.setViewport(map.center.lat, map.center.lng));
    if (zoom !== map.zoom) {
      storeDispatch(MapActions.setZoom(map.zoom));
    }
  };

  const onGMapsAPI = (map, maps) => {
    mapContext.setGmaps(map, maps);
  };

  return (
    <Styles.Container>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GMAPS_KEY
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => onGMapsAPI(map, maps)}
        options={createMapOptions}
        onChange={handlerMapChange}
        center={{ ...viewport }}
        defaultZoom={DEFAULT_ZOOM}
        zoom={zoom}
      >
        <Styles.UserLocationMarker {...userLocation} />
        {children}
      </GoogleMapReact>
      <Controls
        onLocation={centerUserLocation}
        zoom={zoom}
        onZoom={z => {
          storeDispatch(MapActions.setZoom(z));
        }}
      />
    </Styles.Container>
  );
};

export default Map;
