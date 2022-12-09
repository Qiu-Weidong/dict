import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardHeader, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import Chip from "@mui/material/Chip";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import eventBus from "../eventbus";
import { Fragment } from "react";
// import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar } from "antd";


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
}

function jump(word: string, character: string) {
  const re = /～+/g;
  const new_word = word.replaceAll(re, character);
  // console.log(new_word);
  eventBus.emit('search', new_word);
}


export function DictItemDisplay(props: { item: DictItem }) {
  const show_title = props.item.blocks ? false : true;
  const show_prefix: boolean = props.item.prefix ? true : false;
  const show_related: boolean = props.item.related ? true : false;
  return (
    <Card raised >

      {
        /* 首先展示 character, 如果没有 block的话 */
        show_title ? <HeaderDisplay header={{ character: props.item.character }} /> : ''
      }

      {/* 接下来展示 blocks */
        props.item.blocks?.map((block, index) => <BlockDisplay block={block} key={index} ></BlockDisplay>)
      }

      {
        /* 接下来展示词头 */
        show_prefix ? <CardContent><Chip label="词头" size="small" color="info" />
          {
            props.item.prefix?.map((word, index) => <Chip size="small"
              variant="outlined" label={word}
              onClick={() => jump(word, props.item.character)}
              key={index}
              color="info"
              sx={{ m: '1px 2px', }}
            />)
          }</CardContent> : ''
      }

      {/* 接下来展示相关词 */
        show_related ? <CardContent ><Chip label="相关词" size="small" color="secondary" />
          {
            props.item.related?.map((word, index) => <Chip
              onClick={() => jump(word, props.item.character)}
              size="small"
              color='secondary'
              sx={{ m: '1px 2px' }}
              variant='outlined'
              key={index}
              label={word} />)
          }</CardContent> : ''
      }

      {/* 最后展示链接 */
        props.item.link ? <CardContent>见 `<Chip
          size="small" color="success" variant="outlined" onClick={() => jump(props.item.link as string, props.item.character)}
          label={props.item.link} />`</CardContent> : ''
      }
    </Card>
  );
}

function HeaderDisplay(props: { header: Header }) {
  const header = props.header;

  return (
    <CardHeader
      avatar={
        <h1>{props.header.character}</h1>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={props.header.pronunciation}
      subheader={
        <Fragment>
          {header.radical ? <span style={{ 'paddingRight': '15px' }}><b>部首:</b>{header.radical}</span> : ''}
          {header.strokes ? <span style={{ 'paddingRight': '15px' }}><b>笔画:</b>{header.strokes}</span> : ''}
          {header.struct ? <span style={{ 'paddingRight': '15px' }}><b>结构:</b>{header.struct}</span> : ''}
          {header.variant ? <span style={{ 'paddingRight': '15px' }}><b>异体字:</b>{header.variant}</span> : ''}
        </Fragment>
      }
    />
  );
}

function ContentDisplay(props: { content: Content }) {
  return (
    <Fragment>
      <ListItem>
        <ListItemText
          primary={<Fragment>
            <b>{props.content.type ? '[' + props.content.type + ']' : ''}</b>
            {props.content.explain}
          </Fragment>}
          secondary={
            <List component="div">
              {
                props.content.examples?.map((exam, index) => <ListItem key={index}>{exam}</ListItem>)
              }
            </List>
          }
        />


      </ListItem>

    </Fragment>

  );
}

function ContentListDisplay(props: { contents: Content[], index: number }) {
  return (
    // <Fragment >
      <ListItem >
        <ListItemAvatar>
          <Avatar>{props.index + 1}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={
          <List >
            {
              props.contents.map((content, index) => <ContentDisplay content={content} key={index}></ContentDisplay>)
            }
          </List>
        } />

      </ListItem >
    //   {/* {
    //     props.index < props.total - 1 ? <Divider variant="inset" component="li" /> : ''
    //   }

    // </Fragment> */}
  );
}

function BlockDisplay(props: { block: Block }) {
  const total = props.block.content.length;
  return (
    <Fragment >
      <HeaderDisplay header={props.block.header} />
      {/* <Divider /> */}
      <CardContent >
        <List>
          {
            props.block.content.map((contents, index) => 
              <Fragment>
                <ContentListDisplay index={index} contents={contents} key={index} />
                {
                  index < total - 1 ? <Divider variant="inset" component="li" /> : ''
                }
              </Fragment>
            )
          }
        </List>
      </CardContent>
      {/* <Divider variant="inset" /> */}
    </Fragment>
  );
}


