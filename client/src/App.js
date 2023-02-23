import './App.css';
import { useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import { Login } from './loginPage2.0/Login';
import { Protected } from './component/Protected';
import { Logout } from './loginPage2.0/Logout';
import { SignUpPage } from './loginPage2.0/SignUp';
import { PromptTimeOut } from './component/promptTimeOut';
import Cookies from 'js-cookie';
import { EditGroceries } from './component/EditGroceries';



function App() {

  const [accessToken, setAccessToken] = useState(Cookies.get('access_token'));
  const [promptSession, setPromptSession] = useState(false)
  const [primaryKey, setPrimaryKey] = useState('')

  // Time for cookies check (1min before expiry)
  const time = (20 * 6 * 10000)
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
        // Cookies.remove('access_token')
        // console.log(accessToken)
        // console.log(Cookies.get('access_token'))
        setPromptSession(true)
      }, time)
      return () => {
        clearTimeout(timeoutId)
      }
   }else {return console.log(`accessToken= ${accessToken}`)}
  }, [accessToken, ])
  // promptSession


  return (
    
    <div>
{/* Current */}
    <Router>
      <Routes>
        <Route exact path = '/' element = {accessToken?<Link to = '/protected'/>:<Login setAccessToken={setAccessToken} accessToken={accessToken} setPrimaryKey={setPrimaryKey}/>}/>
        <Route path="/protected" element={accessToken?<Protected accessToken={accessToken} primaryKey={primaryKey}/> :<Link to="/"/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path ='/logout' element = {<Logout setAccessToken={setAccessToken}/>}/>
      </Routes>
    </Router>
    {accessToken?<Protected accessToken={accessToken}  primaryKey={primaryKey}/> : <></>}
    {promptSession&&<PromptTimeOut  setAccessToken={setAccessToken} setPromptSession={setPromptSession}/>}
    </div>
    );
}

export default App;
