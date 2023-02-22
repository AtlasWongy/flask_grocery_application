import './App.css';
import LoginForm from './components/Forms/LoginForm';
import Title from './components/Title/Title'

import { Header } from './component/Header';
import {Groceries} from './component/Groceries';
import { useState, useEffect } from 'react';
import axios from './api/posts'
import { AddGroceries } from './component/AddGroceries';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { Login } from './loginPage2.0/Login';
import { Protected } from './component/Protected';
import { Logout } from './loginPage2.0/Logout';
import { SignUpPage } from './loginPage2.0/SignUp';
function App() {
  const [groceries, setGroceries] = useState([''])
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

  useEffect(()=>{
    fetchGroceries()
  },[])
// Get Groceries from DB
const fetchGroceries = async ()=>{
  try{
    const response = await axios.get('/api')
    setGroceries(response.data)

  } catch (err){
    if(err.response){
      console.log(err.response.data)
      console.log(err.response.status)
      console.log(err.response.header)
    } else console.log(`Error: ${err.message}`)
  }
}
  return (
    // <div className="App">
    //   <Router>
    //     <Title/>
    //     <LoginForm/>
    //     <Header text ={"Groceries List"}/>
    //     <AddGroceries/>
    //     <Groceries groceries = {groceries} />
    //   </Router>
    // </div>
    // <div>
    //   <Router>
    //     <Routes>
    //       <Route exact path = "/">
    //         {accessToken?<Link to = '/protected'/> : <Login setAccessToken={setAccessToken}/>}
    //       </Route>
    //       <Route path = "/protected">
    //         {accessToken? (
    //           <Protected accessToken={accessToken}/>
    //         ):
    //         <Link to = "/"/>
    //         }
    //       </Route>
    //       <Route path ="/logout">
    //         <Logout setAccessToken={setAccessToken}/>
    //       </Route>
    //     </Routes>
    //   </Router>
    //   {accessToken && (<div><a href='/logout'>Logout</a></div>)}
    // </div>
    <div>
       {/* <Login setAccessToken={setAccessToken} accessToken={accessToken}/>
       <Logout setAccessToken={setAccessToken}/>
       <Protected accessToken={accessToken} /> */}

    <Router>
      <Routes>
        <Route exact path="/" element={<Login setAccessToken={setAccessToken}/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </Router>
      {/* <Router>
        <Routes>
          <Route exact path="/">
            {accessToken ? <Link to="/protected" /> :  <Login setAccessToken={setAccessToken}/>}
          </Route>
          <Route path="/protected">
            {accessToken ? (
              <Protected accessToken={accessToken} />
            ) : (
              <Link to="/" />
            )}
          </Route>
          <Route path="/logout">
            <Logout setAccessToken={setAccessToken} />
          </Route>
        </Routes>
      </Router>
      {accessToken && <div><Link to="/logout">Logout</Link></div>} */}
    </div>
    );
}

export default App;
