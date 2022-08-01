import React, { useEffect } from 'react';
import './App.scss';
import { io } from "socket.io-client";
import Paths from './components/Paths';
import { useDispatch } from 'react-redux';
import { setDocusignLogin, setMediavaletLogin } from './redux/actions/integration-actions';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import { BACKEND_URL } from './constants/url.constants';
import Landing from './components/Landing';

function App() {

  const dispatch = useDispatch()
  const { search } = useLocation();
  
  useEffect(() => {
    if(localStorage.getItem('DOCUSIGN_ACCESS_TOKEN')) {
      dispatch(setDocusignLogin({docusign: true}))
    }
    if(localStorage.getItem('MEDIAVALET_ACCESS_TOKEN')) {
      dispatch(setMediavaletLogin({mediavalet: true}))
    }
  })

  return (
    <div className="App">
        <Landing />
    </div>
  );
}

export default App;
