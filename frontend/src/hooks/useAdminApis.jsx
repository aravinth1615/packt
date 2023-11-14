import {axiosGet, axiosPost, axiosDelete} from '../services/axiosApis'


const configData = await fetch('/config.json')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then((data) => {
        return data;
        console.log('Reached here', API_ENDPOINT);
    }).catch((error)=>{
    console.error('Error loading configuration:', error);
});

const API_ENDPOINT = configData.apiUrl

/**
 * 
 * @param {*} requestData 
 * @returns 
*/
export const adminLoginApi  = (requestData) => {
    const LOGIN_API = `${API_ENDPOINT}auth/login`
    return axiosPost(`${LOGIN_API}`, requestData)
}

export const adminLogoutApi = () =>{
    const LOGOUT_API = `${API_ENDPOINT}logout`
    return axiosPost(`${LOGOUT_API}`)
}

export const getGenreApi = () => {
    const GENRE_API = `${API_ENDPOINT}genre`
    return axiosGet(`${GENRE_API}`)
}

export const addUpdateGenreApi = (requestData) => {
    const ADD_UPDATE_GENRE_API = `${API_ENDPOINT}add-update-genre`
    return axiosPost(`${ADD_UPDATE_GENRE_API}`, requestData)
}

export const removeGenreApi = (deleteId) =>{
    const REMOVE_GENRE_API = `${API_ENDPOINT}remove-genre/${deleteId}`
    return axiosDelete(`${REMOVE_GENRE_API}`)
}


export const getBooksApi = () => {
    const BOOKS_API = `${API_ENDPOINT}books`
    return axiosGet(`${BOOKS_API}`)
}

export const addUpdateBooks = async (requestData) =>{
    const ADD_UPDATE_BOOK_API = `${API_ENDPOINT}add-update-book`
    return axiosPost(`${ADD_UPDATE_BOOK_API}`, requestData)
}

export const deleteBook = (deleteId) =>{
    const REMOVE_BOOK_API = `${API_ENDPOINT}remove-book/${deleteId}`
    return axiosDelete(`${REMOVE_BOOK_API}`)
}

export const registerApi = (requestData) => {
    const SIGNUP_API = `${API_ENDPOINT}signup`
    return axiosPost(`${SIGNUP_API}`, requestData)
}