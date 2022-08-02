import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryEdit = () => {

    const [category, setcategory] = useState({

        name:'',
        slug:'',
        status:false,
        meta_name:'',
        meta_title:'',
        meta_description:''
    });
      const [icon,seticon]=useState([]);
      const [image,setimage]=useState(null);
      const [loding, setloding] = useState(true);
      const [error,seterror]=useState([]);
      const navigate=useNavigate();
       let {id}=useParams();


      useEffect(() => {
         const categoryID=id;
        axios.get(`/api/editCategory/${categoryID}`).then(
            res=>{
               if(res.status===200){
                setcategory(res.data.categories);
                setloding(false);
               }else if(res.status===404){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: res.data.message,
                    showConfirmButton: true,
                    timer: 1500
                  });
               }

            }
        ).catch(
            err=>{

            }
        );        
      }, [id]);
      
   const handleCategory=(e)=>{
     e.persist();
   setcategory({...category,[e.target.name]:e.target.value});
   }
   
   const handleIcon= (e) =>{
     if (e.target.files && e.target.files[0]) {
       seticon({icon:e.target.files[0]});
       let reader = new FileReader();
       reader.onload = (e) => {
         var image = document.getElementById("imageEdit");
         image.classList.remove("d-none");
        setimage(e.target.result);
   
       };
       reader.readAsDataURL(e.target.files[0]);
     }
   
   }
   
   const editCategory=(e)=>{
     e.preventDefault();
   
     const formData=new FormData();
     formData.append('icon',icon.icon);
     formData.append('name',category.name);
     formData.append('slug',category.slug);
     formData.append('status',category.status);
     formData.append('meta_name',category.meta_name);
     formData.append('meta_title',category.meta_title);
     formData.append('meta_description',category.meta_description);
   
       axios.post(`/api/updateCategory/${id}`,formData)
       .then(res=>{
        console.log(res.data);
         if(res.data.status===200) {
           document.getElementById("cateditForm").reset();
           Swal.fire({
             position: 'top-end',
             icon: 'success',
             title: res.data.message,
             showConfirmButton: true,
             timer: 1500
           });
           seterror([]);
           navigate('/admin/CategoryView');
         }else if(res.data.status===422){
         seterror(res.data.errors);
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
   
   if(loding){
    return<h4>Loading Category....</h4>
    }
     return (
       <>
        <div className="container-fluid px-4">
        <h1 className="mt-4">Edit Category</h1>
   
   
      <form onSubmit={editCategory} id="cateditForm">               
    <div className="row">
         
   
   <div className="col-md-5">
   
   <div className="mb-3">
       <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
       <input type="text" className="form-control" name="name" onChange={handleCategory}  value={category.name} id="exampleInputEmail1" aria-describedby="emailHelp"/>
       <span className='text-danger'>{error.name}</span>
     </div>
   
     <div className="mb-3">
       <label htmlFor="exampleInputPassword1" className="form-label">Slug</label>
       <input type="text" className="form-control"  name="slug" onChange={handleCategory}  value={category.slug} id="exampleInputPassword1"/>
       <span className='text-danger'>{error.slug}</span>
        </div>      
   
        
      <div className="mb-3">
       <label htmlFor="exampleImage" className="form-label">Icon</label>
       <input type="file" className="form-control" name="icon" onChange={handleIcon}   accept='image/*'  id="exampleImage" aria-describedby="emailHelp"/>
       
       <img src={image || `http://127.0.0.1:8000${category.icon}`} id="imageEdit" className='mt-2' height="100" width="150" alt='select Image'/>
     </div>
   </div>
     
   <div className='col-md-5'>
   
   <div className="mb-3">
       <label htmlFor="exampleInputTag" className="form-label">Meta Tag</label>
       <input type="text" className="form-control" name="meta_name" onChange={handleCategory}  value={category.meta_name || ""} id="exampleInputTag"/>
       <span className='text-danger'>{error.meta_name}</span>
        </div> 
   
        <div className="mb-3">
       <label htmlFor="exampleInputTitle" className="form-label">Meta Title</label>
       <input type="text" className="form-control" name="meta_title" onChange={handleCategory}  value={category.meta_title || ""}  id="exampleInputTitle"/>
        </div> 
   
        <div className="mb-3">
       <label htmlFor="exampleInputDesciption" className="form-label">Meta Desciption</label>
       <textarea type="text" className="form-control" name="meta_description" onChange={handleCategory}  value={category.meta_description || ""} id="exampleInputDesciption"></textarea>
        </div>                
   </div>
    
   </div>
   
   <div className='row'>
   
   <div className='col-md-5'>
   <div className="mb-3 form-check">
       <input type="checkbox" className="form-check-input"  name="status" onChange={handleCategory}  checked={category.status===1 ? true:false} id="exampleCheck1"/>
       <label className="form-check-label"   htmlFor="exampleCheck1">Status</label>
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

export default CategoryEdit