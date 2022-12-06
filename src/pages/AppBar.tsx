import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Search from '../components/Search';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant='outlined' color='transparent'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ textAlign: 'center'}}>
            <Search  /> 
          </Box>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Toolbar></Toolbar>



      
    </Box>
  );
}