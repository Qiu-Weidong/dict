import { Avatar, Card, CardHeader, Divider, IconButton } from "@mui/material";
import Chip from "@mui/material/Chip";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import eventBus from "../eventbus";
import { red } from "@mui/material/colors";
import { Fragment } from "react";


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
        /* 首先展示 character */
        show_title ? <HeaderDisplay header={{ character: props.item.character }} /> : ''
      }



      {/* 接下来展示 blocks */}
      {props.item.blocks?.map((block, index) => <BlockDisplay block={block} key={index} ></BlockDisplay>)}

      {/* 接下来展示词头 */}
      <Chip label="词头" size="small" color="info" />
      {
        props.item.prefix?.map((word, index) => <Chip size="small"
          variant="outlined" label={word}
          onClick={() => jump(word, props.item.character)}
          key={index}
          color="info"
          sx={{ m: '1px 2px', }}
        />)
      }

      <br />
      {/* 接下来展示相关词 */}
      <Chip label="相关词" size="small" color="secondary" />
      {
        props.item.related?.map((word, index) => <Chip
          onClick={() => jump(word, props.item.character)}
          size="small"
          color='secondary'
          sx={{ m: '1px 2px' }}
          variant='outlined'
          key={index}
          label={word} />)
      }
      <br />

      {/* 最后展示链接 */}
      {props.item.link ? <span>见 `<Chip
        size="small" color="success" variant="outlined" onClick={() => jump(props.item.link as string, props.item.character)}
        label={props.item.link} />`</span> : ''}
    </Card>
  );
}

function HeaderDisplay(props: { header: Header }) {
  const header = props.header;

  return (
    <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{ 'backgroundColor': 'transparent', 'color': 'black', 'fontWeight': 'bold' }} >
            {props.header.character}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.header.pronunciation}
        subheader={ 
          <Fragment>
            { header.radical ? <span style={{ 'paddingRight': '15px' }}><b>部首:</b>{header.radical}</span> : '' }
            { header.strokes ? <span style={{ 'paddingRight': '15px' }}><b>笔画:</b>{header.strokes}</span> : '' }
            { header.struct ? <span style={{ 'paddingRight': '15px' }}><b>结构:</b>{header.struct}</span> : '' }
            { header.variant ? <span style={{ 'paddingRight': '15px' }}><b>异体字:</b>{header.variant}</span> : '' }
          </Fragment> 
        }
      />
  );
}
function BlockDisplay(props: { block: Block }) {
  return (
    <HeaderDisplay header={props.block.header}/>
  );
}

// export default withRouter(DictItemDisplay);
