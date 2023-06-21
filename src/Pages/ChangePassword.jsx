import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'
import { useNavigate } from 'react-router-dom'


const ChangePassword = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageStack, setMessageStack] = useState(null);

  const SubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/;
      if (!newPassword.match(passRegex)) {
        setMessageStack("Please enter valid password")
      } else if (newPassword !== confirmPassword) {
        setMessageStack("Password do not match");
      }else if(currentPassword === newPassword) {
        setMessageStack("new must be different from current password");
      } else {
        const response = await axios.post(`${BaseUrl}/user/change-password/api`, { currentPassword, newPassword });
        if (response.status === 200) {
          setMessageStack("Password Changed Successfuly!");
        }
      }
    } catch (error) {
      setMessageStack(error.response.data.message);
    }
  }



  useEffect(() => {
    const getChangePassword = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/change-password/api`);
        if (response.status === 200 && (response.loggeUser === "undefined")) {
          navigate('/user/login')
        }
      } catch (error) {
        console.log(error);
      }
    }
    getChangePassword();
    window.scrollTo(0,0);
    // eslint-disable-next-line
  }, []);



  return (
    <div className="container-fluid m-0 pt-3 vh-100 d-flex justify-content-center align-items-center">
      <Form className="border bg-md-danger p-md-5 p-2 shadow" onSubmit={SubmitHandler}>
        
        <div className="text-center  mb-2">
          <span className="fs-2 fw-bold">Change Password</span>
        </div>
        {messageStack &&
          <Alert className="w-100" variant="danger" onClose={() => setMessageStack(null)} dismissible>
            <p className="p-0 m-0">{messageStack}</p>
          </Alert>
        }
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Current Password</Form.Label>
          <Form.Control type="password" placeholder="Current Password" value={currentPassword} onChange={(event) => { setCurrentPassword(event.target.value) }} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(event) => { setNewPassword(event.target.value) }} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(event) => { setConfirmPassword(event.target.value) }} required/>
        </Form.Group>

        <div className="text-center">
          <Button className="text-center" variant="danger" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  )
}

export default ChangePassword