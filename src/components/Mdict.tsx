import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Divider } from "@mui/material";
import eventBus from "../eventbus";
import { workerData } from "worker_threads";


export interface DictItem {
  character: string,
  blocks?: Block[],
  prefix?: string[],
  related?: string[],
  link?: string
}

interface Block {
  header: {
    charactor: string,
    level?: string,
    pronunciation?: string,
    radical?: string,
    strokes?: number,
    struct?: string,
    variant?: string
  },
  content: Content[][]
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

  return (
    <Card raised >
      {/* 首先展示 character */}
      <h1>{props.item.character}</h1>

      <Divider />
      {/* 接下来展示 blocks */}
      {props.item.blocks?.map( (block, index) => <BlockDisplay block={block} key={index} ></BlockDisplay>)}

      {/* 接下来展示词头 */}
      <Chip label="词头" size="small" color="info" />
      {
        props.item.prefix?.map((word, index) => <Chip size="small"
        variant="outlined" label={word}
        onClick={() => jump(word, props.item.character) }
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
          onClick={() => jump(word, props.item.character) }
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
        label={props.item.link}/>`</span> : ''}
    </Card>
  );
}


function BlockDisplay(props: { block: Block }) {
  return (
    <div>{props.block.header.charactor}</div>
  );
}

// export default withRouter(DictItemDisplay);
