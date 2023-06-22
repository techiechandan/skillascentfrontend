import {React,useContext} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { Link,useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'
import AuthContext from '../context/AuthContex';


const Header = () => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const LogOut = async() => {
    try {
      const response = await axios.get(`${BaseUrl}/user/logout/api`);
      if(response.status === 200 && (response.data.loggedUser === "undefined")) {
        context.setLoggedStatus(false);
        context.setLoggedUser(null);
        navigate('/user/login');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <Navbar collapseOnSelect bg="light" variant="light" expand="lg" className="fixed-top" style={{zIndex:"99999"}}>
      <Container>
        <Navbar.Brand as = {Link} to = '/' className="fw-bold fs-3 text-primary">Skill Ascent</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto fw-bold">
            <Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link>
            <Nav.Link eventKey="2" as={Link} to="/courses">Courses</Nav.Link>
            <Nav.Link eventKey="3" as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link eventKey="4" as={Link} to="/contact">Contact Us</Nav.Link>
          </Nav>
          {context.loggedStatus ?
            <Nav className="fw-bold">
              <Dropdown>
                <DropdownButton
                  id="dropdown-autoclose-true"
                  className=" border border-0"
                  drop={`down-centered`}
                  variant="transparent"
                  title={context.loggedUser && <span className="fs-4"> <FaUserCircle /> <span className="fw-bold fs-6">{context.loggedUser.slice(0, context.loggedUser.indexOf(" "))}</span></span>}>
                  <Dropdown.Item eventKey="5" as = {Link} to = "/user/change-password">Change Password</Dropdown.Item>
                  <Dropdown.Item eventKey="6" as = {Button} className="bg-transparent" onClick={LogOut}>Logout</Dropdown.Item>
                </DropdownButton>
              </Dropdown>
            </Nav> :
            <Nav className="fw-bold">
              <Nav.Link eventKey="7" as={Link} to="/user/register" className="btn btn-primary mx-md-2 mb-2 mb-lg-0 text-light" >Register</Nav.Link>
              <Nav.Link eventKey="8" as={Link} to="/user/login" className="btn btn-success mx-md-2 mb-2 mb-lg-0 text-light" >Login</Nav.Link>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header