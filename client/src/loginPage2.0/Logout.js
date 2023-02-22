import { useEffect } from "react";

export const Logout = ({setAccessToken})=>{
    useEffect(()=>{
        localStorage.removeItem('access_token')
        setAccessToken(null)
    },{setAccessToken})
    
    return <div>You have been logged out</div>
}