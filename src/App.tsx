import Home from "./pages/Home";
import Detail from './pages/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToolBox from "./components/ToolBox";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/detail" element={< Detail />} />
      </Routes>
      <ToolBox />
    </Router>

  );
}

export default App;
