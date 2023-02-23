import React from 'react'
import {Grocery} from './Grocery'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export const Groceries = ({groceries, setGroceries}) =>{
  // const [groceries, setGroceries] = useState([''])

  useEffect(()=>{
    fetchGroceries()
  },[])


// Get Groceries from DB
const fetchGroceries = async ()=>{
  console.log(Cookies.get('userId'))
  const authorization ={
    headers:{
        Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
}
  try{
    const response = await axios.get('/api',authorization)
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
    
    <>
        {groceries.map(grocery=>{
            return(
                <Grocery grocery={grocery} key={grocery.grocery_id}/>   
            )
        })}
    </>
  )
}
// export default Groceries
