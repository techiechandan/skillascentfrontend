import axios from 'axios';
import BaseUrl from '../helper/urlHelper'
import { React, useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import AuthContext from '../context/AuthContex';
import Spinner from 'react-bootstrap/Spinner';


const Content = () => {
    const params = useParams();
    const [content, setContent] = useState(null);
    const context = useContext(AuthContext);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        const getConentData = async () => {
            setIsLoaded(false);
            try {
                const response = await axios.get(`${BaseUrl}/learn/${params.courseName}/${params.topicName}`);
                if (response && (response.data.loggedUser !== "undefined")) {
                    context.setLoggedStatus(true);
                    context.setLoggedUser(response.data.loggedUser);

                } else {
                    context.setLoggedStatus(false);
                }
                if (response.data.content.content === undefined) {
                    setContent(null);
                } else {
                    setContent(response.data.content.content);
                    setIsLoaded(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getConentData();
    }, [context, params.courseName, params.topicName]);



    return (
        <>
            {isLoaded ?
                <>
                    {
                        content &&
                        <div className="p-0 py-md-0 py-3 mx-3 m-0" style={{ minHeight: "100vh" }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}>
                        </div>
                    }
                </>
                :
                <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
                    <Spinner animation="border" variant="primary" />
                </div>
            }
        </>
    )
}

export default Content