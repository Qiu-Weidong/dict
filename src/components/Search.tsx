import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { IconButton, TextField, Tooltip, Typography } from "@mui/material";
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Search() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  const longText = "Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu. Nullam eget est sed sem iaculis gravida eget vitae justo.";

  return (
    <div style={{ 'display': 'flex', 'flexDirection': 'column', 'minWidth': '350px' }}>
      <div style={{ 'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center' }} >
        <Switch size="small" ></Switch>
        <Typography sx={{ color: 'info.main', fontSize: 1.5, fontFamily: '华文行楷' }}> 反查  </Typography >
        <Tooltip placement="top"
          arrow title={longText}><HelpOutlineIcon fontSize="small" color="info" />
        </Tooltip>
      </div>
      <div>
        <TextField id="standard-basic" style={{ 'width': '100%' }}
          label="請輸入要查詢的漢字" variant="standard"
          onChange={(e) => setName(e.currentTarget.value)}
          InputProps={{
            endAdornment: (
              <IconButton
                onClick={() => { greet() }}
                type="button" aria-label="search">
                <SearchIcon />
              </IconButton>
            )
          }}
        >
        </TextField>
        <p>{greetMsg}</p>
      </div>

    </div>
  );
}

export default Search;
