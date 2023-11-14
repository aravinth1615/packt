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

export const getBooksApi = (data) => {
    const BOOKS_API = `${API_ENDPOINT}get-books`
    return axiosPost(`${BOOKS_API}`, data)
}