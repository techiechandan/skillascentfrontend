import { React, useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import BaseUrl from '../helper/urlHelper'


const SetNewPassword = () => {
  const [CurrentWidth, setCurrentWidth] = useState(window.innerWidth);
  const resizeHandler = () => {
    setCurrentWidth(window.innerWidth);
  }
  window.addEventListener('resize', resizeHandler);


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageStack, setMessageStack] = useState(null);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
      if (!newPassword.match(passRegex)) {
        setMessageStack("Please enter a valid password");
      } else if (newPassword !== confirmPassword) {
        setMessageStack("Password do not match...");
      } else {
        const response = await axios.post(`${BaseUrl}/user/reset/password?id=${searchParams.get('id')}`,{newPassword:newPassword});
        if(response.status === 200 && (response.loggedUser !== 'undefined') ){
            navigate('/user/login');
        }
        console.log(`Password: ${newPassword}, confirmPassword: ${confirmPassword}`);
      }
    } catch (error) {
      setMessageStack(error.response.data.message);
    }
  }

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/reset/password?id=${searchParams.get('id')}`);
        if (response.status === 200 && (response.data.loggedUser !== 'undefined')) {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        setMessageStack(error.response.data.message);
      }
    }
    auth();
  })

  return (
    <div className="container-fluid m-0 pt-3 vh-100 d-flex justify-content-center align-items-center">
      <Form className="border bg-md-danger p-md-5 p-2 shadow" style={{ width: CurrentWidth > 768 ? "50%" : "100%" }} onSubmit={SubmitHandler} >
        <div className="text-center  mb-2">
          <span className="fs-2 fw-bold">Reset Password</span>
        </div>
        {messageStack &&
          <Alert className="w-100" variant="danger" onClose={() => setMessageStack(null)} dismissible>
            <p className="p-0 m-0">{messageStack}</p>
          </Alert>
        }

        <Form.Group className="mb-3" controlId="formBasicNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(event) => { setNewPassword(event.target.value) }} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} required />
        </Form.Group>

        <div className="text-center">
          <Button className="text-center" variant="danger" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  )
}

export default SetNewPassword