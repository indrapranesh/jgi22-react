import React, { useEffect, useState }  from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { DOCUSIGN_LOGIN_URL, MEDIAVALET_LOGIN_URL } from '../constants/integrations.constants';
import WarningIcon from '@mui/icons-material/Warning';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { setDocusignLogin } from '../redux/actions/integration-actions';
import axios from 'axios';
import { BACKEND_URL } from '../constants/url.constants';
import history from '../history';
import Paths from './Paths';

const drawerWidth = 240;

export default function Landing() {
  const [login, setLogin] = useState('')
  const { hash, search } = useLocation();
  const dispatch = useDispatch();
  const integrationStatus = useSelector((state: any) => state?.integration)

  

  useEffect(() => {
    if(hash.indexOf('access_token') > -1)  {
      let hashData: any = qs.parse(hash.slice(hash.indexOf('access_token=')));
      localStorage.setItem('DOCUSIGN_ACCESS_TOKEN', hashData.access_token);
      dispatch(setDocusignLogin({docusign: true}))
    }
    if(qs.parse(search.slice(1))?.code) {
      console.log('firing')
      const code = qs.parse(search.slice(1))?.code;
      axios.post(`${BACKEND_URL}mvLogin?code=${code}`)
      .then((res) => {
        localStorage.setItem('MEDIAVALET_ACCESS_TOKEN', res.data?.access_token)
        history.push('/')
      })
    }
  }, [])

  

  console.log(window.location.toString())

  const integrations = [
    {
      name: 'Docusign',
      key: 'docusign',
      url: DOCUSIGN_LOGIN_URL
    },
    {
      name: 'MediaValet',
      key: 'mediavalet',
      url: MEDIAVALET_LOGIN_URL
    }
  ]

  const menu = [
    {
      name: 'Audits',
      path: '/audits',
    }
  ]

  const openLogin = (item: any) => {
    setLogin(item)
    window.open(item.url, '_parent', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
  }

  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  
                </ListItemIcon>
                <ListItemText onClick={() => history.push(item.path)} primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {integrations.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => openLogin(item)}>
                <ListItemText primary={item.name} />
                <ListItemIcon>
                  {
                    integrationStatus[`${item.key}`] ? (<></>) : (<WarningIcon />)
                  }
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Paths/>
      </Box>
    </Box>
    </>
  );
}
