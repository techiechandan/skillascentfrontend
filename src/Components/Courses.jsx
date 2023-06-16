import { React, useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import BaseUrl from '../helper/urlHelper'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Courses = () => {
    const [courseList, setCourseList] = useState([]);


    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/courses/api`);
                if (response.status === 200) {
                    setCourseList([...response.data.courseList]);
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
        {courseList.length > 0 &&
            courseList.map((item, index) => (
                <div className="col-md-3 col-12 pb-md-0 pb-2 mb-md-2" key={index}>
                    <Card style={{width:"auto"}}>
                        <Card.Img variant="top" src={item.thumbnail} style={{ height: "15rem" }} />
                        <Card.Body className="">
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text style={{ height: "3rem" }}>{item.description}</Card.Text>
                            <div className="text-center">
                                <Button as={Link} to={`/learn/${item.title}/`} variant="primary">Start Learning</Button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            ))
        }
        </>
    )
}

export default Courses