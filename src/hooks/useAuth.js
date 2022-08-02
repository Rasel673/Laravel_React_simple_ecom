import axios from 'axios';
import React,{useState,useEffect,} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
const [auth, setauth] = useState(false);
const [loading,setloading]=useState(true);
const navigate = useNavigate();

 useEffect(()=>{
var isLoading=true;
axios.get('/api/checkauth').then(res=>{
if(res.data.status===200){
    if(isLoading){
        setauth(true); 
    }
    
}
setloading(false);
});

return ()=>{
isLoading=false;
setauth(false);
}
},[]
);



axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    if(err.response.status === 401 || err.response.status === 403){
        Swal.fire({
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
          });
          navigate('/');
    }

    return Promise.reject(err);
});

if(loading){
    return <h1>Loading....</h1>
}


return auth;
    
  
}

export default useAuth