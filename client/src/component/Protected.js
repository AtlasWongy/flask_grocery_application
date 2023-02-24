import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "./Header";
import { AddGroceries } from "./AddGroceries";
import { Groceries } from "./Groceries";
import './style.css'
import { EditDetails } from "./EditGroceries";

export const Protected = ({accessToken, primaryKey}) =>{
    // console.log('inprotected')
    const [message, setMessage] = useState('');
    const [addGrocery, setAddGrocery] = useState(false)

    //New Test
    const [groceries, setGroceries] = useState([''])
    // const [loading, setLoading] = useState(true)

    useEffect (()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get('/api/protected',{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    },
                })
                // console.log('post response')
                setMessage(response.data.message)
                // setLoading(false)
                // console.log('ITWORKSs')
                // console.log(response.data.message)
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