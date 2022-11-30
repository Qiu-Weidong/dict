import Home from "./pages/Home";
import Test from './pages/Test';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToolBox from "./components/ToolBox";

function App() {

  // 从数据库读取主题配置
  const bg_url = "https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/wallhaven-47z5vy.jpg";

  return (
    <Router>
      <img src={bg_url} className="background-img"
      />


      <Routes>
        <Route path="/" element={< Home />} />
        <Route path="/test" element={< Test />} />
      </Routes>
      <ToolBox />
    </Router>
  );
}

export default App;
