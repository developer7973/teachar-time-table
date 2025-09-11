import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Page4 from './pages/Page4';
import Page3 from './pages/Page3';
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
        <Route path='/p2' element={<Page2/>}/> 
        <Route path='/p3' element={<Page3/>}/> 
        <Route path='/p4' element={<Page4/>}/> 
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
