import React, { useContext } from 'react'
import {Navigate, useLocation, useNavigate} from "react-router-dom"
import { AppDataContext } from '../context/AppDataContext'


const AdminProtectedRoute = ({children}) => {
    
    const {state} = useContext(AppDataContext)
    let location = useLocation();
    const navigate = useNavigate()


    console.log(state.adminLoginStatus)
    if(!state.adminLoginStatus) {
        return <Navigate to="/admin/login" state={{ from: location}} replace />
    }else{
        return navigate("/admin/dashboard")
    }
    return children
}

export default AdminProtectedRoute