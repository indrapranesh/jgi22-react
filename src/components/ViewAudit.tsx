import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants/url.constants';
import { Trap } from '../interfaces/trap.interface';
import { useSelector } from 'react-redux';
import { Box, Chip, FormControl, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material';
import TabPanel from './TablePanel';
import AuditDetails from './AuditDetails';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Comments from './Comments';
import CameraTraps from './CameraTraps';

function ViewAudit() {

  const params: { audit: string} = useParams();
  const [auditId, setAuditId] = useState('');
  const [audit, setAudit] = useState({} as any)
  const [traps, setTraps] = useState([]);
  const [trap, setTrap] = useState({} as Trap);
  const [assets, setAssets] = useState([] as Array<any>);
  const [category, setCategory] = useState({} as any)
  const [value, setValue] = useState(0);
  const [agreementLoading, setAgreementLoading] = useState(false);
  const [version, setVersion] = useState({} as any)
  const [versions, setVersions] = useState([] as Array<any>) 

  const _category = useSelector((state: any) => state.categories)
  
  useEffect(() => {
    setCategory(_category)
    setAuditId(params.audit);
    axios.get(`${BACKEND_URL}audits/${params.audit}`)
    .then((res) => {
      setAuditId(res.data?.id)
      setAudit(res.data)
    }) ;
    axios.get(`${BACKEND_URL}versions/${params.audit}`)
    .then((res) => {
      setVersions(res.data.versions)
      setVersion(res.data.latest)
    })
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

  const sendAgreement = () => {

  }

  const handleVersionChange = () => {

  }

  return (
    <>
      <div className='py-5 flex justify-between'>
        <div className='flex'>
        <p className='m-0 text-xl font-semibold'>{audit?.name}</p>
          <div className='active ml-3'>
            <Chip label="Active" variant="outlined" />
          </div>
        </div>
        <div className='flex items-center'>
          <div>
          <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth size='small'>
            <InputLabel id="demo-simple-select-label">Version</InputLabel>
            <Select
            defaultValue={version?.version}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={version?.version}
              label="Version"
              onChange={handleVersionChange}
            >
              {
                versions.map((version, index) => (
                  <MenuItem key={index} value={version?.version}>{version?.version}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          </div>
          <div className='ml-5'>
          <LoadingButton
                      sx={{width: '35ch'}}
                      color="primary"
                      onClick={sendAgreement}
                      loading={agreementLoading}
                      loadingPosition="end"
                      endIcon={<SendIcon />}
                      variant="contained"
                      >
                      Send Final Agreement
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
    </>
  );
}

export default ViewAudit;