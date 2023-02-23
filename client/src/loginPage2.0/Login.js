import {useState} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs'
import {Link} from 'react-router-dom'
import { Logout } from './Logout';
// import https from 'https';

export const Login = ({setAccessToken, accessToken})=>{
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState ('')
    const handleLogin = async (e) =>{
        e.preventDefault();
        // const hashedPassword = await bcrypt.hash(password, 10)
        localStorage.removeItem('access_token')
        setAccessToken(null)
        console.log(localStorage.getItem('access_token'))
        console.log('pre')
        console.log(accessToken)
        
        try{
            const response = await axios.post('api/login', {username, password}
            ). then ((response)=>{
                // console.log(response.data)
                localStorage.setItem('access_token',response.data.access_token)
                setAccessToken(response.data.access_token)
                console.log(localStorage.getItem('access_token'))
                // console.log('post')
                
                
                
            })

        } catch (err){
            setError(err.response.data.message)
        }
    }

    return(
        <div>
            <h1>Login Page</h1>
            {error && <div>{error}</div>}
            <form onSubmit={handleLogin}>
                <label>Username:
                    <input type = "text" value={username} onChange={(e)=>{setUserName(e.target.value)}}/>
                </label>
                <br/>
                <label>Password:
                    <input type="text" value = {password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </label>   
                <br/>
                <button type = "submit">Login</button>
            </form>
            <Link to = '/signup'>Don't have an account yet? Sign up here</Link>
            
        </div>
    )
}