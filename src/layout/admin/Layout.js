import React from 'react'
import { Link, Outlet,Navigate } from 'react-router-dom';
import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import useAuth from '../../hooks/useAuth';

import Navbar from './Navbar';
import Sidebar from './Sidebar';


const Layout = () => {
  const auth=useAuth();
  return (
    <>
    <div className='sb-nav-fixed'>
    <Navbar/>
    <div id="layoutSidenav">
    <Sidebar/>

    <div id="layoutSidenav_content">
                <main>
                {auth ? <Outlet/>:<Navigate to='/login'/>}  

        </main>

        <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <Link to="#">Privacy Policy</Link>
                                &middot;
                                <Link to="#">Terms &amp; Conditions</Link>
                            </div>
                        </div>
                    </div>
                </footer>
    </div>

    </div>

   

    </div>
    </>
  )
}

export default Layout