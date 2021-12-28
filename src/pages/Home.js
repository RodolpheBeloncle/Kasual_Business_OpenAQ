import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useMap } from '../hooks/useMap';
import SearchBar from '../components/SearchBar';

export const Home = () => {
  const [infoMeasur, setInfoMeasur] = useState([]);
  const [infoCountry, setInfoCountry] = useState([]);
  const [query, setQuery] = useState('');
  const {
    cleanData,
    setCleanData,
    setCoordinates,
    mapPageInfo,
    setMapPageInfo,
  } = useMap();

  // ============SEARCH BAR ELEMENT ======================

  const filterByCountry = cleanData.filter((country) => {
    return country.name.toLowerCase().includes(query.toLowerCase());
  });

  const measurements = () => {
    axios
      .get(`${process.env.REACT_APP_API_MEASURES}`)
      .then((response) => setInfoMeasur(response.data.results));
  };

  const countriesInfo = () => {
    axios
      .get(`${process.env.REACT_APP_API_COUNTRY}`)
      .then((response) => setInfoCountry(response.data));
  };

  const apiMatchedValues = (data1, data2) => {
    return data1.map((d1) => ({
      ...d1,
      nestedInfo: data2.filter((d2) => d2.initial === d1.code),
    }));
  };

  useEffect(measurements, []);
  useEffect(countriesInfo, []);
  useEffect(() => {
    const measursInfo = infoMeasur.map((measure) => ({
      ...measure,
    }));

    const addedInfo = infoCountry.map(
      ({ flags, altSpellings, capitalInfo, capital }) => ({
        flag: flags.png,
        initial: altSpellings[0],
        coordinates: capitalInfo.latlng,
        capital: capital,
      })
    );
    const allBlendedInfo = apiMatchedValues(measursInfo, addedInfo);

    setCleanData(allBlendedInfo);
  }, [infoMeasur, infoCountry]);

  const handleMapPageInfo = (name, locations, sources, count) => {
    setMapPageInfo((prevState) => [
      {
        ...prevState,
        name: name,
        locations: locations,
        sources: sources,
        count: count,
      },
    ]);
    console.log(mapPageInfo);
  };

  // ===============================================
  // !!! if you want to get all logs info uncomment !!!
  // const show = () => {
  //   console.log('MeasurInfo', infoMeasur);
  //   console.log('InfoCountry', infoCountry);
  //   console.log('cleanData', cleanData);
  // };
  // !!! don't forget to uncomment onclick button below !!!
  // ===============================================

  return (
    <div className='font-serif text-lg text-gray-800 text-center container my-12 mx-auto bg-blue-50 rounded-xl'>
      <h1 className='text-center text-blue-600 text-2xl font-bold pt-6'>
        API OPENAQ
      </h1>
      {/* ** <button onClick={show}>click</button> ** */}
      <br />
      <SearchBar onChange={(e) => setQuery(e.target.value)} value={query} />
      <ul className='p-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
        {filterByCountry.map((card, index) => {
          return (
            <li
              key={index}
              className='justify-center  w-30 mt-10 m-auto py-1 px-2 lg:mt-16 max-w-sm bg-white dark:bg-gray-800 rounded-xl border border-gray-400 mb-6  m-5 shadow-2xl'
            >
              <h1 className='font-bold'>{card.name}</h1>

              {card.nestedInfo.map(
                ({ capital, flag, coordinates, initial }, index) => {
                  return (
                    <div key={index}>
                      <Link to={`/Map/${initial}`}>
                        <img
                          onClick={() => {
                            setCoordinates(coordinates);
                            handleMapPageInfo(
                              card.name,
                              card.locations,
                              card.sources,
                              card.count
                            );
                          }}
                          src={flag}
                          alt='flag'
                        />
                      </Link>

                      <div>Capital : {capital}</div>
                      <Link to={`/Map/${initial}`}>
                        <button
                          type='button'
                          className='text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800'
                          onClick={() => {
                            setCoordinates(coordinates);
                            handleMapPageInfo(
                              card.name,
                              card.locations,
                              card.sources,
                              card.count
                            );
                          }}
                        >
                          <p className='underline decoration-solid'>
                            View More
                          </p>
                          <svg
                            className='w-5 h-5'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              fillRule='evenodd'
                              d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                              clipRule='evenodd'
                            ></path>
                          </svg>
                        </button>
                      </Link>
                    </div>
                  );
                }
              )}

              <p>
                Measurements :{' '}
                {new Intl.NumberFormat('de-DE').format(card.count)}
              </p>
              <p>Locations : {card.locations}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
