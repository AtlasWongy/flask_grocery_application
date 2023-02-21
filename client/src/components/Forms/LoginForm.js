import React, { useRef, useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';

const LOGIN_URL = '/api/auth'

// import './LoginForm.css'

export default function LoginForm() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pass])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({user, pass}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data))
            setAuth( { user, pass } )     
            setUser('')
            setPass('')
            setSuccess(true)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response')
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
        }
    }

    return (
        <section>
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