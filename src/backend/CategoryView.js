import axios from 'axios';
import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const CategoryView = () => {
const [catgories, setcatgories] = useState([]);
const [loding, setloding] = useState(true);

useEffect(() => {
 axios.get('/api/allCategory').then(res=>{
if(res.status===200){
setcatgories(res.data.categories);
setloding(false);
}
 }).catch(err=>{

 });
 
}, []);


const deleteCategory=(e,id)=>{
  e.preventDefault();
  const thisClicked=e.currentTarget;
thisClicked.innerText='Deleting';
axios.delete(`/api/delteCategory/${id}`).then(res=>{
  if(res.data.status===200) {
    thisClicked.closest("tr").remove();
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: res.data.message,
      showConfirmButton: true,
      timer: 1500
    });
   
   
  }
}).catch(err=>{

})


}


var viewHtmlTable='';

if(loding){
return<h4>Loading Category....</h4>
}else{
  viewHtmlTable=catgories.map((item)=>{
    return (
      <tr key={item.id}>
        <td><img src={`http://127.0.0.1:8000${item.icon}`} alt="icon" height="100" width="150"/></td>
        <td>{item.name}</td>
        <td>{item.slug}</td>
        <td>{item.status===1?'Active':'Inactive'}</td>
        <td><Link to={`/admin/CategoryEdit/${item.id}`} className='btn btn-sm btn-primary mr-1'>Edit</Link></td>
       <td> <button className='btn btn-sm btn-danger' onClick={(e)=>deleteCategory(e,item.id)}>Delete</button></td>
      </tr>
    );
  });
}


 


  return (
    <>
     <div className="container-fluid pt-4 px-4">
         <div className='row'>

         <div className="card">
             <div className="card-header d-flex justify-content-between">

             <h5 className='float-start'>All Category</h5>
             <Link  to="/admin/CategoryAdd" className='btn btn-primary btn-sm float-end'>Add +</Link>
             </div>
  
  <div className="card-body">

  <table className="table table-striped table-bordered table-hover justify-content-center">
    <thead>
 <tr>
 <th>Icon</th>
 <th>Name</th>
   <th>Slug</th>
   <th>Status</th>
   <th>Edit</th>
   <th>Delete</th>

 </tr>
 </thead>
 
 <tbody className=' justify-content-center'>
   {viewHtmlTable}
 </tbody>
</table>
   
  </div>
</div>

         </div>
     </div>
    
    
    
    </>
  )
}

export default CategoryView