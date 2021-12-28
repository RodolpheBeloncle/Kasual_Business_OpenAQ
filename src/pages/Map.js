import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useMap } from '../hooks/useMap';
import Header from '../components/Header';
import MapCard from '../components/MapCard';

const Map = () => {
  const { id } = useParams();
  const [getDataMeasur, setData] = useState([]);
  const { getCoordinates, mapPageInfo } = useMap();
  console.log(mapPageInfo);

  const getMeasurOpenAq = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_ORDER_BY_COUNTRY}?limit=900&page=1&offset=0&sort=desc&radius=1000&country_id=${id}&order_by=datetime`
      )
      .then((response) => setData(response.data.results));
  };

  useEffect(getMeasurOpenAq, [id]);

  return (
    <div className='container mx-auto flex flex-col px-5 py-8 justify-center items-center'>
      <Header />

      <img
        className='h-48 w-full rounded object-cover shadow-lg'
        src='https://openaq.org/assets/graphics/content/view--home/cover--home.jpg'
        alt='skyView'
      />

      <div className='h-48 w-full rounded object-cover shadow-lg'>
        {mapPageInfo.map(({ name, locations, sources, count }, index) => (
          <MapCard
            key={index}
            name={name}
            locations={locations}
            sources={sources}
            count={count}
          />
        ))}
      </div>

      {getDataMeasur && (
        <MapContainer
          className='w-full flex flex-col mt-8 items-center text-center'
          center={getCoordinates}
          zoom={6}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          {getDataMeasur.map(
            ({ location, parameter, unit, value, coordinates }, index) => (
              <div key={index}>
                <Marker
                  position={[coordinates.latitude, coordinates.longitude]}
                >
                  <Popup>
                    <p className='mt-2 mb-2  font-bold'>{location}</p>
                    <p className='text-gray-700 text-base'>
                      parameter : {parameter}
                    </p>
                    <p className='text-gray-700 text-base'>unit : {unit}</p>
                    <p className='text-gray-700 text-base'>value : {value}</p>
                  </Popup>
                </Marker>
              </div>
            )
          )}{' '}
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
