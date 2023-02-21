import './App.css';
import { Header } from './component/Header';
import {Groceries} from './component/Groceries';
import { useState, useEffect } from 'react';
import axios from './api/posts'
import { AddGroceries } from './component/AddGroceries';
function App() {
  const [groceries, setGroceries] = useState([''])

  useEffect(()=>{
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
    fetchGroceries()
  },[])
// Get Groceries from DB

  return (
    <div className="App">
        <Header text ={"Groceries List"}/>
        <AddGroceries/>
        <Groceries groceries = {groceries} />
    </div>
  );
}

export default App;
