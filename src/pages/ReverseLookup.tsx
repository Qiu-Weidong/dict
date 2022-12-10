import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {
  Button, Container, Card,
  TextField, CardContent, List, ListItem, ListItemText, ListItemButton,
  Pagination,
  Drawer
} from '@mui/material';
import logo from '../assets/icon.svg';
import React, { Fragment } from 'react';
import sqlite from '../sqlite';
import { Traditionalized, Simplized } from '../translate';
import { DictItem, DictItemDisplay, DictListDisplay } from '../components/Mdict';
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
    this.state = {
      datas: [
        {
          character: '说明',
          explain: '输入框中输入要查询的文本，用 | 隔开'
        }]
    }
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

            {/* <Box sx={{ flexGrow: 1 }} /> */}
            <Button color='inherit'>首頁</Button>
            <Button color='inherit'>設置</Button>
            <Button color='inherit'>正查</Button>
          </Toolbar>
        </AppBar>
        {/* <Toolbar></Toolbar> */}
        <Container sx={{ m: 'auto', maxWidth: '650px', padding: '30px 5px' }}>
          {
            this.state.datas.length > 0 ? <ResultDisplay >{this.state.datas}</ResultDisplay>
              : <NotFound ></NotFound>
          }

        </Container>

      </Box>
    );
  }

  search(): void {
    this.input = this.input.trim();
    let queries = this.input.split('|');
    const query_set = new Set<string>();

    for (const q of queries) {
      const query = q.trim();
      const tra = Traditionalized(query);
      const sim = Simplized(query);
      query_set.add(tra);
      query_set.add(sim);
      query_set.add(query);
    }

    // console.log(query_set);

    let sql = " select \
                  Dictionary.character, Explain.explain \
                from \
                  Dictionary, Explain \
                where \
                  Dictionary.id = Explain.dictionary_id and (\
                ";

    for (const query of query_set) {
      sql += (" or Explain.explain like '%" + query + "%'");
    }

    sql = sql.replace("or ", "");
    sql += ");";

    sqlite.select<{ character: string, explain: string }[]>(sql).then(datas => {
      for (let data of datas) {
        for (const query of query_set) {
          data.explain = data.explain.replaceAll(query, `<span style="background: yellow;">${query}</span>`);
        }
      }
      this.setState({ datas });
    });

  }


}


class ResultDisplay extends React.Component<
  { children: ResultType },
  { currentPage: number, totalPage: number, showDrawer: boolean, details: DictItem[] }
> {

  num_per_page: number;

  constructor(props: any) {
    super(props);
    this.num_per_page = 10; // 每页显示10条

    this.state = {
      currentPage: 1,
      totalPage: Math.ceil(this.props.children.length / this.num_per_page),
      showDrawer: false,
      details: []
    }
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
                  <ListItemButton onClick={() => {
                    console.info(item.character)
                    const query = item.character;
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
                      this.setState({ details: result, showDrawer: true });
                    });
                    // this.setState({ showDrawer: true });
                  }}>
                    <ListItemText
                      primary={item.character}
                      secondary={<span dangerouslySetInnerHTML={{ __html: item.explain }}></span>}
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
            <Container style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'paddingTop': '8px' }}>
              <Pagination count={this.state.totalPage}
                color="secondary" page={this.state.currentPage}
                onChange={(_e, page) => this.setState({ currentPage: page })} />
            </Container> : ''
        }
        <Drawer
          anchor="left"
          open={this.state.showDrawer}
          onClose={() => this.setState({ showDrawer: false })}
          color="transparent"
          sx={{ bgColor: 'transparent' }}
          
        >
          <DictListDisplay >{this.state.details}</DictListDisplay>
        </Drawer>
      </Fragment>
    );
  }

}


