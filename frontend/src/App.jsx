import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AdminRootLayouts from "./admin/layouts/AdminRootLayouts";
import Adminlogin from './admin/screens/Adminlogin'
import Pagenotfound from "./screens/Pagenotfound";
import Admindashboard from "./admin/screens/Admindashboard";
import AdminBooksLayout from "./admin/layouts/AdminBooksLayout";
import List from "./admin/screens/Books/List";
import Addbook from "./admin/screens/Books/Addbook";
import Genre from "./admin/screens/Genre";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";
import RootLayouts from "./customer/layouts/RootLayouts";
import Home from "./customer/screens/Home";
import BookDetails from "./customer/screens/BookDetails";
import Editbook from "./admin/screens/Books/Editbook";
import Adminsignup from "./admin/screens/Adminsignup";
import Errorpage from "./screens/Errorpage";




const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<RootLayouts/>} errorElement={<Errorpage/>}>
      <Route index element={<Home/>}></Route>
      <Route path='book-details' element={<BookDetails/>}></Route>
    </Route>
      <Route path="admin"  element={<AdminRootLayouts />} errorElement={<Errorpage/>}>
        <Route path="login" element={<Adminlogin/>}></Route>
        <Route path="signup" element={<Adminsignup/>}></Route>
        <Route path="dashboard" element={<Admindashboard/>}></Route>
        <Route path="books" element={<AdminBooksLayout/>}>
            <Route index element={<List/>}></Route>
            <Route path="addbook/" element={<Addbook/>}></Route>
            <Route path="editbook/" element={<Addbook/>}></Route>
        </Route>
        <Route path="genre" element={<Genre/>}></Route>
      </Route>
      <Route path="*" element={<Pagenotfound/>}></Route>
    </>
  )
)


function App() {
  

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
