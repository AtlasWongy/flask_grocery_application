import {
    Button,
    Stack
} from '@mui/material'
import { useState, useEffect } from 'react'

export const ButtonNew = ({ type }) => {
    const [buttonType, setButtonType] = useState('')
    const [isFullWidth, setIsFullWidth] = useState(false)

    useEffect(()=>{
        setButtonType(type)
        console.log(`The button type is ${buttonType}`)
        switch(buttonType) {
            case "Add":
                return
            case "Login":
                console.log(buttonType)
                setIsFullWidth(true)
        }
    }, [buttonType])

    return (
        <Stack spacing={2} direction="row">
            <Button variant="contained" fullWidth={isFullWidth}>
                {buttonType}
            </Button>
        </Stack>
    )
}