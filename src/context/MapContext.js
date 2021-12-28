import React, { useState, createContext } from 'react';

export const MapContext = createContext();

const MapContextProvider = ({ children }) => {
  const [cleanData, setCleanData] = useState([]);
  const [getCoordinates, setCoordinates] = useState();
  const [mapPageInfo, setMapPageInfo] = useState([
    {
      name: '',
      locations: 0,
      sources: 0,
      count: 0,
    },
  ]);

  return (
    <MapContext.Provider
      value={{
        cleanData,
        setCleanData,
        getCoordinates,
        setCoordinates,
        mapPageInfo,
        setMapPageInfo,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapContextProvider;
