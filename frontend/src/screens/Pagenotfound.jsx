import React from 'react'
import notFoundImage from '../assets/img/not-found.svg'
import { Link } from 'react-router-dom'


const Pagenotfound = () => {
  return (
    <div className="container">
      <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>404</h1>
        <h2>The page you are looking for doesn't exist.</h2>
        <img src={notFoundImage} className="img-fluid py-5" alt="Page Not Found"/>
        <Link to={'/'} className="btn" >Back to home</Link>
      </section>
    </div>
  )
}

export default Pagenotfound