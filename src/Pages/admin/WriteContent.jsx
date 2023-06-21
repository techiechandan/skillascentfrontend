import { React, useState, useEffect, useCallback, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, useParams, Link } from 'react-router-dom'
import BaseUrl from '../../helper/urlHelper'

// icons
import { FaAlignJustify } from 'react-icons/fa'
// components
import Sidebar from '../../Components/admin/Sidebar'

import axios from 'axios';
// text editor
import JoditEditor from 'jodit-react';
// purifying the html for security purpose
// import DOMPurify from 'dompurify';


const WriteContent = () => {
    const navigate = useNavigate();
    const [openState, setOpenState] = useState(true);
    const [messageStack,setMessageStack] = useState("");
    const [isMessage,setIsMessage] = useState(false);    
    const params = useParams();
    const [topic,setTopic] = useState("");
    const [contents, setContents] = useState('');
    const editor = useRef(null);


    const getContentWrite = useCallback(async () => {
        try {
            await axios.get(`${BaseUrl}/admin/add-content/${params.courseName}`);
        } catch (error) {
            console.log(error);
            if(error.response.status === 404){
                alert(error.response.data.message);
                navigate('/admin/dashboard');
            }else{
                navigate('/admin');
            }
        }
    }, [navigate, params.courseName]);

    const clearFromData = ()=>{
        setTopic("");
        setContents("");
    }

    const SubmitHandler = async(event)=>{
        try {
            event.preventDefault();
            const response = await axios.post(`${BaseUrl}/admin/add-content/${params.courseName}`,{topic,contents});
            if(response.status === 200){
                setMessageStack(response.data.message);
                setIsMessage(true);
                clearFromData();
            }
        } catch (error) {
            if(error.response.status === 404){
                setMessageStack(error.response.data.message);
                setIsMessage(true);
            }else{
                navigate('/admin');
            }
        }
    }


    useEffect(() => {
        getContentWrite();
    }, [getContentWrite])


    return (
        <div className="d-flex p-0" style={{minHeight:"100vh"}}>
            <Sidebar openState={openState} setOpenState={setOpenState} />
            <div className=" m-0 px-0 " style={{ backgroundColor: '#ececec',width:"100%"}}>
                <div className="container-fluid d-flex pt-2 align-items-center sticky-top bg-light">
                    <Button className="p-3 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={() => { setOpenState(!openState) }}>
                        <FaAlignJustify />
                    </Button>
                    <h5>Add-Content!</h5>
                </div>
                <div className="container-fluid m-0 p-0 my-3 px-md-5 px-2">
                    <Form className="border border-1 p-md-4 p-2 bg-light" onSubmit={SubmitHandler}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="fw-bold">Title / Topic</Form.Label>
                            <Form.Control type="text" placeholder="Enter title / topic here..." value={topic} onChange={(event)=>{setTopic(event.target.value)}} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="fw-bold">Content</Form.Label>
                            <JoditEditor
                                ref={editor}
                                value={contents}
                                onChange={(newContent) => setContents(newContent)}
                            />
                        </Form.Group>
                        <div className="container d-flex justify-content-center">
                            <Button type="submit" variant="primary" className="mx-2">Add Content</Button>
                            <Button as ={Link} to={`/admin/view-contents/${params.courseName}`} variant="success" className="mx-2">View Contents</Button>
                            <Button as ={Link} to="/admin/course-list" variant="danger" className="mx-2">Cancel</Button>
                        </div>
                        {
                            isMessage && 
                            <Alert variant="danger" className="my-2"  onClose={() => setIsMessage(false)} dismissible>
                                    <p className="m-0 p-0">{messageStack}</p>
                            </Alert>
                        }
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default WriteContent