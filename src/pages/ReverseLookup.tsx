import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Button, Container, Stack, TextField } from '@mui/material';
import logo from '../assets/icon.svg';
import React, { Fragment } from 'react';
import sqlite from '../sqlite';
import { Traditionalized, Simplized } from '../translate';
import { DictItem, DictItemDisplay } from '../components/Mdict';
import NotFound from '../components/404';
import SearchIcon from '@mui/icons-material/Search';


export default class ReverseLookup extends React.Component<
  { history: any, match: any }
> {

  input: string;
  constructor(props: any) {
    super(props);
    this.input = '';
  }

  render(): React.ReactNode {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" variant='elevation' color='default' >
          <Toolbar>
            <IconButton onClick={() => this.props.history.push("/home")}
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ m: 1, mr: 3 }}
            >
              <img src={logo} height={54} />
            </IconButton>


            <TextField id="standard-basic"
              label="請輸入要反查的文本" variant="standard"

              InputProps={{
                endAdornment: (
                  <Fragment>
                    <IconButton
                      onClick={() => this.search()}
                      type="button" aria-label="search">
                      <SearchIcon />
                    </IconButton>
                  </Fragment>
                )
              }}

              onChange={(e) => this.input = e.currentTarget.value}
            >
            </TextField>

            <Box sx={{ flexGrow: 1 }} />
            <Button color='inherit'>首頁</Button>
            <Button color='inherit'>設置</Button>
          </Toolbar>
        </AppBar>
        {/* <Toolbar></Toolbar> */}
        <Container sx={{ position: 'relative' }}>
          <Container sx={{ m: 'auto', maxWidth: '650px', padding: '30px 5px' }}>
          </Container>
        </Container>
      </Box>
    );
  }

  search(): void {
    console.log(this.input);
    this.input = this.input.trim();

    sqlite.select("select Dictionary.character, Dictionary.json, Explain.explain\
                    from\
                    Dictionary, Explain\
                    where Dictionary.id = Explain.dictionary_id and\
                    Explain.explain like '%" + this.input + "%'").then(data => {
      console.log(data);
    })
  }


}





