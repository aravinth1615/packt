import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router';




const Sidebar = () => {
 const location = useLocation()

  return (
    <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
            {/* <li className="nav-item">
                <Link className="nav-link" to={'/admin/dashboard'}>
                    <i className="bi bi-grid"></i>
                    <span>Dashboard</span>
                </Link>
            </li> */}
            <li className="nav-item">
                <Link to={'/admin/books'}  className= {location.pathname.startsWith("/admin/books") ? `nav-link` : ` nav-link collapsed`} >
                    <i className="bi bi-book"></i>
                    <span>Books</span>
                </Link>
            </li>   
            <li className="nav-item">
                <Link to={'/admin/genre'} className ={location.pathname.startsWith("/admin/genre") ? `nav-link` : ` nav-link collapsed`}>
                    <i className="bi bi-film"></i>
                    <span>Genre</span>
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar