import { React, useEffect, Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import BaseUrl from '../helper/urlHelper';
// pages 
const Courses = lazy(() => import('../Components/Courses'));


const CoureseList = ({ changeLoggedStatue, changeLoggedUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/courses/api`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          changeLoggedUser(response.data.loggedUser);
          changeLoggedStatue(true);
        } else {
          changeLoggedStatue(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    auth();
  }, [navigate, changeLoggedStatue, changeLoggedUser])


  return (

    <div className="p-0 py-5 mx-0 mt-5" style={{ backgroundColor: "#f8f1ff",minHeight:"100vh" }}>
      <div className="container-fluid m-0 my-5 py-5 row justify-content-center">
        <Suspense>
          <Courses />
        </Suspense>
      </div>
    </div>


  )
}

export default CoureseList