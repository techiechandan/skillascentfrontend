import { React, useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner';
import BaseUrl from '../helper/urlHelper'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Courses = () => {
    const [courseList, setCourseList] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/courses/api`);
                if (response.status === 200) {
                    setCourseList([...response.data.courseList]);
                    setIsLoaded(true);
                } else {
                    console.log(response);
                    setCourseList([]);
                }
            } catch (error) {
                setCourseList([]);
                console.log(error);
            }
        }
        getCourses();
    }, [setCourseList])

    return (
        <>
            {
                isLoaded ?
                    courseList.length > 0 &&
                    courseList.map((item, index) => (
                        <div className="col-md-3 col-12 pb-md-0 pb-2 mb-md-2" key={index}>
                            <Card style={{ width: "auto" }}>
                                <Card.Img variant="top" src={item.thumbnail} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text className=" text-truncate">{item.description}</Card.Text>
                                    <div className="text-center mt-auto">
                                        <Button as={Link} to={`/learn/${item.title}/`} variant="primary">Start Learning</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                    :
                    <div className="d-flex flex-column pt-5 justify-content-center align-items-center">
                        <Spinner animation="border" variant="primary" />
                        <p className="fw-bold fs-5">Please wait...</p>
                    </div>
            }
        </>
    )
}

export default Courses