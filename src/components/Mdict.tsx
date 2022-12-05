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

// 用于显示一个 mdict
export const MdictComponent: React.FunctionComponent<{data: Mdict}> = (props) => {
  return (
    <div>
      {/* 首先是块的显示 */}
      {/* 词头的显示 */}
      <div>  { props.data.prefix }  </div>
      {/* 关联词的显示 */}
      <div>{ props.data.related }</div>
      {/* 链接的显示 */}
      <div>{ props.data.link }</div>
    </div>
  );
}

