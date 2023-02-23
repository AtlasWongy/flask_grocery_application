import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import { AddGroceries } from "./AddGroceries";
import { Groceries } from "./Groceries";
import './style.css'

export const Protected = ({accessToken, primaryKey}) =>{
    // console.log('inprotected')
    const [message, setMessage] = useState('');
    const [addGrocery, setAddGrocery] = useState(false)

    //New Test
    const [groceries, setGroceries] = useState([''])

    useEffect (()=>{
        const fetchData = async ()=>{
            // console.log('in protected')
            // console.log(accessToken)
            // console.log('Local Storage access token')
            // console.log(localStorage.getItem('access_token'))
            try{
                const response = await axios.get('/api/protected',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                // console.log('post response')
                setMessage(response.data.message)
                // console.log('ITWORKSs')
                // console.log(response.data.message)
            } catch(e){
                console.error(e)
                console.log(e)
            }
        }
        fetchData()
    },[accessToken])
    return (
        <div className = "overallContainer">
            <Header text ={"Groceries List"} setAddGrocery={setAddGrocery}/>
            <p>{message}</p>
            <AddGroceries addGrocery={addGrocery} primaryKey={primaryKey} setGroceries= {setGroceries}/>
            <Groceries setGroceries= {setGroceries} groceries={groceries} />    
            {accessToken && (<div className = "logoutBtn"><a className = "logout" href="/logout">Logout</a></div>)}
        </div>
    )
};