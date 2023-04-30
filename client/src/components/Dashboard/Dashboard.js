import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem
} from '@mui/material'
import { useState } from 'react'
import { ButtonNew } from '../Button/ButtonNew'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'



export const Dashboard = () => {
    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      }

    const handleClose = () => {
        setAnchorEl(null);
    }
    
    return (
        <div>
            {/* <AppBar>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr : 2 }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >Grocery Dashboard</Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar> */}
            <ButtonNew type='Add'/>
        </div>
    )
}