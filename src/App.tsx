import Home from "./pages/Home";
import Detail from './pages/Detail';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ToolBox from "./components/ToolBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {

  // 从数据库读取主题配置
  const dark = createTheme({
    palette: {
      // mode: 'dark'
      mode: 'light'
    }
  });

  return (
    // <ThemeProvider theme={dark}>
    <div>
      <Router>
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/detail" element={< Detail />} />
        </Routes>
{/* <ToolBox /> */}
      </Router>
      
    </div>

  );
}

export default App;
