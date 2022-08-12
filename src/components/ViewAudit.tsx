import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../constants/url.constants';
import { Trap } from '../interfaces/trap.interface';
import { useSelector } from 'react-redux';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, Tab, Tabs } from '@mui/material';
import TabPanel from './TablePanel';
import AuditDetails from './AuditDetails';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import Comments from './Comments';
import CameraTraps from './CameraTraps';
import axiosApiInstance from '../helpers/axios.config';
import history from '../history';

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
  const [versions, setVersions] = useState([] as Array<any>) 
  const [dialog, setDialog] = useState(false)
  const [file, setFile] = useState({} as any)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [version, setVersion] = useState('')
 
  const _category = useSelector((state: any) => state.categories)
  
  useEffect(() => {
    setCategory(_category)
    setAuditId(params.audit);
    axios.get(`${BACKEND_URL}audits/${params.audit}`)
    .then((res) => {
      setAuditId(res.data?.id)
      setAudit(res.data)
      setVersion(res.data?.initialVersion)
    }) ;
    axios.get(`${BACKEND_URL}versions/${params.audit}`)
    .then((res) => {
      setVersions(res.data.versions)
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

  const handleClose = () => {
    setDialog(false);
  }

  const sendAgreement = () => {    
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setFile(reader.result);
        const body: any = {
          auditId: auditId,
          mapFile: reader.result
        }
        axiosApiInstance.post(`${BACKEND_URL}sendEnvelope`, body)
        .then((res) => {
          console.log(res)
          setDialog(false);
          setOpen(true);
          setMessage('Final agreement sent successfully')
        })
    }
    reader.onerror = error => console.log(error);
  }

  const handleVersionChange = () => {

  }

  const sendNextReview = () => {
    axios.post(`${BACKEND_URL}review/send?auditId=${auditId}`, {})
          .then((res) => {
            setOpen(true);
            setMessage('Reviewers are notified')
            setVersion('1.0.1')
          })
          
  }

  const handleFileChange = (file) => {
    setFile(file.target.files[0]);
  }

  const publish = () => {
    history.push('/publish')
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
          <Button variant='contained' onClick={publish}>Publish audit</Button>
          
          <div className='ml-5'>
          <LoadingButton
                      sx={{width: '35ch'}}
                      color="primary"
                      onClick={() => setDialog(true)}
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
      <div className='flex justify-between items-center'>
      <Button variant='contained' onClick={sendNextReview}>Send next review</Button>
      <div>
          <span className='font-normal italic'>Version:</span>
          <span className='pl-3 text-stone-500 font-semibold italic'>{version}</span>
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

      <Dialog open={dialog} onClose={handleClose}>
        <DialogTitle className="font-bold">Send final agreement </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Upload the map document to send the final agreement
          </DialogContentText>
          <div>
          <input
            style={{ display: "none" }}
            id="contained-button-file"
            type="file"
            accept='application/pdf'
            onChange={(file) => handleFileChange(file)}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Upload
            </Button>
          </label>
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={sendAgreement}>Send</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
         autoHideDuration={3000}
        open={open}
        message={message}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default ViewAudit;