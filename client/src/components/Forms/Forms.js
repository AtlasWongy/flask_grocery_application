import React from 'react';
import './Forms.css'

export default function LoginForm() {
    return (
        <form className='login-form'>
            <label className='label-container'>
                <span class = 'username'>Username</span>: 
                <input class = 'username-input'/>
            </label>
            <label className='label-container'>
                <span class = 'password'>Password</span>:
                <input class = 'password-input'/>
            </label>
            <button type = 'submit'>Login</button>
        </form>
    )
}