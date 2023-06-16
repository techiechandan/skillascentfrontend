import React from 'react'
import { FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className="contianer-flud text-center pt-5 pb-3 px-0 m-0" style={{backgroundColor:"darkgray"}}>
      <div className="container-fluid row justify-content-around my-md-5 my-2 px-md-2 px-0 m-0">
        <div className="col-md-4 col-12 d-flex justify-content-md-center p-0 my-md-0 my-2 ">
          <ul className="list m-0 px-md-0 px-0 text-start">
          <Link to="/" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Home</li></Link>
          <Link to="/about" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />About</li></Link>
          <Link to="/contact" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Contact</li></Link>
          <Link to="/courses" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Courses</li></Link>
          </ul>
        </div>
        <div className="col-md-4 col-12 d-flex justify-content-md-center p-0 my-md-0 my-2 ">
          <ul className="list m-0 px-md-0 px-0 text-start">
          <Link to="/disclamer" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Disclamer</li></Link>
          <Link to="/privacy-policy" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Privacy & Policy</li></Link>
          <Link to="/feedback" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Feedback</li></Link>
          <Link to="/courses" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Courses</li></Link>
          </ul>
        </div>
        <div className="col-md-4 col-12 d-flex justify-content-md-center m-0 p-0 my-md-0 my-2 ">
          <ul className="list m-0  px-0 text-start">
          <Link to="/" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />LinkedIn</li></Link>
          <Link to="/about" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Twitter</li></Link>
          <Link to="/contact" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Youtube</li></Link>
          <Link to="/courses" className="text-decoration-none text-dark"><li className="py-1 my-1  ps-4"><FaAngleRight />Instagram</li></Link>
          </ul>
        </div>
      </div>
      <div className="mb-md-0 mb-4">Copyright @Skill Accent. All rights reserved.</div>
    </div>
  )
}

export default Footer