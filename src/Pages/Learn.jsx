import { React, useState, useEffect, useContext } from 'react'
import { Link, useParams, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner';
import BaseUrl from '../helper/urlHelper'
import AuthContext from '../context/AuthContex'

const Learn = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [CurrentWidth, setCurrentWidth] = useState(window.innerWidth);

  const resizeHandler = () => {
    setCurrentWidth(prevalue => window.innerWidth);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }
  window.addEventListener('resize', resizeHandler);

  const [isOpen, setIsOpen] = useState(true);
  const params = useParams();
  const openHandler = () => {
    setIsOpen(!isOpen);
  }

  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);



  const getContents = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/learn/${params.courseName}`);
      if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
        context.setLoggedStatus(true);
        context.setLoggedUser(response.data.loggedUser);
      } else {
        context.setLoggedStatus(false);
      }
      if (response.data.contents === undefined) {
        alert("Course not found!");
        navigate('/courses');
      } else {
        const topics = response.data.contents.map((item) => {
          return { topic: item.topic, slug: item.slug }
        });
        
        setTopics([...topics]);
        setContent(response.data.description);
        setIsLoaded(true);
      }
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    if (CurrentWidth < 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
    getContents();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  const sideBarHandelerOnClick = ()=>{
    if(CurrentWidth < 768){
      setIsOpen(false);
    }else{
      setIsOpen(true);
    }
  }


  return (
    <div className="p-0 mx-0  d-flex" style={{ backgroundColor: "#f8f1ff",}}>
      {CurrentWidth < 768 &&
        <Link onClick={openHandler} ><div className="container-fluid bg-light fixed-bottom py-2 text-dark text-center" style={{zIndex:"99999"}}>Topics</div></Link>
      }

      <div className={CurrentWidth < 768?"fixed-top vh-100 mt-md-5 bg-light":" vh-100 sticky-top"} style={{ backgroundColor: "#fffaf2", width:"19rem", marginLeft: isOpen ? "0px" : "-19rem", overflowY:"auto",}} >
        <ListGroup className="mt-md-5 mt-5 py-4" >
          {isLoaded ?
            topics.length > 0 &&
            topics.map((item, index) => {
              return (
                <ListGroup.Item as={Link} to={`${item.slug}`} key={index} onClick={sideBarHandelerOnClick} className="bg-transparent border-0 py-0">
                  {item.topic}
                </ListGroup.Item>
              )
            })
            :
            <>
              <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
                  <Spinner animation="border" variant="primary" />
              </div>
            </>
          }
        </ListGroup>
      </div>

      <div className="" style={{width:"100%"}}>
        <div className="my-md-5 py-5">
          {params.topicName ?
            <Outlet />
            :
            <div className="pt-5" style={{minHeight:"100vh"}}>
              {isLoaded ?
                <div className="text-center pt-5">
                  {content}
                </div>
                :
                <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
                  <Spinner animation="border" variant="primary" />
                  <p className="fw-bold fs-5">Please wait...</p>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div >
  )
}

export default Learn