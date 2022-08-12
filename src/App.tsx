import { useEffect } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import { setDocusignLogin, setMediavaletLogin } from './redux/actions/integration-actions';
import { useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import { setIsLoggedIn } from './redux/actions/session-actions';
import socketIOClient from "socket.io-client";
import { setNotifications } from './redux/actions/mediavalet.actions';
import notifications from './redux/reducers/notifications.reducer';

function App() {

  const dispatch = useDispatch()
  const { search } = useLocation();
  const socket = socketIOClient('http://localhost:3080')
  
  useEffect(() => {
    socket.on('response', (data) => {
      if(data?.title) {
        dispatch(setNotifications({notifications: data}));
      }
    });
    if(localStorage.getItem('DOCUSIGN_ACCESS_TOKEN')) {
      dispatch(setDocusignLogin({docusign: true}))
    }
    if(localStorage.getItem('MEDIAVALET_ACCESS_TOKEN')) {
      dispatch(setMediavaletLogin({mediavalet: true}))
    }
    if(localStorage.getItem('loggedIn')) {
      dispatch(setIsLoggedIn({
        isLoggedIn: true
    }))
    }
  })

  return (
    <div className="App">
        <Landing />
    </div>
  );
}

export default App;
