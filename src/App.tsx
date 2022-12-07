import Home from "./pages/Home";
import Detail from './pages/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToolBox from "./components/ToolBox";
import ButtonAppBar from "./pages/AppBar";

function App() {
  const bg_url = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/brige.jpg';

  return (
    <Router>
      <img src={bg_url} alt="" className="background-img"/>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/detail" element={< Detail />} />
        <Route path="/appbar" element={ <ButtonAppBar />   } />
      </Routes>
      <ToolBox />
    </Router>

  );
}

export default App;
