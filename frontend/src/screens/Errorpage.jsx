import React from 'react'
import notFoundImage from '../assets/img/not-found.svg'
import { Link } from 'react-router-dom'


const Errorpage = () => {
  return (
    <div className="container">
      <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>500</h1>
        <h2>Somthing went wrong!.</h2>
        <img src={notFoundImage} className="img-fluid py-5" alt="Page Not Found"/>
        <Link to={'/'} className="btn" >Back to home</Link>
      </section>
    </div>
  )
}

export default Errorpage