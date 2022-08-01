import './App.css';
import Home from './pages/Home';
import ScoreBoard from './pages/ScoreBoard';
import Player from './pages/Player';
import Test from './pages/Test';
import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
      <Header />
      <section className='main mt-[50px] md:mt-[70px] font-noto'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/score/:stage_id/:fix_id" element={<ScoreBoard />} />
          <Route exact path="/player/:player_id" element={<Player />} />
          {/* <Route exact path="/" element={<Test />} /> */}
          <Route path="*" element={<p>404 Page Not Found.</p>} />
        </Routes>
      </section>
      <Footer />
    </>
  );
}

export default App;
