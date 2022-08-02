import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewCategory = () => {
    const [catgories, setcatgories] = useState([]);
    const [loding, setloding] = useState(true);

    useEffect(() => {
      var isMounted=true;
     axios.get('/api/viewallCategory').then(res=>{
    if(res.status===200){
    setcatgories(res.data.categories);
    setloding(false);
    }
     }).catch(err=>{
    
     });

     return()=>{
      isMounted=false;
     }
     
    }, []);


    var viewHtmlTable='';

if(loding){
return<h4>Loading Category....</h4>
}else{
  viewHtmlTable=catgories.map((item)=>{
    return (
        
       <div className='card col-md-3 m-2'  key={item.id}>
           <Link to={`/category/${item.slug}`}>
    <img  className="img-thumbnail mt-3" src={`http://127.0.0.1:8000${item.icon}`} alt="icon"/>
    <div className='card-body'>
    <h5 className="card-title">{item.name}</h5>
    </div>
    </Link>
       </div>
       
    );
  });
}


  return (
    <>
    <div className='row'>
    {viewHtmlTable}
    </div>

    
    </>
  )
}

export default ViewCategory