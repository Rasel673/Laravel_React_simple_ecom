import React,{useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate} from 'react-router-dom';

const CategoryAdd = () => {

   const [category, setcategory] = useState({
     name:'',
     slug:'',
     status:false,
     meta_tag:'',
     meta_title:'',
     meta_description:'',
     error_list:[]
   });
   const [icon,seticon]=useState([]);
   const [image,setimage]=useState(null);
   const navigate=useNavigate();
   
const handleCategory=(e)=>{
  e.persist();
setcategory({...category,[e.target.name]:e.target.value});
}

const handleIcon= (e) =>{

 
  if (e.target.files && e.target.files[0]) {
    seticon({icon:e.target.files[0]});
    let reader = new FileReader();
    reader.onload = (e) => {
      var imageAdd = document.getElementById("Addimage");
      imageAdd.classList.remove("d-none");
     setimage(e.target.result);

    };
    reader.readAsDataURL(e.target.files[0]);
  }

}

const AddCategory=(e)=>{
  e.preventDefault();

  const formData=new FormData();
  formData.append('icon',icon.icon);
  formData.append('name',category.name);
  formData.append('slug',category.slug);
  formData.append('status',category.status);
  formData.append('meta_tag',category.meta_tag);
  formData.append('meta_title',category.meta_title);
  formData.append('meta_description',category.meta_description);

    axios.post(`/api/addCategory`,formData)
    .then(res=>{
      if(res.data.status===200) {
        document.getElementById("catForm").reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        });
       
        navigate('/admin/CategoryView');
      }else if(res.data.status===204){
        setcategory({...category,error_list:res.data.validation});
     } else{
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

}


  return (
    <>
     <div className="container-fluid px-4">
     <h1 className="mt-4">Add Category</h1>


   <form onSubmit={AddCategory} id="catForm">               
 <div className="row">
      

<div className="col-md-5">

<div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" onChange={handleCategory}  value={category.name} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <span className='text-danger'>{category.error_list.name}</span>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Slug</label>
    <input type="text" className="form-control"  name="slug" onChange={handleCategory}  value={category.slug} id="exampleInputPassword1"/>
    <span className='text-danger'>{category.error_list.slug}</span>
     </div>      

     
   <div className="mb-3">
    <label htmlFor="exampleImage" className="form-label">Icon</label>
    <input type="file" className="form-control" name="icon" onChange={handleIcon}  accept='image/*'  id="exampleImage" aria-describedby="emailHelp"/>
    <span className='text-danger'>{category.error_list.icon}</span>
    <img src={image} id="Addimage" className='d-none mt-2' height="100" width="150" alt='select Image'/>
  </div>
</div>
  
<div className='col-md-5'>

<div className="mb-3">
    <label htmlFor="exampleInputTag" className="form-label">Meta Tag</label>
    <input type="text" className="form-control" name="meta_tag" onChange={handleCategory}  value={category.meta_tag} id="exampleInputTag"/>
     </div> 

     <div className="mb-3">
    <label htmlFor="exampleInputTitle" className="form-label">Meta Title</label>
    <input type="text" className="form-control" name="meta_title" onChange={handleCategory}  value={category.meta_title}  id="exampleInputTitle"/>
     </div> 

     <div className="mb-3">
    <label htmlFor="exampleInputDesciption" className="form-label">Meta Desciption</label>
    <textarea type="text" className="form-control" name="meta_description" onChange={handleCategory}  value={category.meta_description} id="exampleInputDesciption"></textarea>
     </div>                
</div>
 
</div>

<div className='row'>

<div className='col-md-5'>
<div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input"  name="status" onChange={handleCategory}  checked={category.status} id="exampleCheck1"/>
    <label className="form-check-label"   htmlFor="exampleCheck1">Status</label>
    <span className='text-danger'>{category.error_list.status}</span>
  </div>

</div>
<div className='d-grid  col-md-5'>
<button type="submit" className="btn btn-primary d-block">Submit</button>
</div>
</div>
</form>
</div>
    
    </>
  )
}

export default CategoryAdd