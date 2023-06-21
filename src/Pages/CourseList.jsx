import { React, useEffect,useContext } from 'react'
import { } from 'react-router-dom'
import axios from 'axios';
import BaseUrl from '../helper/urlHelper';
import AuthContext from '../context/AuthContex';
// pages 
import Courses from '../Components/Courses';

const CoureseList = () => {
  const context = useContext(AuthContext);
  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/courses/api`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          context.setLoggedUser(response.data.loggedUser);
          context.setLoggedStatus(true);
        } else {
          context.setLoggedStatus(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    auth();
    window.scrollTo(0,0);
    // eslint-disable-next-line
  }, [])


  return (
    <div className="p-0 py-5 mx-0" style={{ backgroundColor: "#f8f1ff", minHeight: "100vh" }}>
      <div className="container-fluid d-flex m-0 my-5 py-5 justify-content-center align-items-center">
          <Courses />
      </div>
    </div>


  )
}

export default CoureseList