import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import ProfileChoice from './ProfileChoice/ProfileChoice';
import Device from './Device/Device';
import Setting from './Setting/Setting';

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProfileChoice />} />
          <Route path='/Device' element={<Device/>} />
          <Route path='/Setting' element={<Setting />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;