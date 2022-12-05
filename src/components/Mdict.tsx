

export const MdictUI : React.FunctionComponent<{data: Mdict}> = (props) => {
  return (<div>
     {
      props.data.prefix?.forEach(text => <text>{text}</text>) || ''
    } 
  </div>);
}

export default MdictUI;


export interface Mdict {
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
    radical? :string,
    strokes?: number,
    struct?: string,
    variant?: string
  },
  content:Content[][]
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