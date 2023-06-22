import {React,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'
import BaseUrl from '../helper/urlHelper'
const ContactComp = () => {
  const [CurrentWidth,setCurrentWidth] = useState(window.innerWidth);
  const resizeHandler = ()=>{
    setCurrentWidth(window.innerWidth);
  }
  window.addEventListener('resize',resizeHandler);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [messageStack, setMessageStack] = useState(null);

  const submitHandler = async(event)=>{
    event.preventDefault();
    // alert(`Name:${name.trim()},Email:${email},Message:${message}`);
    try{
      const response = await axios.post(`${BaseUrl}/query/api`,{name,email,query});
      if(response.status === 200){
        setMessageStack(response.data.message);
      }
    }catch(error){
      setMessageStack(error.response.data.message);
    }
  }



  return (
    <div className="container-fluid m-0 py-3 d-flex justify-content-center align-items-center" style={{backgroundColor:"#bbe4e9",minHeight:"100vh"}}>
      <Form className="border border-0 bg-light p-md-5 p-4 rounded" onSubmit={submitHandler} style={{width:CurrentWidth > 768?"50%":"100%"}}>
        <div className="text-center">
          <span className="fs-2 fw-bold">Contact Us</span>
        </div>
        {messageStack &&
          <Alert className="w-100" variant="warning" onClose={() => setMessageStack(null)} dismissible>
            <p className="p-0 m-0">{messageStack}</p>
          </Alert>
        }
        <Form.Group className="mb-3" controlId="formBasicText" >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" value = {name} onChange = {(event)=>{setName(event.target.value)}} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value = {email} onChange = {(event)=>{setEmail(event.target.value)}} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Enter your message</Form.Label>
          <Form.Control as="textarea" rows={4} placeholder="Type here..." value = {query} onChange = {(event)=>{setQuery(event.target.value)}} />
        </Form.Group>
        <div className="text-center">
          <Button className="text-center" variant="primary" type="submit">Submit</Button>
        </div>
      </Form>
    </div>
  )
}

export default ContactComp