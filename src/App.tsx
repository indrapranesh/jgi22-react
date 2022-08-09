import { useEffect } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import { setDocusignLogin, setMediavaletLogin } from './redux/actions/integration-actions';
import { useLocation } from 'react-router-dom';
import Landing from './components/Landing';
import axiosApiInstance from './helpers/axios.config';
import { setCategories } from './redux/actions/mediavalet.actions';

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

    axiosApiInstance.get(`https://api.mediavalet.com/categories`)
    .then((res) => {
      res.data?.payload?.forEach((element: any) => {
        if(element.tree.path.includes('pranesh-submission') && element?.assetCount > 0) {
          dispatch(setCategories(element));
        }
      });
    })
  })

  return (
    <div className="App">
        <Landing />
    </div>
  );
}

export default App;
