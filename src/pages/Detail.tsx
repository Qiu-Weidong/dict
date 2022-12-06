import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '../components/Search';
import { Button } from '@mui/material';
import logo from '../assets/icon.svg';


function Detail() {
  const location = useLocation();

  let query: string = location.state.query;
  query = query.trim();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant='elevation' color='transparent'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <img src={logo} width={32} />
          </IconButton>
          <Search />
          <Box sx={{ flexGrow: 1 }}/>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default Detail;