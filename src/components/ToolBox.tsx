import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import HomeIcon from '@mui/icons-material/Home';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Fab } from "@mui/material";

import './ToolBox.css';
import { useState } from "react";

function ToolBox() {
  const [toolShow, setToolShow] = useState({
    show: 'none', unshow: 'flex'
  });

  return (
    <div className="tool-box">
      <Fab color="primary" aria-label="add" size="small"
        style={{ 'display': toolShow.unshow }}
        onClick={() => setToolShow({ show: 'flex', unshow: 'none' })}
      >
        <AddIcon />
      </Fab>
      <Fab color="info" aria-label="add" size="small"
        style={{ 'display': toolShow.show }}
        onClick={() => setToolShow({ show: 'none', unshow: 'flex' })}
      >
        <RemoveOutlinedIcon />
      </Fab>
      <div className="more" style={{ 'display': toolShow.show }}>
        <Fab color="primary" aria-label="setting" size="small">
          <HomeIcon />
        </Fab>
        <Fab color="primary" aria-label="setting" size="small">
          <SettingsIcon />
        </Fab>
        <Fab color="primary" aria-label="mode" size="small"
          style={{ 'display': 'none' }}
        >
          <Brightness7Icon />
        </Fab>
        <Fab color="primary" aria-label="mode" size="small"
          style={{ 'display': 'flex' }}
        >
          <Brightness4Icon />
        </Fab></div>
    </div>
  );
}


export default ToolBox;