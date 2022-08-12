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
import Paths, { NoAuthPaths } from './Paths';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import TaskIcon from '@mui/icons-material/Task';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import ShareLocationIcon from '@mui/icons-material/ShareLocation'

const drawerWidth = 240;

export default function Landing() {
  const [login, setLogin] = useState('')
  const { hash, search } = useLocation();
  const dispatch = useDispatch();
  const integrationStatus = useSelector((state: any) => state?.integration)
  const isLoggedIn = useSelector((state: any) => state?.session?.isLoggedIn);
  const notifications = useSelector((state: any) => state?.notifications.notifications.notifications)

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  

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
        console.log(res)
        localStorage.setItem('MEDIAVALET_ACCESS_TOKEN', res.data?.access_token)
        localStorage.setItem('MEDIAVALET_REFRESH_TOKEN', res.data?.refresh_token)
        history.push('/')
      })
    }
  }, [])

  
console.log(notifications)
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
    },
    {
      name: 'ArcGIS',
      key: 'esri',
      url: ''
    },
  ]

  const menu = [
    {
      icon: <IconButton color='primary'>
          <TaskIcon />
      </IconButton>,
      name: 'Audits',
      path: '/audits',
    },
    {
      icon: <IconButton color='primary'>
          <PeopleAltIcon />
      </IconButton>,
      name: 'Reviewers',
      path: '/reviewers'
    }
  ]

  const openLogin = (item: any) => {
    setLogin(item)
    window.open(item.url, '_parent', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
  }

  return (
    <>
    {
      isLoggedIn ? (
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar style={{background: 'white'}}>
        <div className='w-full flex justify-end'>
          <IconButton aria-label="notification" onClick={handleClick}>
            <NotificationsNoneIcon color='primary' />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <div className=' w-80'>
              <div className='flex items-center justify-center'>
                <div className='p-3'>
                  {
                      <>
                      <p className='font-bold '>{notifications?.title}</p>
                      <p className='font-light text-sm'>{notifications?.message}</p></>
                  }
                </div>
              </div>
            </div>
          </Popover>
          </div>
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
        <Toolbar>
          <div className='w-full flex items-center'>
            <ShareLocationIcon color="primary" fontSize='large' />
          <p className='title-logo font-bold text-2xl text-center w-full' onClick={() => history.push('/')}>GeoTagger</p>
          </div>
          
        </Toolbar>
        
        <Divider />
        <List>
          {menu.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item?.icon}
                </ListItemIcon>
                <ListItemText onClick={() => history.push(item.path)} primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <p className='font-sans uppercase font-bold text-normal py-3 text-center text-stone-500'>Integrations</p>
          {integrations.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => openLogin(item)}>
                <ListItemText primary={item.name} />
                <ListItemIcon>
                  {
                    integrationStatus[`${item.key}`] ? (<><VerifiedIcon color='primary' /></>) : (<WarningIcon color='warning' />)
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
        <Toolbar>
        </Toolbar>
        <Paths/>
      </Box>
    </Box>
      ) : (
        <>
          <NoAuthPaths/>
        </>
      )
    }
    </>
  );
}
