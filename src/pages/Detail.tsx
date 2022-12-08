import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Search from '../components/Search';
import { Button } from '@mui/material';
import logo from '../assets/icon.svg';
import React from 'react';
import sqlite from '../sqlite';


export default class Detail extends React.Component {
  query: string;  // 查询的汉字

  constructor(props: any) {
    super(props);
    this.query = props.location.state.query || '';
  }

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
            <Search onSearch={(param) => this.search(param) } defaultValue={this.query} />
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

  search(value: string):void {
    this.query = value.trim();
    if(! this.query) return;

    // console.log('查询了', this.query);
    sqlite.select("select json from Dictionary where character = '" + this.query + "';").then(data => {
      console.log('查询结果', data);
    });
  }

  componentDidMount(): void {
    this.search(this.query);
  }
}

