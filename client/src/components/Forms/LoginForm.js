import React, { useRef, useEffect, useState, useContext } from 'react';

import AuthContext from '../../context/AuthProvider';
import './LoginForm.css'
import axios from 'axios';

export default function LoginForm() {
    const {setAuth} = useContext(AuthContext)
    // Set focus on first input when the page load
    const userRef = useRef()
    // Set focus when error loads
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')

    
    useEffect(() => {
        userRef.current.focus()
    }, [])
    // error disappear when the user or pw changes
    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post ('/api/auth', 
                JSON.stringify({user, pass}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials:true
                }
                );
                console.log(JSON.stringify(response?.data))
                setAuth({user,pass})
                setUser('')
                setPass('')
                setSuccess(true)
        } catch (err){
            if(!err?.response){
                setErrMsg ('No Server Response')
                console.log (errMsg)
            } else if (err.response?.status === 400){
                setErrMsg('Missing Username or Password')
                console.log (errMsg)
            } else if (err.response?.status===401){
                setErrMsg('Unauthorized')
                console.log (errMsg)
            } else {
                setErrMsg('Login Failed')
                console.log (errMsg)
            }
            errRef.current.focus();
        }
       
    }

    return (
        <section>
            <p ref={errRef} className = {errMsg ? "errmsg": "offscreen"} 
            aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                    <input
                        type="text"
                        id = "username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                <label htmlFor='password'>Password:</label>
                    <input
                        type="password"
                        id = "password"
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        required
                    />
                    <button>Login</button>
            </form>
        </section>  
    )
}