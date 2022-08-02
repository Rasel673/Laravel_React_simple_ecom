import axios from 'axios';
import React from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const NavbarFront = () => {

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


var Authbutton='';
if(localStorage.getItem('authToken')){
  Authbutton=(
    <li className="nav-item">
    <button className="nav-item nav-link btn btn-danger"  onClick={Logout}>Logout</button>
  </li>
  )
}else{

  Authbutton=( <ul className='nav-bar nav'> 
  <li className="nav-item">
        <NavLink className=" nav-item nav-link" to="/login">Login</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className=" nav-item nav-link" to="/register">Register</NavLink>
      </li>

    </ul>
  )

}




  return (
    <>
  
 <nav className="navbar navbar-expand-lg navbar-dark shadow sticky-top bg-primary">
   <div className='container'>
  <NavLink className="navbar-brand" to="/">Navbar</NavLink>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto float-right">
      <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/about">About <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/contact">Contact <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item active">
        <NavLink className="nav-link" to="/collection">Collection <span className="sr-only">(current)</span></NavLink>
      </li>

      {Authbutton}
    </ul>
  </div>
  </div>
</nav>
    </>
  )
}

export default NavbarFront