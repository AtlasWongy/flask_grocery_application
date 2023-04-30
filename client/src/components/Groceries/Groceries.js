import React from 'react'
import { useEffect, useState } from 'react'
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router'
import api from '../../api/posts'

export const Groceries = () => {
    const [groceries, setGroceries] = useState([''])
    const { state } = useLocation()

    useEffect(() => {
        fetchGroceries()
    }, [])

    const fetchGroceries = async () => {
        Cookies.get('userId')
        const authorization = {
            headers: {
                Authorization: `Bearer ${Cookies.get('access_token')}`
            }
        }
        try {
            // const response = await axios.get('/api', authorization)
            console.log(`The authorization is ${authorization.headers.Authorization}`)
            const response = await api.get('/api', authorization)
            setGroceries(response.data)
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.header)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Grocery</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Deadline to get</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groceries.map((grocery, index) => (
                        <TableRow key={index}>
                            <TableCell>{grocery.grocery}</TableCell>
                            <TableCell>{grocery.quantity}</TableCell>
                            <TableCell>{grocery.date_to_get}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}