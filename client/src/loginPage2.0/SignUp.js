import { useState } from "react";
import axios from "axios";
import {useNavigate, Link} from 'react-router-dom'
export const SignUpPage =()=>{
    const [username, setUserName] = useState('')
    const [password, setPassWord] = useState('')
    const [errmsg, setErrMsg] =useState('') 
    const [success, setSuccess] =useState(false)
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

    const navigate = useNavigate();

    const handleSignUp = async (e)=>{
         e.preventDefault()
         try{
            const reponse = await axios.post('api/register',{username,password})
            .then((response)=>{
                console.log(response)
                setUserName('')
                setPassWord('')
            if(response.data.message ==="user added"){
                setSuccess(false)
                navigate('/')
            }else setErrMsg(response.data.message)
            })
         }catch(e){
            console.log(e)
            
         }
    }

    return(
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Username:
                    <input text='text' required value = {username} onChange={(e)=>{setUserName(e.target.value)}}/>
                </label>
                <br/>
                <label>
                    Password:
                    <input text='text' required value = {password} onChange={(e)=>{setPassWord(e.target.value)}}/>
                </label>
                <br/>
                <button type='submit'>Sign Up</button>
            </form>
            <Link to ='/'>Back to Login Page</Link>
        </div>
    )
}