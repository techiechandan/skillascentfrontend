import { React, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom'
// icons
import { FaAlignJustify } from 'react-icons/fa'
// components
import Sidebar from '../../Components/admin/Sidebar'
import BaseUrl from '../../helper/urlHelper'
import axios from 'axios';



const Query = () => {
    const navigate = useNavigate();
    const [openState, setOpenState] = useState(true);
    const [queries, setQueries] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [replies, setReplies] = useState([]);
    const [tempQuery, setTempQuery] = useState(null);
    const [id, setId] = useState(null);
    const [recipientEmail, setRecipientEmail] = useState(undefined);
    const [recipientName, setRecipientName] = useState(undefined);
    const [messageToSend, setMessageToSend] = useState("");
    const [messageStack, setMessageStack] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const setDetails = (id, email, name) => {
        setId(id);
        setRecipientEmail(email);
        setRecipientName(name);
    }

    const sendReply = async () => {
        try {
            setIsLoaded(true);
            const response = await axios.post(`${BaseUrl}/admin/query/reply/api`, { id: id, to: recipientEmail, message: messageToSend, name: recipientName });
            if (response.status === 200) {
                setMessageStack(response.data.message);
                setIsLoaded(false);
            }
        } catch (error) {
            setMessageStack(error.response.data.message);
            setIsLoaded(false);
        }
    }

    const getReplies = async (id, email, name, query) => {
        setDetails(id, email, name);
        setTempQuery(query);
        setIsLoaded(true);
        try {
            const response = await axios.get(`${BaseUrl}/admin/get/replies/${id}`);
            if (response.status === 200 && (response.data.repliesList !== 'undedfined')) {
                setReplies(response.data.repliesList);
                setIsLoaded(false);
            }
        } catch (error) {
            setIsLoaded(false);
        }
    }

    const deleteQuery = async(queryId)=>{
        try{
            const response = await axios.delete(`${BaseUrl}/admin/query/delete/${queryId}`);
            if(response.status === 200){
                alert(response.data.message);
                setQueries([...response.data.newQueryList]);
            }
        }catch(error){
            alert(error.response.data.message);
        }
    }



    useEffect(() => {
        const getQueries = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/admin/queries/api`);
                if (response.status === 200 && (response.data.queries !== "undefined")) {
                    setQueries([...response.data.queries]);
                } else {
                    setQueries(null);
                }
            } catch (error) {
                setQueries(null);
                if (error.response.status === 401) {
                    navigate('/admin');
                }
            }
        }
        getQueries();
    }, [navigate]);


    return (
        <>
            <div className="d-flex p-0">
                <Sidebar openState={openState} setOpenState={setOpenState} />
                <div className="container-fluid m-0 px-0 " style={{ backgroundColor: '#ececec' }}>
                    <div className="container-fluid d-flex py-2 align-items-center">
                        <Button className="p-2 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={() => { setOpenState(!openState) }}>
                            <FaAlignJustify />
                        </Button>
                        <h5 className="me-auto">Dashboard!</h5>
                        {/* <div className=""></div> */}
                    </div>
                    {/* main-container */}
                    <div className=" p-4 pt-0">
                        <div className="row justify-content-center align-items-center">
                            {queries &&
                                queries.map((item, index) => {
                                    return (
                                        <div className="col-md-10 col-12 bg-danger shadow px-0 pt-2 my-2 rounded" key={index}>
                                            <div className="bg-light p-4 m-0">
                                                <div className="">
                                                    <span className="fw-bold me-2">Name:</span>
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className="">
                                                    <span className="fw-bold me-2">Email:</span>
                                                    <span>{item.email}</span>
                                                </div>
                                                <div className="">
                                                    <div className="fw-bold">Message:</div>
                                                    <div>{item.query}</div>
                                                </div>
                                                <div className="text-center">
                                                    <Button variant="success" className="my-2 me-md-2 mx-1" onClick={() => { setModalShow(true); setDetails(item._id, item.email, item.name) }}>Reply</Button>
                                                    <Button variant="primary" className="me-md-2 mx-1" onClick={() => { setShowReplies(true); getReplies(item._id, item.email, item.name, item.query) }} >View</Button>
                                                    <Button variant="danger" className="me-md-2 mx-1" onClick = {()=>{deleteQuery(item._id)}}>Delete</Button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* Modal */}
                        <Modal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Send Reply
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label className="fw-bold">Reply To</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={recipientEmail} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className="fw-bold">Message</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Type here..." value={messageToSend} onChange={(event) => { setMessageToSend(event.target.value) }} />
                                    </Form.Group>
                                </Form>

                                {isLoaded ?
                                    <div className="container-fluid text-center p-0 m-0">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                    :
                                    messageStack &&
                                    <Alert className="w-100" variant="warning" onClose={() => setMessageStack(null)} dismissible>
                                        <p className="p-0 m-0">{messageStack}</p>
                                    </Alert>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => { sendReply() }}>Send Reply</Button>
                                <Button variant="danger" onClick={() => setModalShow(false)}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Replies Modal */}
                        <Modal
                            show={showReplies}
                            onHide={() => setShowReplies(false)}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Query Reply
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {isLoaded ?
                                    <div className="container-fluid text-center p-0 m-0">
                                        <Spinner animation="border" variant="primary" />
                                    </div>
                                    :
                                    replies.length > 0 ?
                                        <div className="container d-flex flex-column">
                                            <div className="rounded ps-2 bg-danger shadow p-0 m-0 mb-2">
                                                <div className="bg-light p-md-4 p-2 m-0">
                                                    <span>Query By: </span>
                                                    <span>{recipientName}</span>
                                                    <div className="my-1">
                                                        {tempQuery}
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                replies.map((item,index)=>(
                                                    <div className="shadow rounded bg-primary ps-2 p-0 m-0 mb-2" key={index}>
                                                        <div className="bg-light p-md-4 p-2">
                                                            <span>Replied By: </span>
                                                            <span>{item.senderName}</span>
                                                            <div className="my-1">
                                                                {item.reply}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        :
                                        <div className="">
                                            Not replied!
                                        </div>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => setShowReplies(false)}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Query