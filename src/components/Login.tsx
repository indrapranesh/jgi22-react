import { FormControl, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import './Login.scss';
import LoadingButton from '@mui/lab/LoadingButton';

function Login() {

    const [loading, setLoading] = useState(false)

    const login = () => {
        setLoading(true);
    }
  return (
    <div className="Login">
        <div className='loginContainer h-screen relative'>
            <div className='flex justify-center flex-col items-center absolute m-auto left-0 right-0 top-0 bottom-0'>
                <FormControl sx={{ width: '35ch' }}>
                    <OutlinedInput type='email' placeholder="Email" />
                </FormControl>
                <FormControl sx={{paddingY: '10px', width: '35ch' }}>
                    <OutlinedInput type='password' placeholder="Password" />
                </FormControl>
                <LoadingButton
                    sx={{width: '35ch'}}
                    color="primary"
                    onClick={login}
                    loading={loading}
                    loadingPosition="center"
                    variant="contained"
                    >
                    Login
                </LoadingButton>
            </div>
        </div>
    </div>
  );
}

export default Login;
