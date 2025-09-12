import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Header from './components/common/Header';
import Animated from './components/common/Animated';

function App() {
  return (
    <>
      <BrowserRouter>
      <Animated/>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='/dashboard' element={<Dashboard/>}/> 
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
