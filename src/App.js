import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import axios from 'axios'
import {lazy, Suspense} from 'react'

// Components
import Header from './Components/Header'
import Footer from './Components/Footer'
import Content from './Components/Content'
// pages
const Home = lazy(()=>import('./Pages/Home'));
const About = lazy(()=>import('./Pages/About'));
const Contact = lazy(()=>import('./Pages/Contact'));
const Coureses = lazy(()=>import('./Pages/CourseList'));
const Disclamer = lazy(()=>import('./Pages/Disclamer'));
const PrivacyPolicy = lazy(()=>import('./Pages/PrivacyPolicy'));
const Login = lazy(()=>import('./Pages/Login'));
const Register = lazy(()=>import('./Pages/Register'));
const Learn = lazy(()=>import('./Pages/Learn'));
const ResetPassword = lazy(()=>import('./Pages/ResetPassword'));
const ChangePassword = lazy(()=>import('./Pages/ChangePassword'));
const SetNewPassword = lazy(()=>import('./Pages/SetNewPassword'));
// Admin Pages
const AdminLogin = lazy(()=>import('./Pages/admin/Login'));
const Dashboard = lazy(()=>import('./Pages/admin/Dashboard'));
const Users = lazy(()=>import('./Pages/admin/Users'));
const CoureseList = lazy(()=>import('./Pages/admin/CourseList'));
const WriteContent = lazy(()=>import('./Pages/admin/WriteContent'));
const ViewContents = lazy(()=>import('./Pages/admin/ViewContents'));
const UpdateContent = lazy(()=>import('./Pages/admin/UpdateContent'));
const Query = lazy(()=>import('./Pages/admin/Query'));
const Setting = lazy(()=>import('./Pages/admin/Setting'))

const currentPath = window.location.pathname;

axios.defaults.withCredentials = true; // to store token receved from backend

function App() {

  return (
    <BrowserRouter>
      {!currentPath.includes("admin") && <Header  />}
      <Suspense fallback={FallBackContent()}>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/courses" element={<Coureses />} />
        <Route exact path="/disclamer" element={<Disclamer />} />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy/>} />
        <Route exact path="/user/login" element={<Login/>} />
        <Route exact path="/user/register" element={<Register />} />
        <Route exact path="/learn/:courseName" element={<Learn />}>
          <Route exact path="/learn/:courseName/:topicName" element={<Content/>} />
        </Route>
        <Route exact path="/user/change-password" element={<ChangePassword/>} />
        <Route exact path="/user/reset-password" element={<ResetPassword/>} />
        <Route exact path="/user/reset/password?" element={<SetNewPassword/>} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="admin/dashboard" element={<Dashboard />} />
        <Route exact path="admin/site-settings" element={<Setting />} />
        <Route exact path="admin/queries" element={<Query />} />
        <Route exact path="admin/users" element={<Users />} />
        <Route exact path="admin/course-list" element={<CoureseList />} />
        <Route exact path="admin/add-content/:courseName" element={<WriteContent />} />
        <Route exact path="admin/view-contents/:courseName" element={<ViewContents />} />
        <Route exact path="admin/update-content/:courseName/:slug" element={<UpdateContent />} />
        <Route path = "/*" element={<Home/>} />
      </Routes>
      </Suspense>
      {!currentPath.includes("admin") ? <Footer /> : null}
    </BrowserRouter>
  );
}

const FallBackContent = ()=>{
  return(
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
      <div className="">Loading...</div>
    </div>
  )
}



export default App;
