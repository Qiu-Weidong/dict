import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Grow } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import './ToolBox.css';
import { useState } from "react";

function ToolBox(props: any) {

  const content = (
    <div className='tools'>
      <IconButton color="info" aria-label="home" size="small" onClick={() => props.history.push("/home") }>
        <HomeIcon />
      </IconButton>
      <IconButton color="info" aria-label="setting" size="small" onClick={() => props.history.push("/settings") }>
        <SettingsIcon />
      </IconButton>
      <IconButton color="info" aria-label="zoomin" size="small">
        <ZoomInIcon />
      </IconButton>
      <IconButton color="info" aria-label="zoomin" size="small">
        <ZoomOutIcon />
      </IconButton>
    </div>
  );
  const [show, setShow] = useState(false);

  return (
    <div className="tool-box">
      <IconButton color="info" aria-label="add" size="small"
        onClick={() => { show ? setShow(false) : setShow(true) }}
      >
        {!show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <Grow in={show}>{content}</Grow>
    </div>
  );
}


export default ToolBox;
