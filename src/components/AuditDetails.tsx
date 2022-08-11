import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

function audit(props: any) {
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
              <p className='pt-3 font-sans font-semibold text-lg text-inherit'>ArcGIS Map URL</p>
              <p className='pt-3 font-sans text-base text-stone-500'><a href={props?.audit?.mapUrl}>{props?.audit?.mapUrl}</a></p>
              <p className='pt-3 font-sans font-semibold text-lg text-inherit'>Number of Traps</p>
              <p className='pt-3 font-sans text-base text-stone-500'><a href={props?.audit?.mapUrl}>{props?.traps?.length}</a></p>
            </div>
        </Grid>
        <Grid item xs={4} className=" my-3">
            <div>
            <p className='font-sans font-semibold text-lg text-inherit'>Reviewers</p>
            </div>

        </Grid>   
        </Grid>
    </>
  );
}

export default audit;