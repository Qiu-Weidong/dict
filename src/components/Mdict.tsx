import { Card } from "@mui/material";
import Chip from "@mui/material/Chip";
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";

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

export function DictItemDisplay(props: { item: DictItem }) {

  return (
    <Card raised >
      {/* 首先展示 character */}
      <h1>{props.item.character}</h1>

      <Divider />
      {/* 接下来展示 blocks */}
      {props.item.blocks?.map(block => <BlockDisplay block={block} ></BlockDisplay>)}

      {/* 接下来展示词头 */}
      <h4>词头</h4>
      {/* <Stack spacing={1} direction="row"> */}
        {props.item.prefix?.map(word => <Chip size="small"
          variant="outlined" label={word}
          onClick={() => console.log(word, props.item.character)}
          // onClick={() => props.history.push('/home') }
          key={word}
          color="info"
          sx={{ m: '1px 2px', }}
        />)}
      {/* </Stack> */}
      {/* 接下来展示相关词 */}
      <h4>相关词</h4>
      {/* <Stack spacing={1} direction="row"> */}
        {
          props.item.related?.map(word => <Chip
          size="small"
          onClick={() => console.log(word)}
          color='secondary'
          sx={{ m: '1px 2px'}}
          variant='outlined'
          label={word} />)
        }
      {/* </Stack> */}

      {/* 最后展示链接 */}
      {props.item.link ? <span>见 `{props.item.link}`</span> : ''}
    </Card>
  );
}


function BlockDisplay(props: { block: Block }) {
  return (
    <div>{props.block.header.charactor}</div>
  );
}
