import { React, useState, useEffect, useCallback } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table';
import { useNavigate,Link,useParams } from 'react-router-dom'
// icons
import { FaAlignJustify } from 'react-icons/fa'
import BaseUrl from '../../helper/urlHelper'

// components
import Sidebar from '../../Components/admin/Sidebar'

import axios from 'axios';

const ViewContents = () => {
    const navigate = useNavigate();
    const [openState, setOpenState] = useState(true);
    const [contents, setContents] = useState([]);

    const params = useParams();

    const DeleteContent = async(slug)=>{
        try {
            const response = await axios.delete(`${BaseUrl}/admin/delete/content/${params.courseName}/${slug}`);
            if(response.status === 200) {
                getContents();
            }
        } catch (error) {
            console.log(error)
            if(error.response.status === 404) {
                alert(error.response.data.message);
            }else{
                navigate('/admin');
            }
        }
    }



    const getContents = useCallback(async() => {
        try {
            const response = await axios.get(`${BaseUrl}/admin/view-contents/${params.courseName}`);
            if (response.status === 200) {
                setContents(response.data.contentList);
            }
        } catch (error) {
            if(error.response.status === 404) {
                alert(error.response.data.message);
            }else{
                navigate('/admin');
            }
        }
    }, [navigate,params.courseName]);



    useEffect(() => {
        getContents();
    }, [getContents])


    return (
        <div className="d-flex p-0">
            <Sidebar openState={openState} setOpenState={setOpenState} />
            <div className="container-fluid m-0 px-0 " style={{ backgroundColor: '#ececec' }}>
                <div className="container-fluid d-flex py-2 align-items-center">
                    <Button className="p-2 pt-0 me-2 fs-4 bg-transparent text-danger border-0 " onClick={() => { setOpenState(!openState) }}>
                        <FaAlignJustify />
                    </Button>
                    <h5>View Contents</h5>
                </div>
                <div className="container-fluid p-4 pt-0">
                    <Table responsive striped bordered hover variant='success'>
                        <thead>
                            <tr>
                                <th className="text-center">SN</th>
                                <th className="text-center">Topic</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contents &&
                                contents.map((item, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{item.topic}</td>
                                        <td className="text-center">
                                            <Button as = {Link} variant="success" className ="me-md-2 mb-md-0 mb-1" to={`/admin/update-content/${params.courseName}/${item.slug}`} >Edit</Button>
                                            <Button variant="danger" onClick={()=>DeleteContent(item.slug)} >Delete</Button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default ViewContents