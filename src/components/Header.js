import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className='text-blue-600 text-center text-gray-800 text-2xl font-bold pt-6'>
        <h1>API OPENAQ</h1>
      </div>

      <nav>
        <ul className='md:flex items-center space-x-1'>
          <li className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2'>
            <Link to='/'>BACK TO HOME PAGE</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
