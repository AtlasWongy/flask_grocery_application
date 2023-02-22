import { useEffect, useState } from "react";
import axios from "axios";

export const Protected = ({accessToken}) =>{
    const [message, setMessage] = useState('');

    useEffect (()=>{
        const fetchData = async ()=>{
            console.log('in protected')
            try{
                const response = await axios.get('/api/protected',{
                    headers:{
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                console.log('post response')
                setMessage(response.data.message)
                console.log('ITWORKSs')
                console.log(response.data.message)
            } catch(e){
                console.error(e)
                console.log(e)
            }
        }
        fetchData()
    },[accessToken])
    return (<div>{message}</div>)
};