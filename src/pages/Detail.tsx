import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Search from '../components/Search';
import { Container, Stack } from '@mui/material';
import logo from '../assets/icon.svg';
import React from 'react';
import sqlite from '../sqlite';
import { Traditionalized, Simplized } from '../translate';
import { DictItem, DictItemDisplay } from '../components/Mdict';
import NotFound from '../components/404';
import eventBus from '../eventbus';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default class Detail extends React.Component<
  { history: any, match: any },
  { datas: DictItem[] }
> {
  queries: string[];

  constructor(props: any) {
    super(props);
    this.state = { datas: [] };
    this.queries = [];
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
            <Search onSearch={(param) => this.search(param)} />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton >
              <MoreVertIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {/* <Toolbar></Toolbar> */}
        <Container sx={{ position: 'relative' }}>
          <Container sx={{ m: 'auto', maxWidth: '650px', padding: '30px 5px' }}>
            <DictListDisplay>{this.state.datas}</DictListDisplay>
          </Container>
          <IconButton style={{ 'position': 'fixed', 'top': '85px', 'left': '6px' }} 
            color="info"
            size='small'
            onClick={() => {
              console.info(this.queries);
              if(this.queries.length <= 1) { console.log(this.queries); return; }
              const current = this.queries.pop() || '';
              const last = this.queries.pop() || '';
              if(! last) return;
              this.search(last);
              eventBus.emit('search', last);
              console.info(this.queries);
            } }
          >
            <ArrowBackIcon />
          </IconButton>
        </Container>
      </Box>
    );
  }

  search(value: string): void {
    const query = value.trim();
    if (!query) return;

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
        // console.log(item);
        result.push(item);
      }
      this.setState({ datas: result });
    });

    if(this.queries.at(this.queries.length - 1) !== query)
      this.queries.push(query);
    // this.queries = Array.from(new Set(this.queries))
  }

  call_back = (param: string) => this.search(param);
  componentDidMount(): void {
    eventBus.addListener('search', this.call_back);

    const query = this.props.match.params.query.trim() || '';
    this.search(query);

    // 如果不是直接在搜索框中点击search，那么需要发送一个消息来同步搜索框
    eventBus.emit('search', query);
  }

  componentWillUnmount(): void {
    eventBus.removeListener('search', this.call_back);
  }
}


function DictListDisplay(props: { children: DictItem[] }) {
  if (props.children.length <= 0)
    return <NotFound />;

  else
    return (
      <Stack spacing={2}>
        {props.children.map((item, index) => <DictItemDisplay key={index} >{item}</DictItemDisplay>)}
      </Stack>
    );
}


