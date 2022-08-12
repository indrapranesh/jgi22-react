import React from 'react';
import { Route } from "react-router-dom";
import Audits from './Audits';
import LandingPage from './LandingPage';
import Login from './Login';
import Publish from './Publish';
import Review from './Review';
import Reviewers from './Reviewers';
import ViewAudit from './ViewAudit';


function Paths() {
  return (
    <>
    <Route path='/' component={LandingPage} exact />
        <Route path="/login" component={Login} />
        <Route path="/audits" component={Audits} exact/>
        <Route path="/audits/:audit" component={ViewAudit} />
        <Route path="/reviewers" component={Reviewers} />
        <Route path="/publish" component={Publish} />
    </>
  );
}

export default Paths;


export function NoAuthPaths() {
  return (
    <>
        <Route path="/login" component={Login} />
        <Route path="/review" component={Review} exact />
    </>
  );
}