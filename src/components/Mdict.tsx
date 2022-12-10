import { Card, CardContent, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import Chip from "@mui/material/Chip";
import eventBus from "../eventbus";
import { Fragment } from "react";
// import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from "@mui/material";
import NotFound from '../components/404';


export interface DictItem {
  character: string,
  blocks?: Block[],
  prefix?: string[],
  related?: string[],
  link?: string
}

interface Block {
  header: Header,
  content: Content[][]
}

interface Header {
  character: string,
  level?: string,
  pronunciation?: string,
  radical?: string,
  strokes?: number,
  struct?: string,
  variant?: string
}

interface Content {
  type?: string,
  explain?: string,
  subcontent?: SubContent[],
  examples?: string[]
}

interface SubContent {
  explain?: string,
  examples?: string[]
  type?: string
}

function jump(word: string, character: string) {
  const re = /～+/g;
  const new_word = word.replaceAll(re, character);
  // console.log(new_word);
  eventBus.emit('search', new_word);
}


export function DictItemDisplay(props: { children: DictItem }) {
  const show_title = props.children.blocks ? false : true;
  const show_prefix: boolean = props.children.prefix ? true : false;
  const show_related: boolean = props.children.related ? true : false;
  return (
    <Fragment >

      {
        /* 首先展示 character, 如果没有 block的话 */
        show_title ? <CardHeader
          avatar={
            <h1>{props.children.character}</h1>
          } /> : ''
      }

      {/* 接下来展示 blocks */
        props.children.blocks?.map((block, index) => <BlockDisplay key={index} >{block}</BlockDisplay>)
      }

      {
        /* 接下来展示词头 */
        show_prefix ? <CardContent><Chip label="词头" size="small" color="info" />
          {
            props.children.prefix?.map((word, index) => <Chip size="small"
              variant="outlined" label={word}
              onClick={() => jump(word, props.children.character)}
              key={index}
              color="info"
              sx={{ m: '1px 2px', }}
            />)
          }</CardContent> : ''
      }

      {/* 接下来展示相关词 */
        show_related ? <CardContent ><Chip label="相关词" size="small" color="secondary" />
          {
            props.children.related?.map((word, index) => <Chip
              onClick={() => jump(word, props.children.character)}
              size="small"
              color='secondary'
              sx={{ m: '1px 2px' }}
              variant='outlined'
              key={index}
              label={word} />)
          }</CardContent> : ''
      }

      {/* 最后展示链接 */
        props.children.link ? <CardContent>见 `<Chip
          size="small" color="success" variant="outlined" onClick={() => jump(props.children.link as string, props.children.character)}
          label={props.children.link} />`</CardContent> : ''
      }
    </Fragment>
  );
}

function ContentDisplay(props: { children: Content }) {
  return (
    <ListItem>
      <ListItemText
        primary={<Fragment>
          <b>{props.children.type ? '[' + props.children.type + '] ' : ''}</b>
          {props.children.explain}
        </Fragment>}
        secondary={
          <Fragment>
            {/*  例子 */}
            <List component="div">
              {
                props.children.examples?.map((exam, index) => <ListItem key={index}>{exam}</ListItem>)
              }
            </List>

            {/* subcontent */}
            <List component="div">
              {
                props.children.subcontent?.map((item, index) =>
                  <ListItem key={index}>
                    <div style={{ 'minWidth': '20%' }}><b>{item.type ? <b>[{item.type}]</b> : ''} {item.explain}</b></div>
                    <List>
                      {item.examples?.map(exam => <ListItem>{exam}</ListItem>)}
                    </List>
                  </ListItem>
                )
              }
            </List>
          </Fragment>
        }
      />


    </ListItem>


  );
}

function ContentListDisplay(props: { children: Content[], index: number }) {
  return (
    <ListItem >
      <ListItemAvatar>
        <Avatar>{props.index + 1}</Avatar>
      </ListItemAvatar>
      <ListItemText primary={
        <List >
          {
            props.children.map((content, index) => <ContentDisplay key={index}>{content}</ContentDisplay>)
          }
        </List>
      } />

    </ListItem >
  );
}

function BlockDisplay(props: { children: Block }) {
  const total = props.children.content.length;
  const header = props.children.header;

  return (
    <Fragment >
      {/* <HeaderDisplay header={props.block.header} /> */}
      <CardHeader
        avatar={
          <h1>{header.character}</h1>
        }
        title={header.pronunciation}
        subheader={
          <Fragment>
            {header.radical ? <span style={{ 'paddingRight': '15px' }}><b>部首:</b>{header.radical}</span> : ''}
            {header.strokes ? <span style={{ 'paddingRight': '15px' }}><b>笔画:</b>{header.strokes}</span> : ''}
            {header.struct ? <span style={{ 'paddingRight': '15px' }}><b>结构:</b>{header.struct}</span> : ''}
            {header.variant ? <span style={{ 'paddingRight': '15px' }}><b>异体字:</b>{header.variant}</span> : ''}
          </Fragment>
        }
      />
      <CardContent >
        <List>
          {
            props.children.content.map((contents, index) =>
              <Fragment key={index}>
                <ContentListDisplay index={index}>{contents}</ContentListDisplay>
                {
                  index < total - 1 ? <Divider variant="inset" component="li" /> : ''
                }
              </Fragment>
            )
          }
        </List>
      </CardContent>
    </Fragment>
  );
}


export function DictListDisplay(props: { children: DictItem[] }) {
  if (props.children.length <= 0)
    return <NotFound />;

  else
    return (
      <Stack spacing={2}>
        <Card raised>
          {props.children.map((item, index) => <DictItemDisplay key={index} >{item}</DictItemDisplay>)}
        </Card>
      </Stack>
    );
}

