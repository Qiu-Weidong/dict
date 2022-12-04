import { useState } from "react";
import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import Database from 'tauri-plugin-sql-api';

function Search() {
  const [input, setInput] = useState("");
  async function search() {
    console.log('输入内容', input);
    const db = await Database.load('sqlite:dict.db')
    await db.execute('create table Fuck(id INTEGER PRIMARY KEY, name TEXT);');
  }
  // const longText = "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu. Nullam eget est sed sem iaculis gravida eget vitae justo.";

  return (<div>
    <TextField id="standard-basic" 
      label="請輸入要查詢的漢字" variant="standard"
      onChange={(e) => setInput(e.currentTarget.value)}
      InputProps={{
        endAdornment: (
          <IconButton
            onClick={() => { search() }}
            type="button" aria-label="search">
            <SearchIcon />
          </IconButton>
        )
      }}
    >
    </TextField>
  </div>

    // </div>
  );
}

export default Search;
