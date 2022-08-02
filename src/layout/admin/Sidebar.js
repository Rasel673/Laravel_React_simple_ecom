import React from 'react'
import { Link,NavLink } from 'react-router-dom'


const Sidebar = () => {
    const authName=localStorage.getItem('userName');
  return (
    <>
      <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                           
                            <NavLink className="nav-link"  to="/admin">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Dashboard
                            </NavLink>
                            
                            <NavLink className="nav-link collapsed" to="/admin/Category" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                Category
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink>
                            <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/CategoryAdd">Add Category</Link>
                                    <Link className="nav-link" to="/admin/CategoryView">All Category</Link>
                                </nav>
                            </div>
                            <NavLink className="nav-link collapsed" to="/" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                Products
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </NavLink>
                            <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">
                                    <Link className="nav-link" to="/admin/ProductAdd">Add Products</Link>
                                    <Link className="nav-link" to="/admin/ProductView">All Products</Link>
                                </nav>
                            </div>
                           
                         
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                       {authName}
                    </div>
                </nav>
            </div>
    </>
  )
}

export default Sidebar