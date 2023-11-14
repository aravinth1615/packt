import React, { useContext, useEffect } from 'react'
import profileImageLogo from '../../assets/img/profile-img.jpg'
import logo from '../../assets/img/logo.png'
import { AppDataContext } from '../../context/AppDataContext'
import { adminLogoutApi } from '../../hooks/useAdminApis'
import { useNavigate } from 'react-router'

const Header = () => {

  const {state, dispatch, setLoader} = useContext(AppDataContext)
  const {adminLoginStatus,  adminLoginDetails} = state
  const navigate = useNavigate()

  useEffect(()=>{

  }, [state])


  const logout = () =>{
    setLoader(true)
    adminLogoutApi().then((response)=>{
      if(response.status == 200){
        dispatch({type:"set_admin_login_status", payload:false})
        dispatch({type:"set_admin_user_details", payload:{}})
        localStorage.removeItem('admin_login_status')
        localStorage.removeItem('admin_user_details')
        localStorage.removeItem('userToken')
        navigate('/admin/login')
      }
      setLoader(false)
    }).catch((error)=>{
      setLoader(false)
    })
  }

  console.log(adminLoginDetails)
  return (
    <>
      <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <a href="#" className="logo d-flex align-items-center">
            <img src={logo} alt="" />
            <span className="d-none d-lg-block">Packt</span>
          </a>
          <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">

              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={profileImageLogo} alt="Profile" className="rounded-circle" />
                {
                  Object.keys(adminLoginDetails).length > 0 &&
                  <span className="d-none d-md-block dropdown-toggle ps-2">{adminLoginDetails.data.name}</span>
                }
                
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                {
                  Object.keys(adminLoginDetails).length > 0 &&
                  <h6>{adminLoginDetails.data.name}</h6>
                }
                  
                  <span>Admin</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item d-flex align-items-center" href="#" onClick={logout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Sign Out</span>
                    </a>
                  
                </li>

              </ul>
            </li>

          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header