import { useState } from "react";
import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

import SQLite from 'tauri-plugin-sqlite-api';

function Search() {
  const [input, setInput] = useState("");
  async function search() {
    console.log('输入内容', input);
    SQLite.open('./古代汉语词典.db').then(db => {
      db.select('select json from Dictionary where id = 734').then(data => {
        console.log(data);
      })
    });
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
