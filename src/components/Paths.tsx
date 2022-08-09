import React from 'react';
import { Route } from "react-router-dom";
import Audits from './Audits';
import Login from './Login';
import ViewAudit from './ViewAudit';


function Paths() {
  return (
    <>
        <Route path="/login" component={Login} />
        <Route path="/audits" component={Audits} exact/>
        <Route path="/audits/:audit" component={ViewAudit} />
    </>
  );
}

export default Paths;