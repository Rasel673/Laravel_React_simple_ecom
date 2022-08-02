

import Layout from './layout/admin/Layout';
import FrontLayout from './layout/frontend/FrontLayout';
import Login from './frontend/auth/Login';
import Register from './frontend/auth/Register';
import Dashboard from './backend/Dashboard';
import CategoryAdd from './backend/CategoryAdd';
import Home from './frontend/Home';
import Contact from './frontend/Contact';
import About from './frontend/About';
import Collection from './frontend/Collection';
import Error from './frontend/Error';
import axios from 'axios';
import CategoryView from './backend/CategoryView';
import CategoryEdit from './backend/CategoryEdit';
import ProductAdd from './backend/ProductAdd';
import ProductEdit from './backend/ProductEdit';
import ProductsView from './backend/ProductsView';
import SingleProduct from './backend/SingleProduct';
import ViewSingleProduct from './frontend/ViewSingleProduct';


import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

axios.defaults.baseURL='http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
 const token=localStorage.getItem('authToken');
  config.headers.Authorization=token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
    <Routes>
      {/* frontend route here */}
    <Route path='/'  element={<FrontLayout/>}>
      <Route index element={<Home/>}/>
      <Route path='/login' element={localStorage.getItem('authToken') ? <Navigate to="/"/>:<Login/>}/>
      <Route path='/register' element= {localStorage.getItem('authToken') ? <Navigate to="/"/>:<Register/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/category/:slug' element={<Collection/>}/>
      <Route path='/product/:slug' element={<ViewSingleProduct/>}/>
     
    </Route>


{/* admmin route here */}
    <Route path='/admin'  element={<Layout/>}>
      <Route index element={<Dashboard/>}/>
      <Route path='/admin/CategoryAdd' element={<CategoryAdd/>}/>
      <Route path='/admin/CategoryView' element={<CategoryView/>}/>
      <Route path='/admin/CategoryEdit/:id' element={<CategoryEdit/>}/>

      <Route path='/admin/ProductAdd' element={<ProductAdd/>}/>
      <Route path='/admin/ProductView' element={<ProductsView/>}/>
      <Route path='/admin/ProductEdit/:id' element={<ProductEdit/>}/>
      <Route path='/admin/SingleProduct/:id' element={<SingleProduct/>}/>
     
    </Route>


<Route path='*' element={<Error/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
