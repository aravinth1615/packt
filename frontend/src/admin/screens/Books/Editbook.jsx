import React, { useContext } from 'react'
import { AppDataContext } from '../../../context/AppDataContext'
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import axios from "axios";
import { useNavigate } from "react-router";



const Editbook = () => {
    const {state} = useContext(AppDataContext)
    const {bookDetail} = state

    const { handleSubmit, register, control, reset, getValues, setValue, formState: { errors }  } = useForm(
        {
          defaultValues: {
              id: '',
              image: {},
              title: '',
              genre: '',
              isbn: '',
              author: '',
              publisher_name: '',
              publisher_date: '',
              description:''
            },
          }
      
      );

    console.log(bookDetail)

  return (
    <div>Editbook</div>
  )
}

export default Editbook