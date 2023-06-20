import { BrowserRouter, Routes, Route, } from 'react-router-dom'
import axios from 'axios'
import {useState, lazy, Suspense} from 'react'

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
const PrivacyPolicy = lazy(()=>import('.Pages/PrivacyPolicy'));
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


// import Home from './Pages/Home'
// import About from './Pages/About'
// import Contact from './Pages/Contact'
// import Coureses from './Pages/CourseList'
// import Disclamer from './Pages/Disclamer'
// import PrivacyPolicy from './Pages/Privacy_Policy'
// import Login from './Pages/Login'
// import Register from './Pages/Register'
// import Learn from './Pages/Learn'
// import ResetPassword from './Pages/ResetPassword'
// import ChangePassword from './Pages/ChangePassword'
// import SetNewPassword from './Pages/SetNewPassword'


// admin side pages
// import AdminLogin from './Pages/admin/Login'
// import Dashboard from './Pages/admin/Dashboard'
// import Users from './Pages/admin/Users'
// import CoureseList from './Pages/admin/CourseList'
// import WriteContent from './Pages/admin/WriteContent'
// import ViewContents from './Pages/admin/ViewContents'
// import UpdateContent from './Pages/admin/UpdateContent'
// import Query from './Pages/admin/Query'
// import Setting from './Pages/admin/Setting'

const currentPath = window.location.pathname;

axios.defaults.withCredentials = true; // to store token receved from backend

function App() {
  const[LoggedStatus,setLoggedStatus] = useState(false);

  const changeLoggedStatue = (status)=>{
    setLoggedStatus(status);
  }

  const[LoggedUser,setLoggedUser] = useState(null);
  const changeLoggedUser = (loggedUser)=>{
    setLoggedUser(loggedUser);
  }

  return (
    <BrowserRouter>
      {!currentPath.includes("admin") && <Header LoggedStatus = {LoggedStatus} LoggedUser = {LoggedUser} changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />}
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route exact path="/" element={<Home changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/about" element={<About changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser}/>} />
        <Route exact path="/contact" element={<Contact changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/courses" element={<Coureses changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/disclamer" element={<Disclamer changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        {/* <Route exact path="/privacy-policy" element={<Privacy_Policy changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} /> */}
        <Route exact path="/user/login" element={<Login changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/user/register" element={<Register changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/learn/:courseName" element={<Learn changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />}>
          <Route exact path="/learn/:courseName/:topicName" element={<Content changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        </Route>
        <Route exact path="/user/change-password" element={<ChangePassword changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/user/reset-password" element={<ResetPassword changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/user/reset/password?" element={<SetNewPassword changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="admin/dashboard" element={<Dashboard />} />
        <Route exact path="admin/site-settings" element={<Setting />} />
        <Route exact path="admin/queries" element={<Query />} />
        <Route exact path="admin/users" element={<Users />} />
        <Route exact path="admin/course-list" element={<CoureseList />} />
        <Route exact path="admin/add-content/:courseName" element={<WriteContent />} />
        <Route exact path="admin/view-contents/:courseName" element={<ViewContents />} />
        <Route exact path="admin/update-content/:courseName/:slug" element={<UpdateContent />} />
        <Route path = "/*" element={<Home changeLoggedStatue = {changeLoggedStatue} changeLoggedUser = {changeLoggedUser} />} />
      </Routes>
      </Suspense>
      {!currentPath.includes("admin") ? <Footer /> : null}
    </BrowserRouter>
  );
}

export default App;
