import { React, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button'
import bgImage from '../images/home1.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'
import AuthContext from '../context/AuthContex'
// components
import Contact from '../Components/ContactComp'
// pages
import Courses from '../Components/Courses'



const Home = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/home/api`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          context.setLoggedStatus(true);
          context.setLoggedUser(response.data.loggedUser);
        } else {
          context.setLoggedStatus(false);
        }
      } catch (error) {
        context.setLoggedStatus(false);
      }
    }
    auth();
    window.scrollTo(0,0);
    // eslint-disable-next-line
  }, []);


  return (
    <div className="container-fluid util pt-md-2 m-0 p-0 mt-md-3" >
      <div className="container-fluid p-0 mt-4 mt-md-0 " style={{  minHeight: "100vh" }}>
        <div className="row justify-content-center mt-3 mx-0">
          <div className="col-12 col-md-5 order-md-1 order-2 homepage-text py-md-5 py-0">
            <span className="fs-1 fw-bolder text-primary py-4">Skill Ascent!</span>
            <span className="fs-5 fs-md-2 fw-bolder text-center">"Start learning today,for better tomorrow!"</span>
            <Button className="btn btn-danger my-5 fw-bolder" as={Link} to="/courses">Start learning</Button>
          </div>

          <div className="col-12 order-1 order-md-2 col-md-6 py-md-5 pt-5 ">
            <img src={bgImage} className="homepage-image " alt="not found" />
          </div>
        </div>
      </div>

      <div className="d-flex flex-column p-0 py-5 mx-0" style={{ backgroundColor: "#f8f1ff", minHeight: "100vh" }}>
        <div className="container-fluid m-0 my-5 py-2 row justify-content-center">
          <Courses />
        </div>
        <div className="text-center mt-auto my-5">
          <Button as={Link} to={`/courses`} className="btn btn-danger text-center">Learn more</Button>
        </div>
      </div>
      <Contact />
    </div>
  )
}

export default Home