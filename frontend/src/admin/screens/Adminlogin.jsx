import React, { useContext, useEffect } from 'react'
import logo from '../../assets/img/logo-new.svg'
import { useForm } from 'react-hook-form'
import {adminLoginApi} from '../../hooks/useAdminApis'
import { AppDataContext } from '../../context/AppDataContext'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'





const Adminlogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {state, dispatch, setLoader} = useContext(AppDataContext)
  const navigate = useNavigate()


  useEffect(()=>{

  }, [state])

  /**
   * 
   * 
   * @param {*} data 
  */
  const onSubmit = (data) => {
    setLoader(true)
      adminLoginApi(data).then((response)=>{
        if(response.status == 200){
          dispatch({type:"set_admin_login_status", payload:true})
          dispatch({type:"set_admin_user_details", payload:response.data.data})
          localStorage.setItem('userToken', response.data.data.token)
          navigate('/admin/books');
        }else{
          console.log("sdfasd")
          
        }
        //console.log(response)
        setLoader(false)
      }).catch((error)=>{
        console.log(error.response.data.message)
        setLoader(false)
        Swal.fire({
          title: "Oops...",
          text: error.response.data.message,
          icon: "error"
        });
        
        
      })
  };
  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              <div className="d-flex justify-content-center py-4">
                <a href="index.html" className="logo d-flex align-items-center w-auto">
                  <img src={logo} alt="" />
                  <span className="d-none d-lg-block"></span>
                </a>
              </div>
              <div className="card mb-3">
                <div className="card-body">
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">Login to Admin</h5>
                    <p className="text-center small">Enter your username & password to login</p>
                  </div>
                  <form className="row g-3 needs-validation" onSubmit={handleSubmit(onSubmit)}>
                    <div className="col-12">
                      <label htmlFor="email" className="form-label">Email</label>
                      <div className="input-group has-validation">
                      <input type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                      </div>
                    </div>

                    <div className="col-12">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input type="password"  id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 4,
                            message: 'Password must be at least 6 characters',
                          },
                        })}
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>

                    
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">Login</button>
                    </div>
                    <div className="col-12">
                      <p className="small mb-0">Don't have account?
                        <Link to={'/admin/signup'}>Create an account</Link>
                      </p>
                    </div>
                  </form>

                </div>
              </div>

              <div className="credits">
                <a href="#">Packt</a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Adminlogin