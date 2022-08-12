import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useSelector } from 'react-redux';
import WarningIcon from '@mui/icons-material/Warning';
import { BACKEND_URL } from '../constants/url.constants';
import axios from 'axios';

function Audit(props: any) {
  const loggedIn = useSelector((state: any) => state.session.isLoggedIn)
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios.get(`${BACKEND_URL}users`)
    .then((res) => setUsers(res.data));
  }, []);

  return (
    <>
        <Grid container spacing={3} >
        <Grid item xs={8}>
            <div>
              <p className='font-sans font-semibold text-lg text-inherit'>Audit Name</p>
              <p className='pt-3 font-sans text-base text-stone-500'>{props?.audit?.name}</p>
              <p className='pt-3 font-sans font-semibold text-lg text-inherit'>Description</p>
              <p className='pt-3 font-sans text-base text-stone-500'>{props?.audit?.description}</p>
              <p className='pt-3 font-sans font-semibold text-lg text-inherit'>Initial Version</p>
              <p className='pt-3 font-sans text-base text-stone-500'>{props?.audit?.initialVersion}</p>
              {/* <p className='pt-3 font-sans font-semibold text-lg text-inherit'>ArcGIS Map URL</p>
              <p className='pt-3 font-sans text-base text-stone-500'><a href={props?.audit?.mapUrl}>{props?.audit?.mapUrl}</a></p> */}
              <p className='pt-3 font-sans font-semibold text-lg text-inherit'>Number of Traps</p>
              <p className='pt-3 font-sans text-base text-stone-500'><a href={props?.audit?.mapUrl}>{props?.traps?.length}</a></p>
            </div>
        </Grid>
        {
          loggedIn && (
            <Grid item xs={4} className=" my-3">
            <div>
            <p className='font-sans font-semibold text-lg text-inherit'>Reviewers</p>
              <div className='p-5'>
                  {
                    users.map((user: any) => (
                      <div className='flex justify-between py-3'>
                        <p className='font-semibold text-stone-600 italic'>{user.name}</p>
                        {
                          user ? (<><VerifiedIcon color='primary' /></>) : (<WarningIcon color='info' />)
                        }
                      </div>
                    ))
                  }
              </div>
              <p className='font-sans font-semibold text-lg text-inherit pt-5'>Signers</p>
              <div className='p-5'>
                  {
                    users.map((user: any) => (
                      <div className='flex justify-between py-3'>
                        <p className='font-semibold text-stone-600 italic'>{user.name}</p>
                        {
                          user ? (<><VerifiedIcon color='primary' /></>) : (<WarningIcon color='info' />)
                        }
                      </div>
                    ))
                  }
              </div>
            </div>

            </Grid>   
          )
        } 
        </Grid>
    </>
  );
}

export default Audit;