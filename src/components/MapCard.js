import React from 'react';

const MapCard = ({ name, locations, sources, count }) => {
  return (
    <>
      <div className='p-10 gap-5 bg-blue-100'>
        <div className='rounded overflow-hidden shadow-lg bg-white'>
          <h2 className='mt-2 mb-2  font-bold'>Country : {name}</h2>
          <p className='text-gray-700 text-base'>{locations} locations</p>
          <p className='text-gray-700 text-base'>{sources} sources</p>
          <p className='text-gray-700 text-base'>
            {new Intl.NumberFormat('de-DE').format(count)} measurements
          </p>
        </div>
      </div>
    </>
  );
};

export default MapCard;
