import React, { useContext } from 'react'
import Header from '../components/Header'
import SideBar from '../components/Sidebar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'
import { AppDataContext } from '../../context/AppDataContext'
import Pageloader from '../../common/pageLoader'



const AdminRootLayouts = () => {
  const {state, loading} = useContext(AppDataContext)
  const {adminLoginStatus} = state
  return (
    <>
      {
        loading &&
        <Pageloader/>
      }
      {
        adminLoginStatus &&
        <>
        <Header/>
        <SideBar/>
        </>
      }
      <main id={adminLoginStatus ? "main" : ""}  className={adminLoginStatus ? "main" : ""}>
        <Outlet/>
      </main>
      {/* {
        adminLoginStatus &&
        <Footer/>
      } */}
      
    </>
  )
}

export default AdminRootLayouts