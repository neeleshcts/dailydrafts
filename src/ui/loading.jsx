import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

const Loading = (isLoading) => {

  const [open , setOpen] = React.useState(isLoading)

  const handleClose = ()=>{
    setOpen(false);
  }

  return (
    <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
>
            <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading