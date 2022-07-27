import React from 'react';
import { Route } from "react-router-dom";
import Login from './Login';


function Paths() {
  return (
    <>
        <Route path="/login" component={Login} />
    </>
  );
}

export default Paths;