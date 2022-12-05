import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton, Grow } from "@mui/material";
// import Fade from '@mui/material/Fade';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';

import './ToolBox.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function ToolBox() {
  const navgate = useNavigate();
  
  const content = (
    <div className='tools'>
      <IconButton color="info" aria-label="home" size="small" onClick={() => navgate("/")}>
        <HomeIcon />
      </IconButton>
      <IconButton color="info" aria-label="setting" size="small">
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
      {/* <Fade in={show}>{content}</Fade> */}
    </div>
  );
}


export default ToolBox;
