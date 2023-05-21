import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material'
import './Login.css'
import api from '../../api/posts'
import Cookies from 'js-cookie';

export const Login = ({ setAccessToken, accessToken, cookzLifeSpan }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setError(false)
            setErrorMsg('')
        }, 4000)
        return () => {
            clearTimeout(timeoutID)
        }
    }, [error])

    const date = new Date()
    date.setTime(date.getTime() + (10*6*10000))

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('api/login', {username, password})
            console.log(`The status is ${response.status}`)
            if (response.status === 200) {

                Cookies.set('userId', response.data.primaryKey)
                console.log(`Primary Key: ${response.data.primaryKey}`)
                console.log(`Trying to retrieve the cookie ${Cookies.get('userId')}`)

                localStorage.setItem('access_token', response.data.accessToken)
                Cookies.set('access_token', response.data.access_token, { expires: date })
                console.log(`The access token: ${Cookies.get('access_token')}`)

                setAccessToken(Cookies.get('access_token'))
                console.log(`accessToken: ${accessToken}`)
            }
        } catch (err) {
            if (err.response.status === 401){
                setError(true)
                setErrorMsg('Wrong username and password entered. Please try again')
            }
        }
    }

    return (
        <div className='container'>
            <h1 className='title-page'>LOGIN PAGE</h1>
            {error && <div>{error}</div>}
            <form className='login-form' onSubmit={handleLogin}>
                <TextField
                    required
                    id='outlined-basic'
                    label='Username'
                    variant='outlined'
                    size='small'
                    margin='normal'
                    type='text'
                    value={username}
                    onChange={handleUsername}
                />
                <br/>
                <TextField
                    required
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    size='small'
                    margin='normal'
                    type='text'
                    value={password}
                    onChange={handlePassword}
                />
                <br/>
                <Button variant='contained' fullWidth={true} type='submit'> 
                    Login
                </Button>
            </form>
        </div>
    )
}