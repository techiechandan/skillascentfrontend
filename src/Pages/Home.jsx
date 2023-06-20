import { React, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import bgImage from '../images/home1.png'
import {Link} from 'react-router-dom'
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'
// components
import Contact from '../Components/ContactComp'
// pages
import Courses from '../Components/Courses'



const Home = ({ changeLoggedStatue, changeLoggedUser }) => {

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/home/api`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          changeLoggedStatue(true);
          changeLoggedUser(response.data.loggedUser);
        } else {
          changeLoggedStatue(false);
        }
      } catch (error) {
        changeLoggedStatue(false);
      }
    }
    auth();
  }, [changeLoggedStatue, changeLoggedUser])


  return (
    <div className="container-fluid util pt-md-2 m-0 p-0 mt-md-3" >
      <div className="container-fluid row p-0 m-0 mt-md-3">
        <div className="col-12 col-md-5 order-md-1 order-2 homepage-text py-md-5 py-0">
          <span className="fs-1 fw-bolder text-primary">Skill Ascent!</span>
          <span className="fs-4 fw-bolder text-center">"Start learning today,for better tomorrow!"</span>
          <button className="btn btn-danger my-5 fw-bolder" as ={Link} to="/courses">Start learning</button>
        </div>
        <div className="col-12 order-1 order-md-2 col-md-7 py-md-0 py-5 mt-5">
          <img src={bgImage} className="homepage-image py-md-2" alt="not found" />
        </div>
      </div>

      <div className="vh-md-100 p-0 py-5 mx-0 mt-5" style={{ backgroundColor: "#f8f1ff" }}>
        <div className="container-fluid m-0 my-5 py-2 row justify-content-center">
          <Courses />
        </div>
        <div className="text-center my-5 ">
          <Button as={Link} to={`/courses`} className="btn btn-danger text-center">Learn more</Button>
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default Home