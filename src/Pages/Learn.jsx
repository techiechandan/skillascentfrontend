import { React, useState, useEffect } from 'react'
import { Link, useParams, Outlet } from 'react-router-dom'
import axios from 'axios'
import ListGroup from 'react-bootstrap/ListGroup'
// import Sidebar from '../Components/Sidebar'
import BaseUrl from '../helper/urlHelper'

const Learn = ({ changeLoggedStatue, changeLoggedUser }) => {

  const [CurrentWidth,setCurrentWidth] = useState(window.innerWidth);
  const resizeHandler = ()=>{
    setCurrentWidth(window.innerWidth);
    setIsOpen(true);
  }
  window.addEventListener('resize',resizeHandler);
  const [isOpen, setIsOpen] = useState(true);
  const params = useParams();
  const openHandler = () => {
    setIsOpen(!isOpen);
  }

  const [topics, setTopics] = useState([]);
  const [content, setContent] = useState(null);
  useEffect(() => {
    const getContents = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/learn/${params.courseName}`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          changeLoggedStatue(true);
          changeLoggedUser(response.data.loggedUser);
        } else {
          changeLoggedStatue(false);
        }

        if (response.data.contents === undefined) {
          console.log("content not found");
        } else {
          const topics = response.data.contents.map((item) => {
            return { topic: item.topic, slug: item.slug }
          });
          setTopics([...topics]);
          setContent(response.data.description);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getContents();
  }, [CurrentWidth, changeLoggedStatue, changeLoggedUser, params.courseName]);


  return (
    <div className="p-0 mx-0  d-flex w-100" style={{ backgroundColor: "#f8f1ff" }} >
      {CurrentWidth < 786 &&
        <Link onClick={openHandler} ><div className="container-fluid bg-danger fixed-bottom py-2  text-light text-center">click me</div></Link>
      }
      <div className="sidebar pt-5 mt-4 mt-md-5  ps-2 ps-md-2" style={{ backgroundColor: "#fffaf2", marginLeft: isOpen ? "0px" : "-400px" }}>
        <ListGroup className="my-md-0 my-5" >
          {topics.length > 0 &&
            topics.map((item, index) => {
              return (
                <ListGroup.Item as={Link} to={`${item.slug}`} key={index} className="bg-transparent border-0 py-0">
                  {item.topic}
                </ListGroup.Item>
              )
            })
          }
        </ListGroup>
      </div>

      <div className="main-cotainer" style={{ width: CurrentWidth > 768 ? CurrentWidth - 320 : "100%", padding: "10px 0", msOverflowY: isOpen ? 'hidden' : 'sroll' }}>
        <div className="px-3 my-md-5 py-5">
          {params.topicName ?
            <Outlet />
            :
            <div className="">
              {content}
            </div>
          }
        </div>
      </div>
    </div >
  )
}

export default Learn