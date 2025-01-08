import './App.css';
import { Routes, Route , Link} from 'react-router-dom';
import HomePage from './pages/Home';  
import CountriesPage from './pages/Countries';
import ContactPage from './pages/Contact';

function App() {
  return (
    <div className="App">
      <header><h1>Hello</h1></header>
      <div className='body_web'>
        <nav>
          <ul>
            <li style={{ color: 'white' }}><Link to='/'>Home</Link></li>
            <li><Link to='/countries'>Countries</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
          </ul>
        </nav>
        <div className='Content_main'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/countries" element={<CountriesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </div>
    </div>
    
  );
}

export default App;
