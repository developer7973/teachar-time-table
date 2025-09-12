import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Tables from './pages/Tables';
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
        <Route path='/' element={<Dashboard/>}/> 
        <Route path='/tables' element={<Tables/>}/> 
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
