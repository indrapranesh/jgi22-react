import { FormControl, OutlinedInput } from '@mui/material';
import React, { useState } from 'react';
import './Login.scss';
import LoadingButton from '@mui/lab/LoadingButton';
import { setIsLoggedIn } from '../redux/actions/session-actions';
import history from '../history';
import { useDispatch } from 'react-redux';
import ShareLocationIcon from '@mui/icons-material/ShareLocation'

function Login() {

    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    const login = () => {
        localStorage.setItem('loggedIn', 'true')
        dispatch(setIsLoggedIn({
            isLoggedIn: true
        }));
        history.push('/')
    }
  return (
    <div className="Login">
        <div className='loginContainer h-screen relative'>
            <div className='flex justify-center flex-col items-center absolute m-auto left-0 right-0 top-0 bottom-0'>
                <div className='flex pb-7 flex-col items-center'>
                    <div className='pb-3 flex items-center'>
                        <ShareLocationIcon style={{'fontSize': '3.75rem', 'color': 'rgb(0, 127, 255)'}} />
                        <p className='pl-5 title-login font-bold'>GeoTagger</p>
                    </div>
                    <p className='italic text-stone-500'>Integrate geospatial field data collection using Survey123 and camera trap workflows</p>
                </div>
                <FormControl sx={{ width: '35ch' }}>
                    <OutlinedInput type='email' placeholder="Email" />
                </FormControl>
                <FormControl sx={{paddingY: '10px', width: '35ch' }}>
                    <OutlinedInput type='password' placeholder="Password" />
                </FormControl>
                <div className='mt-5'>
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
    </div>
  );
}

export default Login;
