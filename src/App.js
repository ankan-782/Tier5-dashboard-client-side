import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './Components/HomePageFolder/HomePage/HomePage';
import Navbar from './Components/Shared/Navbar/Navbar';
import Footer from './Components/Shared/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path='' element={<HomePage/>}/>
        <Route path='home' element={<HomePage/>}/>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
