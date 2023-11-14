import  axiosInstance from "../services/axios";

/**
 * 
 * @param {*} url 
 * @returns 
 */
export const axiosGet = async (url)=>{
    return await axiosInstance.get(url)
}

/**
 * 
 * @param {*} url 
 * @param {*} requestData 
 * @returns 
 */
export const axiosPost = async (url, requestData) =>{
    return await axiosInstance.post(url, requestData)
}

export const axiosDelete = async (url, requestData) => {
    return await axiosInstance.delete(url, requestData)
}
