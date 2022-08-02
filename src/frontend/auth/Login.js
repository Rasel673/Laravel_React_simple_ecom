import axios from 'axios';
import React,{useState} from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';

const Login = () => {
const navigate = useNavigate();
  const [login, setlogin] = useState({
    email:'',
    password:'',
    error_list:[],
  });

  const handleInput=(e)=>{
    e.persist();
    setlogin({...login,[e.target.name]:e.target.value});

  }

  const Login=(e)=>{
    e.preventDefault();
    const data={
      email:login.email,
      password:login.password
    };


    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post(`/api/login`,data)
      .then(res=>{
        if(res.data.status==='200') {
          localStorage.setItem('authToken',res.data.Token);
          localStorage.setItem('userName',res.data.user);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          });

          if(res.data.role==='admin'){
            navigate('/admin');
          }else{
            navigate('/');
          }
         
        } else if(res.data.status==='204'){
          setlogin({...login,error_list:res.data.validation});
       }else if(res.data.status==='401'){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: res.data.message,
          });

        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong',
          });

        }

      })
      .catch(err=>{

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong',
        });


      });




    });
    
  }

  return (
    <>
      <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>

    <div className="card">
  <h5 className="card-header">Login</h5>
  <div className="card-body">
  <form onSubmit={Login}> 
  <div className="form-group mb-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" name="email" onChange={handleInput} value={login.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <span className='text-danger'>{login.error_list.email}</span>
  </div>
  <div className="form-group mb-3">
    <label htmlFor="exampleInputPassword2">Password</label>
    <input type="password"  className="form-control" name="password" onChange={handleInput} value={login.password} id="exampleInputPassword2" placeholder="Password" />
    <span className='text-danger'>{login.error_list.password}</span>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  </div>
</div>
</div>
      </div>
    </>
  )
}

export default Login