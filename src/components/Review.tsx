import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import qs from 'qs';
import { LoadingButton } from '@mui/lab';
import { Box, Tabs, Tab } from '@mui/material';
import axios from 'axios';
import { BACKEND_URL } from '../constants/url.constants';
import { Trap } from '../interfaces/trap.interface';
import AuditDetails from './AuditDetails';
import CameraTraps from './CameraTraps';
import Comments from './Comments';
import TabPanel from './TablePanel';
import SendIcon from '@mui/icons-material/Send';
import VerifiedIcon from '@mui/icons-material/Verified';

function Review() {
  const {search} = useLocation()
  const query = qs.parse(search.slice(1))
  const auditId = query.auditId;
  const userId = query.userId;
  const [submitted, setSumbitted] = useState(false)

  const params: { audit: string} = useParams();
  const [audit, setAudit] = useState({} as any)
  const [traps, setTraps] = useState([]);
  const [trap, setTrap] = useState({} as Trap);
  const [assets, setAssets] = useState([] as Array<any>);
  const [category, setCategory] = useState({} as any)
  const [value, setValue] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [version, setVersion] = useState({} as any)
  const [versions, setVersions] = useState([] as Array<any>) 
  
  useEffect(() => {
    axios.get(`${BACKEND_URL}audits/${auditId}`)
    .then((res) => {
      setAudit(res.data)
    }) ;
    axios.get(`${BACKEND_URL}traps`)
    .then((res) => {
      setTraps(res.data)
    })
  }, [])

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const submitReview = () => {
    setSumbitted(true);
  }

  const handleVersionChange = () => {

  }

  return (
    <>
      {
        submitted ? (
          <div className='flex flex-col items-center justify-center h-96'>
            <p className='text-4xl font-semibold '>Your review has been submitted!</p>
            <div className='pt-5'>
            <VerifiedIcon style={{fontSize: '5rem'}} color="primary" />
            </div>
          </div>
        ) : (
          <div className='py-10 px-10'>
          <div className='py-5 flex justify-between'>
            <div className='flex'>
            <p className='m-0 text-xl font-semibold'>{audit?.name}</p>
            </div>
            <div className='flex items-center'>
              <div>
              </div>
              <div className='ml-5 cursor-pointer'>
              <LoadingButton
                          sx={{width: '35ch', cursor: 'pointer'}}
                          color="primary"
                          onClick={submitReview}
                          loading={submitLoading}
                          loadingPosition="end"
                          endIcon={<SendIcon />}
                          variant="contained"
                          >
                          Submit Review
                </LoadingButton>
              </div>
            </div>
          </div>
          <Box className='pt-3 relative' sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Audit Details" {...a11yProps(0)} />
              <Tab label="Camera Traps" {...a11yProps(1)} />
              <Tab label="Comments" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AuditDetails  {...{audit, traps}} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CameraTraps />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Comments />
          </TabPanel>
        </div> 
        )
      }
    </>
  );
}

export default Review;