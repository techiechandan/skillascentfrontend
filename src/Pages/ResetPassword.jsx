import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'


const ResetPassword = () => {
  const [CurrentWidth, setCurrentWidth] = useState(window.innerWidth);
  const resizeHandler = () => {
    setCurrentWidth(window.innerWidth);
  }
  window.addEventListener('resize', resizeHandler);


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [messageStack, setMessageStack] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [variantType,setVariantType] = useState("warning");
  const SubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoaded(false);
    try {
      const response = await axios.post(`${BaseUrl}/user/reset-password/api`, { email });
      setVariantType("success");
      setMessageStack(response.data.message);
      setIsLoaded(true);
    } catch (error) {
      setMessageStack(error.response.data.message);
      setIsLoaded(true);
    }
  }


  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/user/reset-password/api`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          navigate('/');
          setIsLoaded(true);
        }
        setMessageStack(response.data.message);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
        setMessageStack(error.response.data.message);
        setIsLoaded(true);
      }
    }
    auth();
    window.scrollTo(0,0);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container-fluid m-0 pt-3 vh-100 d-flex justify-content-center align-items-center">
      {!isLoaded ?
        <Spinner animation="border" variant="primary" />
        :
        <Form className="border bg-md-danger p-md-5 p-2 rounded shadow" style={{ width: CurrentWidth > 768 ? "50%" : "100%" }} onSubmit={SubmitHandler}>
          <div className="text-center">
            <span className="fs-2 fw-bold">Reset Password</span>
          </div>
          {messageStack &&
            <Alert className="w-100" variant={variantType} onClose={() => setMessageStack(null)} dismissible>
              <p className="p-0 m-0">{messageStack}</p>
            </Alert>
          }
          <Form.Group className="mb-3 mt-2" controlId="formBasicPassword">
            <Form.Label>Enter Registered Eamil</Form.Label>
            <Form.Control type="text" placeholder="username@email.com" value={email} onChange={(event) => { setEmail(event.target.value) }} />
          </Form.Group>

          <div className="text-center">
            <Button className="text-center" variant="danger" type="submit">Submit</Button>
          </div>
        </Form>
      }

    </div>
  )
}

export default ResetPassword