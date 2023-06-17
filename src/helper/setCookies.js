import Cookies from 'js-cookie';

const setCookies = (accessToken, refreshToken)=>{
    if(accessToken && accessToken !== 'undefined'){
        Cookies.set("satoken",accessToken);
    }else{
        Cookies.set("satoken",null);
    }

    if(refreshToken && refreshToken !== 'undefined'){
        Cookies.set('sareftoken',refreshToken);
    }else{
        Cookies.set('sareftoken',null);
    }
}


export default setCookies;