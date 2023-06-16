import {React, useState, useEffect} from 'react'
import axios from 'axios';
import BaseUrl from '../helper/urlHelper'


const Privacy_Policy = ({changeLoggedStatue, changeLoggedUser}) => {
  const [privacyPolicy, setprivacyPolicy] = useState(null);

    useEffect(()=>{
        const getPrivacyPolicy = async()=>{
            try{
                const response = await axios.get(`${BaseUrl}/privacy-policy/api`);
                if(response.status === 200 && response.data.LoggedUser !== "undefined"){
                    changeLoggedUser(response.data.LoggedUser);
                    changeLoggedStatue(true);
                }else{
                    changeLoggedStatue(false);
                }

                if(response.status === 200 && response.data.PrivacyPolicy){
                    setprivacyPolicy(response.data.PrivacyPolicy);
                }
            }catch(error){
                alert(error.response.data.message);
            }
        }
        getPrivacyPolicy();
    },[changeLoggedUser,changeLoggedStatue]);

  return (
    <div className="container-fluid util pt-md-2 m-0 p-0 mt-md-3" style={{minHeight:"100vh"}}>
        <h4>Disclamer!</h4>
        <div className=" container p-0 shadow bg-danger my-5 pt-2 rounded">
            <div className="container bg-light rounded p-4" dangerouslySetInnerHTML={{__html:privacyPolicy}}>

            </div>
        </div>
    </div>
  )
}

export default Privacy_Policy