import { Button } from '@mui/material';
import React from 'react';
import history from '../history';


function LandingPage() {
  return (
    <>
      <div className='w-100 h-vh p-10 flex flex-col items-center'>
        <div className='flex flex-col items-center justify-center h-full'>
        <p className='text-6xl font-semibold w-3/4 text-center'>Integrate geospatial field data collection using <span className='text-blue-500'> Survey123 and camera trap workflows</span></p>
        <p className='italic text-stone-500 text-2xl pt-5'>Create an audit now to get approval for the new camera traps</p>
     <div className='mt-5'>
     <Button variant='contained' className='mt-5' onClick={() => {
        history.push('/audits')
      }} >Create Audit</Button>
     </div>
          </div> 
          
      </div>
      
    </>
  );
}

export default LandingPage;