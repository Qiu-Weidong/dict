import { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { AutoComplete } from "antd";
import { Traditionalized, Simplized } from '../translate';
import sqlite from "../sqlite";

function Search() {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [lock, setLock] = useState(false);

  function search(value: string) {
    console.log('输入内容', value);
  }

  function getCompleteList(value: string) {
    if (!value) setOptions([]);
    else {
      const simple = Simplized(value), tradition = Traditionalized(value);
      sqlite.select<{ character: string }[]>("select character from Dictionary \
        where character like '%" + simple + "%' or character like '%" + tradition + "%' ;").then(data => {
        const result = data.map(item => { return { value: item.character } });
        setOptions(result);
      });
    }

  }


  return (
    <AutoComplete
      options={options}
      onChange={(value) => {
        if (lock) return;
        getCompleteList(value);
      }}
      onSelect={(param: string) => { search(param) }}
    >
      <TextField id="standard-basic"
        label="請輸入要查詢的漢字" variant="standard"
        onChange={(e) => setInput(e.currentTarget.value)}
        onCompositionStart={() => { setLock(true) }}
        onCompositionEnd={() => { setLock(false); getCompleteList(input); }}

        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => { search(input) }}
              type="button" aria-label="search">
              <SearchIcon />
            </IconButton>
          )
        }}
      >
      </TextField>
    </AutoComplete>

  );
}

export default Search;

