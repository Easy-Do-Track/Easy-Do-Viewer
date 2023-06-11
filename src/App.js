import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import ProfileChoice from './ProfileChoice/ProfileChoice';
import Device from './Device/Device';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProfileChoice />} />
          <Route path='/Device' element={<Device/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;