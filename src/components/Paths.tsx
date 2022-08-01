import React from 'react';
import { Route } from "react-router-dom";
import Audits from './Audits';
import Login from './Login';


function Paths() {
  return (
    <>
        <Route path="/login" component={Login} />
        <Route path="/audits" component={Audits} />
    </>
  );
}

export default Paths;