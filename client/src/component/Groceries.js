import React from 'react'
import {Grocery} from './Grocery'

export const Groceries =  ({groceries}) =>{
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
