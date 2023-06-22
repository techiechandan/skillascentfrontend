import React, { useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link,useNavigate } from 'react-router-dom'
import { State, City } from 'country-state-city'
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'
import AuthContext from '../context/AuthContex';

const Register = ({changeLoggedStatue}) => {
  const context = useContext(AuthContext);
  const [StateList, setStateList] = useState([]);
  const [CityList, setCityList] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checkStatus, setCheckStatus] = useState(false);


  //message stack
  const [messageStack, setMessageStack] = useState(null);
  const navigate = useNavigate();

  // Populating cities list
  const getCity = (CountryCode, StateCode) => {
    setCityList(City.getCitiesOfState(CountryCode, StateCode));
  }

  // Sumit Handler
  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const nameRegex = /^[a-zA-Z ]{4,30}$/;
      const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
      const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
      console.log(name, email, course, state, city, password, confirmPassword);
      
      // validating credentials
      if (!name.match(nameRegex)) setMessageStack("Please enter valid name");
      else if (!email.match(emailRegex)) setMessageStack("Please enter valid email")
      else if (!password.match(passRegex)) setMessageStack("Please enter valid password")
      else if (!password === confirmPassword) setMessageStack("Password do not match!");
      else {
        const response = await axios.post(
          `${BaseUrl}/user/register/api`,
          { name, email, course, state, city, password, confirmPassword },
          { withcredentials: true }
        );
        if (response.status === 200) {
          navigate("/user/login");
        }
      }
    } catch (error) {
      setMessageStack(error.response.data.message);
    }
  }

  useEffect(() => {
    setStateList(State.getStatesOfCountry("IN"));
    const auth = async()=>{
      try {
        const response = await axios.get(`${BaseUrl}/user/register/api`);
        if(response.status === 200 && response.data.loggedUser !== "undefined"){
          context.setLoggedStatus(true);
          navigate('/');
        }
      } catch (error) {
        context.setLoggedStatus(false);
      }
    }
    auth();
    // eslint-disable-next-line
  }, []);

  
  return (
    <div className="container-fluid m-0 pt-3 my-5 d-flex flex-column justify-content-center align-items-center">
      {messageStack &&
        <Alert className="w-50" variant="danger" onClose={() => setMessageStack(null)} dismissible>
          <p className="p-0 m-0">{messageStack}</p>
        </Alert>
      }
      <Form className="border p-md-5 p-4 mt-5 rounded shadow" onSubmit={submitHandler}>
        <div className="text-center">
          <span className="fs-2 fw-bold">Register</span>
        </div>
        <div className="row">
          <div className="col-md-5 col-12">
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" value={name} onChange={(event) => { setName(event.target.value) }} />
            </Form.Group>
          </div>
          <div className="col-md-7 col-12">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </div>
        </div>
        <div className="row m-0 p-0">
          <div className="col-md-4 col-12 m-0 p-0 me-md-1">
            <Form.Group className="mb-3" controlId="">
              <Form.Label>Course</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(event) => { setCourse(event.target.value) }}>
                <option>Select Course</option>
                <option value="BCA">BCA</option>
                <option value="BBA">BBA</option>
                <option value="B.Tech">B.Tech</option>
                <option value="BJMC">BJMC</option>
                <option value="B.Com">B.Com</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-md-7 col-12 m-0 p-0">
            <div className="row p-0 m-0">
              <div className="col-6 p-0">
                <Form.Label>State</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(event) => { setState(StateList[event.target.value].name); getCity("IN", StateList[event.target.value].isoCode) }}>
                  <option className="py-0 selected">Select State</option>
                  {
                    StateList.map((item, index) => {
                      return <option className="py-0" key={item.isoCode} value={index}>{item.name}</option>
                    })
                  }
                  <option vlaue="Not Listed">Not Listed</option>
                </Form.Select>
              </div>
              <div className="col-6 ps-1">
                <Form.Label>City</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(event) => { setCity(event.target.value) }}>
                  <option>Select City</option>
                  {
                    CityList.map((item, index) => {
                      return <option key={index} vlaue={item.name}>{item.name}</option>
                    })
                  }
                  <option vlaue="Not Listed">Not listed</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
              <Form.Text className="text-muted">
                Password must be of at least 8 characters containing alphabet,numbers and symbols.
              </Form.Text>
            </Form.Group>
          </div>
          <div className="col-md-6 col-12">
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirm-password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} />
            </Form.Group>
          </div>
        </div>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="I agree to terms and conditions" onChange={() => { setCheckStatus(!checkStatus) }} />
        </Form.Group>
        <div className="text-center">
          <Button className={checkStatus ? "text-center" : "text-center disabled"} variant="danger" type="submit">Submit</Button>
        </div>
        <hr className=""></hr>
        <div className="text-center my-2">
          <span className="mx-2">Already reginster?</span><Link to="/user/login">Login</Link>
        </div>
      </Form>
    </div>
  )
}

export default Register