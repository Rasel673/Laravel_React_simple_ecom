import React from 'react';
import NavbarFront from './NavbarFront';

import { Outlet } from 'react-router-dom';

const FrontLayout = () => {
  return (
    <>
    
   <NavbarFront/>
    <Outlet/>
    <h1>Footer</h1>
    </>
  )
}

export default FrontLayout