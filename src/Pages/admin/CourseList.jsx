import { React, useState, useEffect, useCallback } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
// icons
import { FaAlignJustify } from 'react-icons/fa'
// components
import Sidebar from '../../Components/admin/Sidebar'
import BaseUrl from '../../helper/urlHelper'

const options = [
    { value: true, label: 'Public' },
    { value: false, label: 'Private' },
];


const CourseList = () => {
    const navigate = useNavigate();
    const [openState, setOpenState] = useState(true);
    const [modalStatus, setModalStatus] = useState(false);
    const [courses, setCourses] = useState([]);
    const [changeView, setChangeView] = useState(true);
    const [IsMessage, setIsMessage] = useState(false);
    const [messageStack, setMessageStack] = useState(false);
    // geting value of new course to add in db
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedOption, setSelectedOption] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [courseId, setCourseId] = useState(null);

    // convert image to base64
    const ConvertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        });
    }

    // file upload
    const handleFileUpload = async (event) => {
        event.preventDefault();
        if(event.target.files[0]){
            const Base64Image = await ConvertToBase64(event.target.files[0]);
            setThumbnail(Base64Image);
        }
    }

    // add course method
    const handelSubmit = async (event) => {
        try {
            event.preventDefault();
            const response = await axios.post(`${BaseUrl}/admin/add-course/api`, { title: title, description: description, thumbnail: thumbnail,islive:selectedOption.value});
            if (response.status === 200) {
                setMessageStack(response.data.message);
                setIsMessage(true);
                courseList();
            }
        } catch (error) {
            setMessageStack(error.response.data.message);
            setIsMessage(true);
        }
    }

    const courseList = useCallback(async () => {
        try {
            const response = await axios.get(`${BaseUrl}/admin/courese-list/api`);
            setCourses([...response.data.courseList]);
        } catch (error) {
            console.log(error);
            navigate('/admin');
        }
    }, [navigate])


    const deleteCourse = async (courseId) => {
        try {
            const response = await axios.delete(`${BaseUrl}/admin/delete/course/${courseId}`);
            if (response.status === 200) {
                courseList();
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    // Edit and Update Course Details
    const editCourse = async (CourseId) => {
        setModalStatus(true);
        setEditMode(true);
        setIsDataLoaded(false);
        try {
            setCourseId(CourseId);
            const response = await axios.get(`${BaseUrl}/admin/update/course-details/${CourseId}`);
            if (response.status === 200 && (response.data.courseDetails !== undefined)) {
                setThumbnail(response.data.courseDetails.thumbnail)
                setTitle(response.data.courseDetails.title);
                setDescription(response.data.courseDetails.description);
                setSelectedOption(options.find(item => item.value === response.data.courseDetails.islive));
                setIsDataLoaded(true); // to close the spinner
            }
        } catch (error) {
            console.log(error);
            setMessageStack(error.response.data.message);
            setIsMessage(true);
        }
    }

    const clearData = () => {
        setEditMode(false);
        setThumbnail(null)
        setTitle("");
        setDescription("");
        setSelectedOption(null);
        setMessageStack("");
        setIsMessage(null);
    }

    const updateCourseDetails = async () => {
        try {
            const data = { thumbnail: thumbnail, title: title, description: description, islive: selectedOption.value }
            const response = await axios.post(`${BaseUrl}/admin/update/course-details/${courseId}`, data);
            if (response.status === 200) {
                setMessageStack(response.data.message);
                setIsMessage(true);
            }
        } catch (error) {
            console.log(error);
            setMessageStack(error.response.data.message);
            setIsMessage(true);
        }
    }

    useEffect(() => {
        courseList();
    }, [navigate, courseList]);

    return (
        <div className="d-flex p-0">
            <Sidebar openState={openState} setOpenState={setOpenState} />
            <div className="container-fluid m-0 px-0 " style={{ backgroundColor: '#ececec' }}>
                <div className="container-fluid d-flex pt-2  align-items-center">
                    <Button className="p-2 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={() => { setOpenState(!openState) }}>
                        <FaAlignJustify />
                    </Button>
                    <h5>Course List</h5>
                </div>
                <div className="container-fluid p-md-4 pt-2">
                    <div className="d-flex justify-content-between mb-2">
                        <Button onClick={() => setModalStatus(true)} variant="success">Add Course</Button>
                        <Button onClick={() => setChangeView(!changeView)} variant="danger">Change View</Button>
                    </div>

                    {changeView ?
                        <Table responsive striped bordered hover variant="success">
                            <thead>
                                <tr>
                                    {/* <th className="text-center">Mark</th> */}
                                    <th className="text-center">SN</th>
                                    <th className="text-center">ID</th>
                                    <th className="text-center">Title</th>
                                    <th className="text-center">Status</th>
                                    <th className="text-center">Description</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.length > 0 &&
                                    courses.map((item, index) => (
                                        <tr key={index}>
                                            {/* <td className="text-center"><Form.Check /></td> */}
                                            <td className="text-center">{index + 1}</td>
                                            <td className="text-center">{item._id}</td>
                                            <td className="text-center">{item.title}</td>
                                            <td className="text-center">{item.islive?"Public":"Private"}</td>
                                            <td className="text-center">{item.description}</td>
                                            <td className="text-center">
                                                <Button variant="success me-md-2 mb-md-0 mb-1" onClick={() => { editCourse(item._id) }} >Edit</Button>
                                                <Button variant="danger" onClick={() => { deleteCourse(item._id) }} >Delete</Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        :
                        <div className="container-fluid m-0 p-0">
                            <div className="container-fluid row justify-content-start align-items-center pb-4 m-0">
                                {
                                    courses.length > 0 &&
                                    courses.map((item, index) => (
                                        <div className="col-md-3 col-12 pb-md-0 pb-2 mb-md-2" key={index}>
                                            <Card >
                                                <Card.Img variant="top" src={item.thumbnail} style={{ height: "10rem" }} />
                                                <Card.Body className="">
                                                    <Card.Title>{item.title}</Card.Title>
                                                    <Card.Text style={{ height: "3rem" }}>{item.description}</Card.Text>
                                                    <div className="text-center">
                                                        <Button as={Link} to={"/admin/add-content/" + item.title} variant="primary">Add Content</Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    }

                    {/* Modal / Add-Course-Form */}
                    <Modal show={modalStatus} onHide={() => setModalStatus(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                {editMode ? "Update Course Details" : "Add New Courese"}
                            </Modal.Title>
                        </Modal.Header>

                        {!isDataLoaded && editMode  ?
                            <>
                                <Spinner animation="border" variant="primary" />
                                <p className="">Please wait...</p>
                            </>
                            :
                            <Modal.Body>
                                {thumbnail &&
                                    <div className="d-flex justify-content-center align-items-center">
                                        <Image className="" src={thumbnail} rounded style={{ heigth: "10rem", width: "10rem" }} />
                                    </div>
                                }
                                {IsMessage &&
                                    <Alert className="my-2" variant="warning" onClose={() => setIsMessage(false)} dismissible>
                                        <p className="m-0 p-0">{messageStack}</p>
                                    </Alert>
                                }
                                <Form>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Label>Choose Thumbnail</Form.Label>
                                        <Form.Control type="file" accept="image/*" onChange={(event) => handleFileUpload(event)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Course Title</Form.Label>
                                        <Form.Control type="text" placeholder="Course1" value={title} onChange={(event) => { setTitle(event.target.value) }} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Course Description</Form.Label>
                                        <Form.Control as="textarea" placeholder="About Course..." rows={3} value={description} onChange={(event) => setDescription(event.target.value)} />
                                    </Form.Group>
                                    <Select
                                        placeholder="Select Course Display Status"
                                        defaultValue={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                    />
                                </Form>
                            </Modal.Body>
                        }

                        <Modal.Footer>
                            {editMode ?
                                <Button disabled={description.length > 150} onClick={updateCourseDetails}>Update Deatails</Button>
                                :
                                <Button type="submit" disabled={description.length > 150} variant="success" onClick={(event) => { handelSubmit(event) }}>Add</Button>
                            }
                            <Button variant="danger" onClick={() => { setModalStatus(false);clearData() }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default CourseList