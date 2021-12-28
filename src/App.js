import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Home from './pages/Home';
import Map from './pages/Map';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Map/:id' element={<Map />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
