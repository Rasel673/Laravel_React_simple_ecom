import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [product, setproduct] = useState('');
    const [quantity,setquantity]=useState(1);
    const [loding, setloding] = useState(true);
    let {slug}=useParams();
  
const handleIncrement=()=>{
   
     setquantity((prevquantity=>prevquantity+1)) 
 
}
const handleDecrement=()=>{
    if(quantity>1)
    setquantity((prevquantity=>prevquantity-1))
  }
  
    useEffect(() => {
      var isMounted=true;
     axios.get(`/api/ViewsingleProduct/${slug}`).then(res=>{
    if(res.status===200){
    setproduct(res.data.product);
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
  
    const addToCart=(e)=>{
      e.preventDefault();

      const data={
        product_id:product.id,
        product_qty:quantity
      }

      axios.post('/api/addToCart',data).then(response=>{
       if(response.data.status===200){
        Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
        });
       }else if(response.data.status===409){
        Swal.fire({
          icon: 'warning',
          title:response.data.message,
          showConfirmButton: false,
        });
       }else{
        Swal.fire({
          icon: 'error',
          title:response.data.message,
          showConfirmButton: false,
        });
       };
      }).catch()
    }

  
  if(loding){
  return<h4>Loading Category....</h4>
  }else{
  
 var avail_stock='';

 if(product.qty>0){
avail_stock =
<div>
<button className='btn btn-success btn-sm fw-bold'>In-Stock</button>
<div className="input-group pt-2">
<button className="input-group-text fw-bold fs-5" onClick={handleIncrement}>+</button>
<div className='text-center form-control col-md-3'>{quantity}</div>
<button className="input-group-text  fw-bold fs-5" onClick={handleDecrement}>-</button>
<button className='btn btn-primary ms-5 fw-bold' onClick={addToCart}>Add to Cart</button>
</div>
</div>
 }else{
    <div>
    <button className='btn btn-danger btn-sm fw-bold'>Out-of-Stock</button>
    </div>
 }

  
  }


  return (
    <>
    <div className='container mt-2'>
    <h5 className='text-success text-end'>Collection/{product.category.name}/{product.slug}</h5>
        <div className='row'>
            <div className='col-md-4'>
                <img className='w-100 p-5' src={`http://127.0.0.1:8000${product.image}`} />
            </div>
            <div className='col-md-8 border-start border-3'>
            <div className='brand-stock'>
                <button className='btn btn-danger btn-sm fw-bold'>{product.brand}</button>
            </div>
            <h2 className='fw-bold text-start pt-2 pb-1'>{product.name}</h2>
            <h4 className='fw-bold text-start pb-2'>Price: {product.sell_price}<span className='fw-bold fs-2'>&#2547;</span></h4>
            <p>{product.description}</p>

           {avail_stock}

            {/* <button className='btn btn-danger ms-5 fw-bold'>Add to Wishlist</button> */}
            </div>
        </div>
    </div>
    </>
  )
}

export default ProductDetails