import React, { createContext } from 'react';

const MapContext = createContext({
  gmaps: {
    map: null,
    maps: null
  },
  setGmaps: () => {}
});

class MapProvider extends React.Component {
  setGmaps = (map, maps) => {
    this.setState({
      gmaps: {
        map,
        maps
      }
    });
  };

  state = {
    gmaps: {
      map: null,
      maps: null
    },
    setGmaps: this.setGmaps
  };

  render() {
    return (
      <MapContext.Provider value={this.state}>
        {this.props.children}
      </MapContext.Provider>
    );
  }
}

const MapConsumer = MapContext.Consumer;

export { MapContext, MapProvider, MapConsumer };
