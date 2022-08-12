 // @ts-nocheck
import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Button } from '@mui/material';
import metadata from './metadata.json';


function Publish() {

    const download = () => {

    }
  return (
    <>
        
        <div className='flex flex-col items-center justify-center h-96'>
            <p className='text-4xl font-semibold '>Audit has been published</p>
            <div className='pt-5'>
            <VerifiedIcon style={{fontSize: '5rem'}} color="primary" />
            </div>
            <div className='mt-10'>
                <Button variant='contained' onClick={download}><a href={metadata} download={'audit2_metadata.json'}>Download Metadata</a></Button>
            </div>

          </div>
    </>
  );
}

export default Publish;