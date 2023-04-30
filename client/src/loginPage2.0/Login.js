import {useState ,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie';

export const Login = ({setAccessToken, accessToken, cookzLifeSpan})=>{
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState (false)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setError(false)
            setErrorMsg('')
        }, 4000)
        return () => {
          clearTimeout(timeoutId)
        }
    }, [error])

    const d= new Date();
    d.setTime(d.getTime() + (10*6*10000));

    const handleLogin = async (e) =>{
        e.preventDefault();
        // const hashedPassword = await bcrypt.hash(password, 10)        
        try{
            const response = await axios.post('api/login', {username, password}
            ). then ((response)=>{
                // console.log(response.data)
                if (response.status == '200'){
                    console.log(200)
                    Cookies.set('userId',response.data.primaryKey)
                    console.log(`Primary Key:${response.data.primaryKey}`)
                    localStorage.setItem('access_token',response.data.access_token)
                    Cookies.set('access_token', response.data.access_token, { expires: d });
                    console.log(`cookies:${Cookies.get('access_token')}`)
                    setAccessToken(Cookies.get('access_token'))
                    console.log(`accessToken: ${accessToken}`)
                } 
            })

        } catch (err){
            if (err.response.status=== 401){
                // setError(err.response.data.message)
                setError(true)
                setErrorMsg('Wrong username and password entered. Please try again')
            }
        }
    }

    return(
        <div>
            <h1>Login Page</h1>
            {error && <div>{error}</div>}
            <form onSubmit={handleLogin}>
                <label>Username:
                    <input type = "text" required value={username} onChange={(e)=>{setUserName(e.target.value) }}/>
                </label>
                <br/>
                <label>Password:
                    <input type="password"  required value = {password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </label>   
                <br/>
                <button type = "submit">Login</button>            
                {error&&<p>{errorMsg}</p>}
            </form>

            <Link to = '/signup'>Don't have an account yet? Sign up here</Link>
        </div>
    )
}