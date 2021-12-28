import React from 'react';

const SearchBar = (props) => {
  return (
    <>
      <input
        className='border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none'
        type='search'
        name='search'
        onChange={props.onChange}
        value={props.query}
        autoComplete='on'
        placeholder='Search by country'
      />
    </>
  );
};

export default SearchBar;
