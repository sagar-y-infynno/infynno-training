import './App.css';
import Home from './components/Home';
import TopNav from './components/TopNav';
import SideBox from './components/SideBox';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <header> */}
        {/* <TopNav />
        <SideBox /> */}
        {/* <Home /> */}
      {/* </header> */}
      <Routes> 
        <Route exact path="/" element={<Home/>} >
          <Route exact path="watch/:movie_id" element={<Home/>} />
        </Route>
      </Routes>
      {/* <MustWatchSlider /> */}
    </div>
  );
}

export default App;
