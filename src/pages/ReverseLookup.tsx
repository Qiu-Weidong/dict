import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {
  Button, Container, Card,
  TextField, CardContent, List, ListItem, ListItemText, ListItemButton,
  Pagination, Stack
} from '@mui/material';
import logo from '../assets/icon.svg';
import React, { Fragment, useState } from 'react';
import sqlite from '../sqlite';
import { Traditionalized, Simplized } from '../translate';
import { DictItem, DictItemDisplay } from '../components/Mdict';
import NotFound from '../components/404';
import SearchIcon from '@mui/icons-material/Search';


type ResultType = { character: string, explain: string }[];

export default class ReverseLookup extends React.Component<
  { history: any, match: any },
  { datas: ResultType }
> {

  input: string;

  constructor(props: any) {
    super(props);
    this.input = '';
    this.state = { datas: [] }
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


            <TextField id="standard-basic" fullWidth
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
        <Container sx={{ m: 'auto', maxWidth: '650px', padding: '30px 5px' }}>
          <ResultDisplay >{this.state.datas}</ResultDisplay>
        </Container>

      </Box>
    );
  }

  search(): void {
    console.log(this.input);
    this.input = this.input.trim();

    sqlite.select<ResultType>("select Dictionary.character, Explain.explain\
                    from\
                    Dictionary, Explain\
                    where Dictionary.id = Explain.dictionary_id and\
                    Explain.explain like '%" + this.input + "%'").then(data => {
      console.log(data);
      this.setState({ datas: data });
    });

  }


}


class ResultDisplay extends React.Component<
  { children: ResultType },
  { currentPage: number, totalPage: number }
> {

  num_per_page: number;

  constructor(props: any) {
    super(props);
    this.num_per_page = 10; // 每页显示10条

    this.state = {
      currentPage: 1,
      totalPage: Math.ceil(this.props.children.length / this.num_per_page)
    }
    // 需要渲染的部分
    // (current_page - 1) * num_per_page,  current_page * num_per_page
  }

  componentDidUpdate(prevProps: Readonly<{ children: ResultType; }>,
    prevState: Readonly<{ currentPage: number; totalPage: number; }>,
    snapshot?: any): void {
    if (prevProps.children !== this.props.children) {
      this.setState({
        currentPage: 1,
        totalPage: Math.ceil(this.props.children.length / this.num_per_page)
      })
    }
  }

  render(): React.ReactNode {
    return (
      <Fragment>
        <Card raised>
          <CardContent >
            <List >
              {
                this.props.children.slice((this.state.currentPage - 1) * this.num_per_page,
                  Math.min(this.props.children.length, this.state.currentPage * this.num_per_page)
                ).map((item, index) => <ListItem key={index}>
                  <ListItemButton onClick={() => console.info(item.character)}>
                    <ListItemText
                      primary={item.character}
                      secondary={item.explain}
                    ></ListItemText>
                  </ListItemButton>
                </ListItem>)
              }
            </List>
          </CardContent>
        </Card>
        {
          // 大于一页才分页
          this.state.totalPage > 1 ?
            <Container style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
              <Pagination count={this.state.totalPage}
                color="secondary" page={this.state.currentPage}
                onChange={(_e, page) => this.setState({ currentPage: page })} />
            </Container> : ''
        }</Fragment>
    );
  }

}


