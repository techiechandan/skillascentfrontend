import { React, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import ContactComp from '../Components/ContactComp';
import Baseurl from '../helper/urlHelper'

const Contact = ({ changeLoggedStatue, changeLoggedUser }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${Baseurl}/contact/api`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          changeLoggedStatue(true);
          changeLoggedUser(response.data.loggedUser);
        }else{
          changeLoggedStatue(false)
        }
      } catch (error) {
        if (error) {
          changeLoggedStatue(false);
        }
      }
    }
    auth();
  }, [navigate, changeLoggedStatue, changeLoggedUser])



  return (
    <div className="mt-5">
      <ContactComp />
    </div>
  )
}

export default Contact