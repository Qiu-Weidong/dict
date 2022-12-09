import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Search from '../components/Search';
import { Button, Container, Card, Stack } from '@mui/material';
import logo from '../assets/icon.svg';
import React from 'react';
import sqlite from '../sqlite';
import { Traditionalized, Simplized } from '../translate';
import { DictItem, DictItemDisplay } from '../components/Mdict';
import NotFound from '../components/404';
import eventBus from '../eventbus';


export default class Detail extends React.Component<
  { history: any },
  { datas: DictItem[] }
> {
  query: string;  // 查询的汉字

  constructor(props: any) {
    super(props);
    this.query = props.match.params.query || '';
    this.query = this.query.trim();

    this.state = { datas: [] };
  }

  render(): React.ReactNode {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky" variant='elevation' color='default'>
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
        {/* <Toolbar></Toolbar> */}
        <Container sx={{ m: 'auto', maxWidth: '650px', padding: '30px 5px' }}>
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

    eventBus.addListener('search', (msg) => this.search(msg) );
  }

  componentWillUnmount(): void {
    eventBus.removeListener('search', (msg) => this.search(msg) );
  }
}


function DictListDisplay(props: { items: DictItem[] }) {
  if (props.items.length <= 0)
    return <NotFound />;

  else
    return (
      <Stack spacing={2}>
        { props.items.map(item => <DictItemDisplay item={item} />) }
      </Stack>
    );
}


