import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from '../../api/posts'
import './style.css'

export const Protected = ({accessToken, primaryKey}) =>{
    const [message, setMessage] = useState('');

    useEffect (()=>{
        const fetchData = async ()=>{
            try{
                const response = await api.get('/api/protected',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                setMessage(response.data.message)
            } catch(e){
                console.error(e)
                console.log(e)
            }
        }
        fetchData()
    },[accessToken])

    return (
        <div>
            <Navigate replace to="/dashboard" state={message}/>
        </div>
    )
    
};