import {
    AppBar as Bar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material'
import { useState } from 'react'
import { AccountCircle } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'



export const AppBar = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <Bar>
                <Toolbar>
                    <IconButton
                        size='large'
                        edge='start'
                        color='inherit'
                        aria-label='menu'
                        sx = {{ mr : 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >Grocery Dashboard</Typography>
                    <div>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-control='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleMenu}
                            color='inherit'
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My Account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </Bar>
        </div>
    )
}