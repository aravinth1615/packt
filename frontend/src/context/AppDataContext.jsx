import { createContext, useEffect, useReducer, useState } from "react";

export const AppDataContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case "set_admin_login_status":
            if(action.payload){
                localStorage.setItem('admin_login_status', action.payload)
            }
            return {...state, adminLoginStatus : action.payload}
        case "set_admin_user_details":
            if(Object.keys(action.payload).length > 0){
                localStorage.setItem('admin_user_details', JSON.stringify(action.payload))
            }
            return {...state, adminLoginDetails : action.payload}
        case 'set_book_detail':
            localStorage.setItem('book_detail', JSON.stringify(action.payload))
            return {...state, bookDetail : action.payload}
        default:
            return state;
    }
};

export const AppDataProvider = ({children}) =>{
    const [loading, setLoader] = useState(false)
    const [state, dispatch] = useReducer(appReducer, {
        adminLoginStatus: typeof window !== "undefined" && localStorage.getItem("admin_login_status") != null ? localStorage.getItem("admin_login_status") : false,
        adminLoginDetails: typeof window !== "undefined" && localStorage.getItem("admin_login_details") != null ? JSON.parse(localStorage.getItem("admin_login_details")) : {},
        bookDetail : typeof window !== "undefined" && localStorage.getItem("book_detail") != null ? JSON.parse(localStorage.getItem("book_detail")) : {},
    });
    return (
        <AppDataContext.Provider value={{
            state,dispatch,
            loading, setLoader
            }}>
            {children}
        </AppDataContext.Provider>
    )    
};
