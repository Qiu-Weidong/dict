import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { Fab, Grow } from "@mui/material";
// import Fade from '@mui/material/Fade';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import './ToolBox.css';
import { useState } from "react";

function ToolBox() {
  const content = (
    <div className='tools'>
      <Fab color="info" aria-label="home" size="small">
        <HomeIcon />
      </Fab>
      <Fab color="info" aria-label="setting" size="small">
        <SettingsIcon />
      </Fab>
      <Fab color="info" aria-label="zoomin" size="small">
        <ZoomInIcon />
      </Fab>
      <Fab color="info" aria-label="zoomin" size="small">
        <ZoomOutIcon />
      </Fab>
    </div>
  );
  const [show, setShow] = useState(false);

  return (
    <div className="tool-box">
      <Fab color="info" aria-label="add" size="small"
        onClick={() => { show ? setShow(false) : setShow(true) }}
      >
        {!show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </Fab>
      <Grow in={show}>{content}</Grow>
      {/* <Fade in={show}>{content}</Fade> */}
    </div>
  );
}


export default ToolBox;
