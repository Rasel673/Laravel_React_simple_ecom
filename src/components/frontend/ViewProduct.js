import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ViewProduct = () => {
  const [catgories, setcatgories] = useState('');
  const [products, setproducts] = useState([]);
  const [loding, setloding] = useState(true);
  let {slug}=useParams();


  useEffect(() => {
    var isMounted=true;
   axios.get(`/api/ViewallProduct/${slug}`).then(res=>{
  if(res.status===200){
  setcatgories(res.data.category);
  setproducts(res.data.products);
  setloding(false);
  
  }else if(res.status===400){
  
  }else{
 
  }
  
   }).catch(err=>{
  
   });

   return()=>{
    isMounted=false;
   }
   
  }, [slug]);


  var viewHtmlTable='';

if(loding){
return<h4>Loading Category....</h4>
}else{
viewHtmlTable=products.map((item)=>{
  return (
  <div className='card col-md-3 m-2'  key={item.id}>
         <Link to={`/product/${item.slug}`}>
  <img  className="img-thumbnail mt-3" src={`http://127.0.0.1:8000${item.image}`} alt="image"/>
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

    <div className='row text-end mt-2'>
    <h5 className='text-success'>Collection/{catgories}</h5>
    </div>
    <div className='row'>
    {
    viewHtmlTable
    }
    </div>
  
    </>
  )
}

export default ViewProduct