import React from 'react'
import axios from 'axios';
import { Link,NavLink,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Navbar = () => {


const navigate = useNavigate();

const Logout=(e)=>{
  e.preventDefault();
axios.post(`/api/logout`)
.then(res=>{
  if(res.status===200){
    localStorage.removeItem('authToken',res.data.Token);
    localStorage.removeItem('userName',res.data.user);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: res.data.message,
      showConfirmButton: true,
      timer: 1500
    });
    navigate('/login');
  }
})
.catch(err=>{

});

}


  return (
    <> <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

    <Link className="navbar-brand ps-3" to="/">Welcome</Link>
 
    <Link className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" to="#!"><i className="fas fa-bars"></i></Link>
 
    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
        </div>
    </form>
  
    <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" id="navbarDropdown" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/">Settings</Link></li>
                <li><Link className="dropdown-item" to="/">Activity Log</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><button className="dropdown-item" onClick={Logout}>Logout</button></li>
            </ul>
        </li>
    </ul>
</nav></>
  )
}

export default Navbar