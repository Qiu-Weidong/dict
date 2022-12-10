import Home from "./pages/Home";
import Detail from './pages/Detail';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ToolBox from "./components/ToolBox";
import NotFoundPage from "./pages/404";
import ReverseLookup from "./pages/ReverseLookup";
import Background from "./components/Background";

function App() {
  return (
    <Router>
      {/* <img src={bg_url} alt="" className="background-img" /> */}
      <Background />
      <Switch >
        <Redirect from="/" to='/home' exact  />
        <Route path="/detail/:query" component={Detail} />
        <Route path="/detail" exact component={Detail} />
        <Route path="/home" component={Home} />
        <Route path="/reverselookup" component={ReverseLookup} />
        
        <Route path="*" component={NotFoundPage} />
      </Switch>
      <Route path="*" component={ToolBox} />
    </Router>

  );
}

export default App;
