import { useEffect } from "react";
import Cookies from "js-cookie";

export const Logout = ({setAccessToken, accessToken})=>{
    // const handleLogOut= ()=>{
    //     localStorage.removeItem('access_token')
    //     setAccessToken('')
    //     console.log(localStorage.getItem('access_token'))
    // }
    useEffect(() => {
        localStorage.removeItem('access_token');
        Cookies.remove('access_token')
        Cookies.remove('userId')
        setAccessToken(null);
      }, [setAccessToken]);
    
      return (
        <div classnName = 'logout'>
            You have been logged out.
            <div><a href="/">Return to Login Page</a></div>
        </div>
      )
}