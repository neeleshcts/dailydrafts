import { Alert, Box, Grid, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AutoAwesome } from '@mui/icons-material';
import { addToQueue } from '../services/addToQueue';
import React from 'react';
import { UseAlert } from '../hooks/UseAlert';
import { UseApiState } from '../hooks/UseApiState';


const Main = () => {
    const [textInput, setTextInput] = React.useState(null);
    const {alert, handleAlert} = UseAlert() ;
    const {apiState, handleApiState} = UseApiState();
    console.log(apiState);
    const handleChange = (e)=>{
        try {
            setTextInput(e.target.value);  
            handleAlert(false , "", "");
            
        } catch (error) {
            handleAlert(true, 'error', error.message);
        }
    }

    const submitTask = async (e)=>{
        try {
            handleApiState({loading: true , success: false, error: false})            
            e.preventDefault();
            if(textInput === null || textInput === ""){
                throw new Error("Empty task cannot be submitted");
            }

            else{
               const response = await addToQueue(textInput);
               console.log(response)
               handleApiState({loading: false, success: true, error: false})
            }
        } catch (error) {
             handleApiState({loading: false, success: false, error: true});
             handleAlert("error" , error.message);
        }
    }

  return (
    <Box component={"main"} className='main-section'>
        {alert.status && <Alert severity={alert.severity}>{alert.message}</Alert>}
            <Grid container columnSpacing={2}>
                <Grid item size={6} component={"form"} onSubmit={submitTask}>
                    <Box className='input-layout'>
                        <Grid container sx={{justifyContent: "flex-start", alignItems: "start",}}>
                            <Grid item size={2} component="div"> 
                                <Box className="icon-box">
                                    <EditIcon className='add-text'/>
                                </Box>
                            </Grid>
                            <Grid item size={10} sx={{marginLeft: "-1rem"}}>
                                <Box>
                                    <Typography component="h3" className="what-have-you-done">What have you done so far</Typography>
                                    <Typography component={"p"}>write freely, add your thoughts, tasks, updates, or notes</Typography>
                                </Box>
                            </Grid>

                        </Grid>
                        <Box sx={{padding: "0rem 2rem"}}>
                            <textarea onChange={handleChange} rows="5" placeholder={ textInput ? textInput  : 'Start writing your input text here'} className='input-area'/>                  
                        </Box>
                        <Grid container sx={{marginTop: "1rem", justifyContent: "space-between", alignItems: "center", gap: "2rem"}}>                         
                                <Grid item size="grow">
                                    <button  className='add-task'><Box component={"span"} sx={{display: "flex", justifyContent: "center", alignItem: "center"}}><AddIcon /></Box><Typography component={"span"} sx={{fontSize: 'var(--text-md)', fontFamily: 'var(--font-primary)'}}>Add To Tasks</Typography></button>
                                </Grid>
                                <Grid item size={1} sx={{display: "flex",justifyContent: "flex-end"}}>                                
                                    <button className="delete-icon icon-box" sx={{padding: '.25rem 0', backgroundColor: 'rgba(239, 68, 68, 0.08)'}}><DeleteIcon sx={{color: "red"}}/></button>
                                </Grid>
                        </Grid> 
                    </Box>
                </Grid>
                 <Grid item size={6}>
                    <Box className='input-layout'>
                        <Grid container sx={{justifyContent: "flex-start", alignItems: "start",}}>
                            <Grid item size={2} component="div"> 
                                <Box className="icon-box">
                                    <AutoAwesome className='add-text'/>
                                </Box>
                            </Grid>
                            <Grid item size={10} sx={{marginLeft: "-1rem"}}>
                                <Box>
                                    <Typography component="h3" className="what-have-you-done">The output will appear here</Typography>
                                    <Typography component={"p"}>Copy the output here</Typography>
                                </Box>
                            </Grid>

                        </Grid>
                        <Box sx={{padding: "0rem 2rem"}}>                            
                                <Typography className='input-area' sx={{height: "120px", backgroundColor: "#ffffff" , borderRadius: "10px", border: '1px solid black'}}>

                                </Typography>                                          
                        </Box>
                        <Box sx={{padding: "1.5rem 2rem", display: 'flex' , justifyContent: "flex-start"}}>
                                <button className='copy-btn'>
                                    <ContentCopyIcon />
                                </button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>        
            
        
    </Box>
  )
}

export default Main