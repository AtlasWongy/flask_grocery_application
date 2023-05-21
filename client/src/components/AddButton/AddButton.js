import api from '../../api/posts'
import {useState, useEffect} from 'react'
import {Button} from '@mui/material'
import Cookies from 'js-cookie'

export const AddButton = ({setGroceries}) => {
    return (
        <div>
            <Button
                variant="contained"
                color="primary"
            >
                Add
            </Button>
        </div>
    )
}