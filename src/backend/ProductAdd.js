import axios from 'axios';
import React,{useState,useEffect}from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const ProductAdd = () => {

 const [categories, setCategories] = useState([]);
const [product,setProduct]=useState({
  category_id:'',
  name:'',
  slug:'',
  description:'',
  sell_price:'',
  orginal_price:'',
  qty:'',
  status:false,
  featured:false,
  popular:false,
  brand:'',
  meta_tag:'',
  meta_title:'',
  meta_description:'',
});
const [product_image,setProduct_Image]=useState([]);
const [image,setimage]=useState(null);
const [error_list,seterror_list]=useState([]);
const navigate=useNavigate();

useEffect(() => {

  axios.get('/api/allCategory').then(res=>{
    if(res.status===200){
setCategories(res.data.categories);
    }
   
  }).catch(err=>{

  })

}, []);

const handleProduct=(e)=>{
  e.persist();
setProduct({...product,[e.target.name]:e.target.value});
}

const handleProduct_image= (e) =>{
   if (e.target.files && e.target.files[0]) {
    setProduct_Image({image:e.target.files[0]});
    let reader = new FileReader();
    reader.onload = (e) => {
      var imageAdd = document.getElementById("Addimage");
      imageAdd.classList.remove("d-none");
     setimage(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

}

const AddProduct=(e)=>{
  e.preventDefault();

  const formData=new FormData();
  formData.append('category',product.category_id);
  formData.append('image',product_image.image);
  formData.append('name',product.name);
  formData.append('slug',product.slug);
  formData.append('description',product.description);
  formData.append('sell_price',product.sell_price);
  formData.append('orginal_price',product.orginal_price);
  formData.append('qty',product.qty);
  formData.append('brand',product.brand);
  formData.append('status',product.status);
  formData.append('featured',product.featured);
  formData.append('popular',product.popular);
  formData.append('meta_tag',product.meta_tag);
  formData.append('meta_title',product.meta_title);
  formData.append('meta_description',product.meta_description);

    axios.post(`/api/addProduct`,formData)
    .then(res=>{
      if(res.data.status===200) {
        document.getElementById("prodForm").reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        });
       
        setProduct({...product,
          category_id:'',
          name:'',
          slug:'',
          description:'',
          sell_price:'',
          orginal_price:'',
          qty:'',
          status:false,
          featured:false,
          popular:false,
          brand:'',
          meta_tag:'',
          meta_title:'',
          meta_description:'',
        
        });
        seterror_list([]);
        // navigate('/admin/ProductView');
      }else if(res.data.status===204){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please fill required field',
        });

        seterror_list(res.data.validation);
     
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
    <h3 className="mt-4">Add Product</h3>
      <div className='row'> 
    <nav>
  <div className="nav nav-tabs" id="nav-tab" role="tablist">
    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Others</button>
    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">SEO</button>
  </div>
</nav>

{/* <div className='alert alert-danger mt-4'>
{
  product.error_list.map((item)=>{

return(
  <li>{item}</li>
)
  })
}
</div> */}

<form onSubmit={AddProduct} id='prodForm'>
<div className="tab-content" id="nav-tabContent">
 
  <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

  <select className="form-select mt-4 mb-3"  defaultValue={'DEFAULT'} aria-label="Default select example" name='category_id' onChange={handleProduct}>
  <option  value="DEFAULT" disabled>select Category</option>
    {
      categories.map((item)=>{
        return (
          <option value={item.id} key={item.id}>{item.name}</option>
        )
      })
    }

</select>  <span className='text-danger'>{error_list.category}</span>


<div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
    <input type="text" className="form-control"  name="name" onChange={handleProduct}   value={product.name}  id="exampleInputPassword1"/>
    <span className='text-danger'>{error_list.name}</span>
     </div>   

     <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Slug</label>
    <input type="text" className="form-control"  name="slug"   onChange={handleProduct}   value={product.slug} id="exampleInputPassword1"/>
    <span className='text-danger'>{error_list.slug}</span>
     </div>

     <div className="mb-3">
    <label htmlFor="exampleInputDesciption" className="form-label" >Short Desciption</label>
    <textarea type="text" className="form-control" name="description"   onChange={handleProduct}   value={product.description}  id="exampleInputDesciption"></textarea>
     </div>    
      </div>



  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">

<div className='row mt-3 mb-3'>

<div className='col-md-4'>
<div className="">
    <label htmlFor="examplesell_price" className="form-label">Selling Price</label>
    <input type="text" className="form-control" name="sell_price" onChange={handleProduct}   value={product.sell_price}  id="examplesell_price"/>
    <span className='text-danger'>{error_list.sell_price}</span>
</div> 

</div>
<div className='col-md-4'>
<div className="">
    <label htmlFor="exampleorginal_price" className="form-label">Orginal Price</label>
    <input type="text" className="form-control" name="orginal_price"  onChange={handleProduct}   value={product.orginal_price}  id="exampleorginal_price"/>
</div> 
    </div>
<div className='col-md-4'>
<div className="">
    <label htmlFor="exampleInputTagqty" className="form-label">Quantity</label>
    <input type="text" className="form-control" name="qty"   onChange={handleProduct}   value={product.qty} id="exampleInputTagqty"/>
    <span className='text-danger'>{error_list.qty}</span>
</div> 
    
    </div>
 </div>

 <div className='row mb-3'>

<div className='col-md-4'>
<div className="">
    <label htmlFor="exampleInputTagbrand" className="form-label">Brand</label>
    <input type="text" className="form-control" name="brand"  onChange={handleProduct}   value={product.brand}  id="exampleInputTagbrand"/>
</div> 

</div>
<div className='col-md-8'>

<div className="mb-3">
    <label htmlFor="exampleImage" className="form-label">Image</label>
    <input type="file" className="form-control" name="image"  onChange={handleProduct_image}  accept='image/*'  id="exampleImage" aria-describedby="emailHelp"/>
    <span className='text-danger'>{error_list.image}</span>
    <img src={image} id="Addimage" className='d-none mt-2' height="100" width="150" alt='select Image'/>
  </div>

    </div>

 </div>


 <div className='row'>

<div className='col-md-4'>

<div className="form-check">
    <input type="checkbox" className="form-check-input"  name="status"  onChange={handleProduct}   checked={product.status} id="exampleCheck1"/>
    <label className="form-check-label"   htmlFor="exampleCheck1">Status</label>
  </div> 

</div>
<div className='col-md-4'>
<div className="form-check">
    <input type="checkbox" className="form-check-input"  name="featured"  onChange={handleProduct}   checked={product.featured} id="exampleCheck2"/>
    <label className="form-check-label"   htmlFor="exampleCheck2">Featured</label>
  </div> 
    </div>
<div className='col-md-4'>
<div className="form-check">
    <input type="checkbox" className="form-check-input"  name="popular" onChange={handleProduct}   checked={product.popular}  id="exampleCheck3"/>
    <label className="form-check-label"   htmlFor="exampleCheck3">Popular</label>
  </div> 
    
    </div>
 </div>

  </div>


  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">

  <div className="mb-3 mt-3">
    <label htmlFor="exampleInputTag" className="form-label">Meta Tag</label>
    <input type="text" className="form-control" name="meta_tag" onChange={handleProduct}  value={product.meta_tag} id="exampleInputTag"/>
     </div> 

     <div className="mb-3">
    <label htmlFor="exampleInputTitle" className="form-label">Meta Title</label>
    <input type="text" className="form-control" name="meta_title" onChange={handleProduct}  value={product.meta_title}   id="exampleInputTitle"/>
     </div> 

     <div className="mb-3">
    <label htmlFor="exampleInputDesciption" className="form-label">Meta Desciption</label>
    <textarea type="text" className="form-control" name="meta_description"  onChange={handleProduct}  value={product.meta_description} id="exampleInputDesciption"></textarea>
     </div> 


      </div>


   

</div>
<div className='mt-3'>
<button type="submit" className="btn btn-primary d-block">Submit</button>
</div>
</form>
</div> 
</div>
    </>
  )
}

export default ProductAdd