import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Search from '../components/Search';
import { Button, Container, Card } from '@mui/material';
import logo from '../assets/icon.svg';
import React, { Fragment } from 'react';
import sqlite from '../sqlite';
import { Traditionalized, Simplized } from '../translate';
import { DictItem } from '../components/Mdict';


export default class Detail extends React.Component<
  { history: any },
  { datas: DictItem[] }
> {
  query: string;  // 查询的汉字

  constructor(props: any) {
    super(props);
    this.query = props.location.state.query || '';
    this.state = { datas: [] };
  }

  render(): React.ReactNode {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" variant='elevation' color='default'>
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
            <Search onSearch={(param) => this.search(param)} defaultValue={this.query} />
            <Box sx={{ flexGrow: 1 }} />
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: '1%' }}>
          <DictListDisplay items={this.state.datas} />
        </Container>
      </Box>
    );
  }

  search(value: string): void {
    this.query = value.trim();
    if (!this.query) return;

    const result: DictItem[] = [];
    const sim = Simplized(this.query);
    const tra = Traditionalized(this.query);

    sqlite.select<{ json: string, character: string }[]>("select json, character from Dictionary          \
                    where character = '" + sim + "'     \
                    or character = '" + tra + "'        \
                    or character = '"+ this.query + "'  \
                    ;").then(datas => {
      for (const data of datas) {
        const item: DictItem = { ...JSON.parse(data.json), character: data.character };
        result.push(item);
      }
      this.setState({ datas: result });
    });
  }

  componentDidMount(): void {
    this.search(this.query);
  }
}


function DictListDisplay(props: { items: DictItem[] }) {
  if (props.items.length <= 0)
    return (<Card>没有数据</Card>);

  else
    return (
      <Fragment >
        {props.items.map(item => <DictItemDisplay item={item} />)}
      </Fragment>
    );
}

function DictItemDisplay(props: { item: DictItem }) {
  return (
    <Card >
      {props.item.character}
    </Card>
  );
}

