import { React, useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom'
// icons
import { FaAlignJustify } from 'react-icons/fa'
// components
import Sidebar from '../../Components/admin/Sidebar'
import BaseUrl from '../../helper/urlHelper'
import axios from 'axios';
// text editor
import JoditEditor from 'jodit-react';

const Setting = () => {
    const navigate = useNavigate();
    const [openState, setOpenState] = useState(true);
    const [isDisclamer, setIsDisclamer] = useState(false);
    const [isPrivacy, setIsPrivacy] = useState(false);
    const [content, setContent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const editor = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);


    const getPrivaryPolicy = async () => {
        setIsPrivacy(true);
        try {
            setShowModal(true);
            // get data form db
            const response = await axios.get(`${BaseUrl}/admin/privacy-policy/api`);
            if (response.status === 200 && response.data.privacyData !== 'undefined') {
                setContent(response.data.privacyData);
            }
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    const getDisclamer = async () => {
        setIsDisclamer(true);
        try {
            setShowModal(true);
            // get data form db
            const response = await axios.get(`${BaseUrl}/admin/disclamer/api`);
            if (response.status === 200 && response.data.disclamerData !== 'undefined') {
                setContent(response.data.disclamerData);
            }
            setIsLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }


    const closeModal = () => {
        setShowModal(false);
        if (isDisclamer) {
            setIsDisclamer(false);
        } else {
            setIsPrivacy(false);
        }
        setIsLoaded(false);
    }

    const setDisclamer = async () => {
        try {
            const response = await axios.post(`${BaseUrl}/admin/update/disclamer/api`, { content: content });
            if (response.status === 200) {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const setPrivacyPolicy = async () => {
        try {
            const response = await axios.post(`${BaseUrl}/admin/update/policy/api`, { content: content });
            if (response.status === 200) {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }



    useEffect(() => {
        const GetDashboard = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/admin/site-settings/api`);
                if (!response && response.status !== 200) {
                    navigate('/admin');
                }
            } catch (error) {
                navigate('/admin');
                console.log(error);
            }
        }
        GetDashboard();
        // eslint-disable-next-line
    }, []);




    return (
        <>
            <div className="d-flex p-0">
                <Sidebar openState={openState} setOpenState={setOpenState} />
                <div className="container-fluid m-0 px-0 " style={{ backgroundColor: '#ececec', width: "100%" }}>
                    <div className="container-fluid d-flex py-2 align-items-center sticky-top bg-light">
                        <Button className="p-2 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={() => { setOpenState(!openState) }}>
                            <FaAlignJustify />
                        </Button>
                        <h5 className="me-auto">Setting Page!</h5>
                    </div>
                    <div className=" p-4 py-3">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-10 col-12 mb-2 bg-danger ps-2 p-0 shadow rounded">
                                <div className="m-0 bg-light p-2 d-flex rounded align-items-center">
                                    <span className=" fs-4 me-auto ">Disclamer</span>
                                    <Button variant="primary" onClick={() => { getDisclamer() }}>Edit</Button>
                                </div>
                            </div>
                            <div className="col-md-10 col-12 mb-2 bg-danger ps-2 p-0 shadow rounded">
                                <div className="m-0 bg-light p-2 d-flex rounded align-items-center">
                                    <span className=" fs-4 me-auto ">Privacy & Policy</span>
                                    <Button variant="primary" onClick={() => { getPrivaryPolicy() }}>Edit</Button>
                                </div>
                            </div>
                        </div>
                        {/* Modal */}
                        <Modal
                            show={showModal}
                            onHide={() => { closeModal(); }}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    {isDisclamer && "Disclamer"}
                                    {isPrivacy && "Privacy & Policy"}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {isLoaded ?
                                    <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                            <Form.Label>Enter Details</Form.Label>
                                            <JoditEditor
                                                ref={editor}
                                                value={content}
                                                onChange={(newContent) => setContent(newContent)}
                                            />
                                        </Form.Group>
                                    </Form>
                                :
                                    <div className="d-flex flex-column pt-5 justify-content-center align-items-center">
                                        <Spinner animation="border" variant="primary" />
                                        <p className="fw-bold fs-5">Please wait...</p>
                                    </div>
                                }
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => { closeModal() }}>Close</Button>
                                {isDisclamer &&
                                    <Button onClick={() => { setDisclamer() }}>Update Disclamer</Button>
                                }
                                {isPrivacy &&
                                    <Button onClick={() => { setPrivacyPolicy() }}>Update Policy</Button>
                                }
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting