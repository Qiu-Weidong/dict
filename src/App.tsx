import Home from "./pages/Home";
import Detail from './pages/Detail';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ToolBox from "./components/ToolBox";
import NotFound from "./components/404";

function App() {
  const bg_url = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/brige.jpg';

  return (
    <Router>
      <img src={bg_url} alt="" className="background-img"/>
      <Route path="/home" component={Home} />
      <Route path="/detail" component={Detail} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={ToolBox} />


      <Redirect exact path="/" to="/home" />
    </Router>

  );
}

export default App;
