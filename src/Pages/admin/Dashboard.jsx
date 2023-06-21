import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
// icons
import { FaAlignJustify } from 'react-icons/fa'
// components
import Sidebar from '../../Components/admin/Sidebar'
import BaseUrl from '../../helper/urlHelper'
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';



const Dashboard = () => {
  const navigate = useNavigate();
  const [openState, setOpenState] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const GetDashboard = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/admin/dashboard/api`);
        if (!response && response.status !== 200) {
          navigate('/admin');
        }else{
          setIsLoaded(true);
        }
      } catch (error) {
        navigate('/admin');
        console.log(error);
      }
    }
    GetDashboard();
  }, [navigate])


  return (
    <>
      {isLoaded ?
        <div className="d-flex p-0">
          <Sidebar openState={openState} setOpenState={setOpenState} />
          <div className="container-fluid m-0 px-0 " style={{ backgroundColor: '#ececec',width:"100%" }}>
            <div className="container-fluid d-flex py-2 align-items-center sticky-top bg-light">
              <Button className="p-2 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={() => { setOpenState(!openState) }}>
                <FaAlignJustify />
              </Button>
              <h5 className="me-auto">Dashboard!</h5>
            </div>
            <div className=" p-0 py-3">
              <div className="text-center">
                <span className="fs-3 fw-bold">Welcome to Skill Ascent Adminstration..!</span>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="d-flex justify-content-center flex-column align-items-center  pt-5">
          <Spinner animation="border" variant="primary" />
          <p className="fw-bold fs-5">Please wait...</p>
        </div>
      }
    </>
  )
}

export default Dashboard