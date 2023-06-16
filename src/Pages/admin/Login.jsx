import { React, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useNavigate } from 'react-router-dom';
import BaseUrl from '../../helper/urlHelper'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [messageStack, setMessageStack] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async(event) => {
    try {
      event.preventDefault();
      console.log(`Email:${email} and Password:${password}`);
      const response = await axios.post(`${BaseUrl}/admin/login/api`,{email,password});
      if(response && response.status === 200) navigate("/admin/dashboard");
    } catch (error) {
      setMessageStack(error.response.data.message);
    }
  }


  useEffect(() => {
    const Auth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/admin/auth/api");
        if (response && response.status === 200) {
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    }
    Auth();
  },[navigate]);


  return (
    <div className="container-fluid m-0 vh-100 d-flex flex-column justify-content-center align-items-center">
      {messageStack &&
        <Alert className="w-50" variant="danger" onClose={() => setMessageStack(null)} dismissible>
          <p className="p-0 m-0">{messageStack}</p>
        </Alert>
      }
      <Form className="border p-md-5 p-4 rounded shadow" onSubmit={submitHandler}>
        <div className="text-center">
          <span className="fs-2 fw-bold">Skill Ascent Admnistration</span>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Admin Email address</Form.Label>
          <Form.Control type="email" placeholder="admin@gmail.com" value={email} onChange={(event) => { setEmail(event.target.value) }} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => { setPassword(event.target.value) }} />
        </Form.Group>
        <div className="text-center">
          <Button className="text-center" variant="danger" type="submit">Login</Button>
        </div>
      </Form>
    </div>
  )
}

export default Login