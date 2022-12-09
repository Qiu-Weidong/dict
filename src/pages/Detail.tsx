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
  { history: any, match: any },
  { datas: DictItem[] }
> {

  constructor(props: any) {
    super(props);
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
            <Search onSearch={(param) => this.search(param)} />
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
    const query = value.trim();
    if (! query) return;

    const result: DictItem[] = [];
    const sim = Simplized(query);
    const tra = Traditionalized(query);

    sqlite.select<{ json: string, character: string }[]>("select json, character from Dictionary          \
                    where character = '" + sim + "'     \
                    or character = '" + tra + "'        \
                    or character = '"+ query + "'  \
                    ;").then(datas => {
      for (const data of datas) {
        const item: DictItem = { ...JSON.parse(data.json), character: data.character };
        console.log(item);
        result.push(item);
      }
      this.setState({ datas: result });
    });


  }

  componentDidMount(): void {
    eventBus.addListener('search', (msg) => this.search(msg) );

    const query = this.props.match.params.query.trim() || '';
    this.search(query);

    // 如果不是直接在搜索框中点击search，那么需要发送一个消息来同步搜索框
    eventBus.emit('search', query);
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
        { props.items.map((item, index) => <DictItemDisplay key={index} item={item} />) }
      </Stack>
    );
}


