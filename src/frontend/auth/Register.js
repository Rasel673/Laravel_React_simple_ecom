import axios from 'axios';
import React,{useState} from 'react';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';


const Register = () => {
  const navigate = useNavigate();
 const [register, setRegister] = useState({
   name:'',
   email:'',
   password:'',
   error_list:[]
 });

 const handleInput=(e)=>{
e.persist();
setRegister({...register,[e.target.name]: e.target.value});
 };

 const registerSubmit=(e)=>{
  e.preventDefault()
  const data={
    name:register.name,
    email:register.email,
    password:register.password,
                 
  };



 
    axios.get('/sanctum/csrf-cookie').then(response => {
    axios.post(`/api/new_user`,data).then(res=>{
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
        navigate('/');
      } else if(res.data.status==='204'){
        setRegister({...register,error_list:res.data.validation});
     }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    }).catch(err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
  });
  
   
 };


  return (
    <>
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>

    <div className="card">
  <h5 className="card-header">Registration</h5>
  <div className="card-body">
  <form onSubmit={registerSubmit}>

  <div className="form-group mb-3">
    <label htmlFor="exampleInputEmail2">Full Name</label>
    <input type="text" className="form-control" id="exampleInputEmail2" name='name' onChange={handleInput}  value={register.name} aria-describedby="emailHelp" placeholder="Enter Full Name"/>
    <span className='text-danger'>{register.error_list.name}</span>
  </div> 

  <div className="form-group mb-3">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name='email' onChange={handleInput}  value={register.email} aria-describedby="emailHelp" placeholder="Enter email"/>
    <span className='text-danger'>{register.error_list.email}</span>
  
  </div>

  <div className="form-group mb-3">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password"  className="form-control" id="exampleInputPassword1" name='password' onChange={handleInput}  value={register.password} placeholder="Password" />
    <span className='text-danger'>{register.error_list.password}</span>
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

export default Register