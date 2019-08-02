import React, { useState, useEffect, createRef } from 'react';
import GoogleMapReact from 'google-map-react';

import produce from 'immer';

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

const Map = () => {
  // const mapRef = createRef();
  const [viewport, setViewport] = useState({
    lat: -5.84690821710552,
    lng: -35.20573598037466
  });

  const [zoom, setZoom] = useState(ZOOM);

  const [userLocation, setUserLocation] = useState({
    lat: null,
    lng: null
  });

  useEffect(() => {
    navigator.geolocation.watchPosition(
      position => {
        setUserLocation(
          produce(userLocation, draft => {
            draft.lat = position.coords.latitude;
            draft.lng = position.coords.longitude;
          })
        );
      },
      null,
      { enableHighAccurary: true }
    );
  });

  const centerUserLocation = () => {
    setViewport(
      produce(viewport, draft => {
        draft.lat = userLocation.lat;
        draft.lng = userLocation.lng;
      })
    );
    setZoom(ZOOM);
  };

  const handlerMapChange = map => {
    setViewport(
      produce(viewport, draft => {
        draft.lat = map.center.lat;
        draft.lng = map.center.lng;
      })
    );
    setZoom(map.zoom);
  };

  return (
    <Styles.Container>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GMAPS_KEY,
          libraries: ['places']
        }}
        yesIWantToUseGoogleMapApiInternals
        options={createMapOptions}
        onChange={handlerMapChange}
        center={{ ...viewport }}
        defaultZoom={ZOOM}
        zoom={zoom}
      >
        <Styles.UserLocationMarker {...userLocation} />
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
