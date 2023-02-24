import './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import { Login } from './loginPage2.0/Login';
import { Protected } from './component/Protected';
import { Logout } from './loginPage2.0/Logout';
import { SignUpPage } from './loginPage2.0/SignUp';
import { PromptTimeOut } from './component/promptTimeOut';
import Cookies from 'js-cookie';

function App() {
  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));
  const [promptSession, setPromptSession] = useState(false)

  // Time for cookies check (1min before expiry)
    // For Cookie prompt
  const time = (5 * 6 * 10000)
    // For cookie life span
  const cookzLifeSpan = (9*6*10000)

  // On load set access token to '' and localstorage access token
  useEffect(()=>{
    if(Cookies.get('access_token')=== null && Cookies.get('access_token')=== '' && Cookies.get('access_token')===undefined){
      const onStart = ()=>{
        localStorage.removeItem('access_token');
        console.log(accessToken)
        console.log(Cookies.get('access_token'))
      }
      onStart()
    }
  },[])

    // Cookie prompt time out
  useEffect(() => {
    console.log('In AT Timer')
    console.log(Cookies.get('access_token'))
    console.log(accessToken)
    if(accessToken!== null && accessToken!== '' && accessToken!==undefined){
      const timeoutId = setTimeout(() => {
        setPromptSession(true)
      }, time)
      return () => {
        clearTimeout(timeoutId)
      }
   }else {return console.log(`accessToken= ${accessToken}`)}
  }, [accessToken, ])



  return (
    
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={accessToken ? <Navigate to="/protected" /> : <Login setAccessToken={setAccessToken} accessToken={accessToken} cookzLifeSpan={cookzLifeSpan} />} />
          <Route path="/protected" element={accessToken ? <Protected accessToken={accessToken} /> : <Navigate to="/" />} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path ='/logout' element = {<Logout setAccessToken={setAccessToken}/>}/>
        </Routes>
      </Router>
      {promptSession&&<PromptTimeOut  cookzLifeSpan= {cookzLifeSpan} setAccessToken={setAccessToken} setPromptSession={setPromptSession}/>}
    </div>
    );
}

export default App;
