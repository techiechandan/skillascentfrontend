import { React, useState, useEffect, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'
import AuthContext from '../context/AuthContex';

const Login = () => {
  const context = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //message stack
  const [messageStack, setMessageStack] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${BaseUrl}/user/login/api`, { email, password }, { withCredentials: true });
      if (response.status === 200 && response.data.loggedUser !== "undefined") {
        context.setLoggedUser(response.data.loggedUser);
        context.setLoggedStatus(true);
        navigate("/");
      }else{
        context.setLoggedUser(null);
        context.setLoggedStatus(false);
      }
    } catch (error) {
      setMessageStack(error.response.data.message);
    }
  }

 

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/login/api`);
        if (response.status === 200 && response.data.loggedUser !== "undefined") {
          context.setLoggedStatus(true);
          context.setLoggedUser(response.data.loggedUser);
          navigate('/');
        } else {
          context.setLoggedStatus(false);
          context.setLoggedUser(null);
        }
      } catch (error) {
        context.setLoggedStatus(false);
        context.setLoggedUser(null);
      }
    }
    auth();
    window.scrollTo(0,0);
    // eslint-disable-next-line
  }, []);


  return (
    <div className="container-fluid m-0 pt-3 vh-100 d-flex flex-column justify-content-center align-items-center">
      <Form className="border p-md-5 p-4 rounded shadow" onSubmit={submitHandler}>
        <div className="text-center">
          <span className="fs-2 fw-bold">Login</span>
        </div>
        {messageStack &&
          <Alert className="w-100" variant="danger" onClose={() => setMessageStack(null)} dismissible>
            <p className="p-0 m-0">{messageStack}</p>
          </Alert>
        }
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => { setEmail(event.target.value) }} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
        </Form.Group>
        <div className="text-center">
          <Button className="text-center" variant="primary" type="submit">Submit</Button>
        </div>
        <hr className=""></hr>
        <div className="text-center my-2">
          <span className="mx-2">Forgot Password?</span><Link to="/user/reset-password">Reset</Link>
        </div>
        <div className="text-center my-2">
          <span className="mx-2">New user?</span><Link to="/user/register">Register</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login