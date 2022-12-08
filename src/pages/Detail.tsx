import { useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Search from '../components/Search';
import { Button } from '@mui/material';
import logo from '../assets/icon.svg';
import React from 'react';


export default class Detail extends React.Component {
  render(): React.ReactNode {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" variant='elevation' color='default'>
          <Toolbar>
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ m: 1, mr: 3 }}
            >
              <img src={logo} height={54} />
            </IconButton>
            <Search onSearch={(param) => console.log(param)} />
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

