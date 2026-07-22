import { Box, Typography } from "@mui/material"
import './style.css'

const Header = () => {
  return (
    <Box component="header" className="header-section">        
                    <Typography component="h1">Daily Drafts</Typography>
                    <Typography component={'p'}>Capture your progress.Let AI turn into clarity</Typography>        
    </Box>
  )
}

export default Header