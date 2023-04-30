import { useEffect, useState } from "react";
import { Header } from "./Header";
import { AddGroceries } from "./AddGroceries";
import { Groceries } from "../components/Groceries/Groceries";
import api from '../../api/posts'
import './style.css'

export const Protected = ({accessToken, primaryKey}) =>{
    const [message, setMessage] = useState('');
    const [addGrocery, setAddGrocery] = useState(false)
    const [groceries, setGroceries] = useState([''])

    useEffect (()=>{
        const fetchData = async ()=>{
            try{
                const response = await api.get('/api/protected',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                setMessage(response.data.message)
            } catch(e){
                console.error(e)
                console.log(e)
            }
        }
        fetchData()
    },[accessToken])

    // if (loading) {
    //     return <div>Loading...</div>
    //   }
    
    return (
        <div className = "overallContainer">
            <Header text ={"Groceries List"} setAddGrocery={setAddGrocery}/>
            <p>{message}</p>
            {/* <Router>
                <Routes>
                    <Route path='/:id' element ={<EditDetails/>}/>
                </Routes>
            </Router> */}

            <AddGroceries addGrocery={addGrocery} setGroceries= {setGroceries}/>
            <Groceries setGroceries= {setGroceries} groceries={groceries} />    
            {accessToken && (<div className = "logoutBtn"><a className = "logout" href="/logout">Logout</a></div>)}
        </div>
    )
};