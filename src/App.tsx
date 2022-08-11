import { useEffect } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import { setDocusignLogin, setMediavaletLogin } from './redux/actions/integration-actions';
import { useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import { setIsLoggedIn } from './redux/actions/session-actions';

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
