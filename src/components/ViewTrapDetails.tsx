import { Paper } from '@mui/material';
import React from 'react';
import { Trap } from '../interfaces/trap.interface';


function ViewTrapDetails(trapDetials: Trap) {
    
  return (
    <>
     {
        trapDetials.id  && (
            <Paper variant="outlined">

            </Paper>
        )
     }
       
    </>
  );
}

export default ViewTrapDetails;