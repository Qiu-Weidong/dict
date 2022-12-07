import SubjectIcon from '@mui/icons-material/Subject';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Drawer, IconButton, styled } from '@mui/material';
import { useState } from 'react';
// import BackgroundImage from './Background';


const Layout: React.FunctionComponent<{ children: React.ReactNode }> = (props) => {
  const [drawerShow, setDrawerShow] = useState(false);
  const drawerWidth = 180;
  // const main_bg_url = 'https://cdn.jsdelivr.net/gh/Qiu-Weidong/blog/resources/images/%E5%A3%81%E7%BA%B8/wallhaven-g7g8rd.jpg';

  const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
    position: 'relative'
  }));

  return (
    <div style={{ 'display': 'flex'}} id="layout"  >

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={drawerShow}
      >

        {/* <BackgroundImage url={props.drawer_bg_url} /> */}
      </Drawer>

      <Main open={drawerShow} >
        
        <IconButton style={{ 'position': 'absolute', 'left': '4px', 'top': '16px',  }} size="small"
          onClick={() => drawerShow ? setDrawerShow(false) : setDrawerShow(true)}
        > {
          !drawerShow ? <SubjectIcon /> : <KeyboardArrowLeftIcon />
        }
          
        </IconButton>
        {props.children}
      </Main>
    {/* <BackgroundImage url={main_bg_url}/> */}
    </div>
  );
}


export default Layout;

