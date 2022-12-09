import Home from "./pages/Home";
import Detail from './pages/Detail';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ToolBox from "./components/ToolBox";
import NotFoundPage from "./pages/404";

function App() {
  const bg_url = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/brige.jpg';

  return (
    <Router>
      <img src={bg_url} alt="" className="background-img" />
      <Switch >
        <Redirect from="/" to='/home' exact  />
        <Route path="/detail/:query" component={Detail} />
        <Route path="/home" component={Home} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Route path="*" component={ToolBox} />
    </Router>

  );
}

export default App;
