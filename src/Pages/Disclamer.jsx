import { React, useState, useEffect, useContext } from 'react'
import axios from 'axios';
import BaseUrl from '../helper/urlHelper'
import AuthContext from '../context/AuthContex';

const Disclamer = () => {
    const context = useContext(AuthContext);
    const [DisclamerData, setDisclamerData] = useState(null);
    useEffect(() => {
        const getDisclamerData = async () => {
            try {
                const response = await axios.get(`${BaseUrl}/disclamer/api`);
                if (response.status === 200 && response.data.LoggedUser !== "undefined") {
                    context.setLoggedUser(response.data.LoggedUser);
                    context.setLoggedStatus(true);
                } else {
                    context.setLoggedStatus(false);
                }
                if (response.status === 200 && response.data.disclamerData) {
                    setDisclamerData(response.data.disclamerData);
                }
            } catch (error) {
                alert(error.response.data.message);
            }
        }
        getDisclamerData();
        window.scrollTo(0, 0);
        // eslint-disable-next-line
    }, []);


    return (
        <div className="container-fluid util pt-md-2 m-0 p-0 mt-md-3" style={{ minHeight: "100vh" }}>
            <h4>Disclamer!</h4>
            <div className=" container p-0 shadow bg-danger my-5 pt-2 rounded">
                <div className="container bg-light rounded p-4" dangerouslySetInnerHTML={{ __html: DisclamerData }}>
                </div>
            </div>
        </div>
    )
}

export default Disclamer