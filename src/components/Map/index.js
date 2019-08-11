import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleMapReact from 'google-map-react';

import Services from '../../services';

import { MapContext } from '../../context/gmaps';
import { Types as UserTypes } from '../../store/ducks/user';
import { Types as MapTypes } from '../../store/ducks/map';

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
    const getNearbyPlaces = async (latitude, longitude) => {
      const response = await Services.PlaceService.getNearbyPlaces(
        latitude,
        longitude
      );
      storeDispatch({
        type: MapTypes.SET_NEARBY_PLACES,
        payload: {
          places: response.data
        }
      });
    };

    const watchId = navigator.geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        if (!initViewport) {
          setViewport({
            lat: latitude,
            lng: longitude
          });
          setInitViewport(true);
          getNearbyPlaces(latitude, longitude);
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
    setZoom(DEFAULT_ZOOM);
  };

  const handlerMapChange = map => {
    setViewport({
      lat: map.center.lat,
      lng: map.center.lng
    });
    if (zoom !== map.zoom) {
      setZoom(map.zoom);
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
          setZoom(z);
        }}
      />
    </Styles.Container>
  );
};

export default Map;
