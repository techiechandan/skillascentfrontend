import axios from 'axios';
import BaseUrl from '../helper/urlHelper'
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'

const Content = ({ changeLoggedStatue, changeLoggedUser }) => {
    const params = useParams();
    const [content, setContent] = useState(null);

    useEffect(() => {
        const getConentData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/learn/${params.courseName}/${params.topicName}`);
                if (response && (response.data.loggedUser)) {
                    changeLoggedStatue(true);
                    changeLoggedUser(response.data.loggedUser);
                } else {
                    changeLoggedStatue(false);
                }
                if (response.data.content.content === undefined) {
                    setContent(null);
                } else {
                    setContent(response.data.content.content);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getConentData();
    }, [changeLoggedStatue, changeLoggedUser, params.courseName, params.topicName]);



    return (
        <>
            {content &&
                <div className="p-0 py-md-0 py-3 m-0" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}>
                </div>
            }
        </>
    )
}

export default Content