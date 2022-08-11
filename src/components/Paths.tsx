import React from 'react';
import { Route } from "react-router-dom";
import Audits from './Audits';
import Login from './Login';
import Reviewers from './Reviewers';
import ViewAudit from './ViewAudit';


function Paths() {
  return (
    <>
        <Route path="/login" component={Login} />
        <Route path="/audits" component={Audits} exact/>
        <Route path="/audits/:audit" component={ViewAudit} />
        <Route path="/reviewers" component={Reviewers} />
    </>
  );
}

export default Paths;


export function NoAuthPaths() {
  return (
    <>
        <Route path="/login" component={Login} />
    </>
  );
}