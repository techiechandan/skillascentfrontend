import { React, useEffect, useContext } from 'react'
import axios from 'axios'
import ContactComp from '../Components/ContactComp';
import Baseurl from '../helper/urlHelper'
import AuthContext from '../context/AuthContex';
const Contact = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    const auth = async () => {
      try {
        const response = await axios.get(`${Baseurl}/contact/api`);
        if (response.status === 200 && (response.data.loggedUser !== "undefined")) {
          context.setLoggedStatus(true);
          context.setLoggedUser(response.data.loggedUser);
        }else{
          context.setLoggedStatus(false);
        }
      } catch (error) {
        if (error) {
          context.setLoggedStatus(false);
        }
      }
    }
    auth();
    window.scrollTo(0,0);
    // eslint-disable-next-line
  }, [])



  return (
    <div className="mt-5">
      <ContactComp />
    </div>
  )
}

export default Contact