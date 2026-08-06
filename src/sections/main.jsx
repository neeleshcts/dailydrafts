import { Alert, Box, Grid, IconButton, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { AutoAwesome } from '@mui/icons-material';
import { addToQueue } from '../services/addToQueue';
import React from 'react';
import { UseAlert } from '../hooks/UseAlert';
import { UseApiState } from '../hooks/UseApiState';
import Loading from '../ui/loading';
import ChecklistIcon from '@mui/icons-material/Checklist';

const Main = ({displayOutput, displayInput}) => {
    const [textInput, setTextInput] = React.useState("");
    const {alert, handleAlert} = UseAlert() ;
    const {apiState, handleApiState} = UseApiState();
    const [addMode, setAddMode] = React.useState(true);


    const handleChange = (e)=>{
            setTextInput(e.target.value);  
            handleAlert(false , "", "");        
    }

    const toggleAddMode = ()=>{
           setAddMode(prev=> !prev);
    }


    const submitTask = async (e)=>{
        try {
            e.preventDefault();
            handleApiState({loading: true , success: false, error: false})            
            
            if(textInput === null || textInput === ""){                
                throw new Error("Empty task cannot be submitted");
            }

            else{
               const response = await addToQueue(textInput);
               handleApiState({loading: false, success: true, error: false});
               handleAlert(true, "success", "Task added.");
               setTextInput('');
            }
        } catch (error) {
             handleApiState({loading: false, success: false, error: true});
             handleAlert(true, "error" , error.message);
        }
    }

const copyContent = async () => {
    if (displayOutput === 'Draft not generated yet.') {
        handleAlert(true, "error", "Nothing to copy yet.");
        return;
    }

    try {
        await navigator.clipboard.writeText(displayOutput);
        handleAlert(true, "success", "Copied to clipboard.");
    } catch (error) {
        handleAlert(true, "error", "Failed to copy.");
    }
}

  return (
    <Box component={"main"} className='main-section'>
        {apiState.loading && <Loading isLoading={apiState.loading} />}
        {alert.status && <Alert severity={alert.severity}>{alert.message}</Alert>}
            <Grid container columnSpacing={2}>
                <Grid  size={6} component={"form"} onSubmit={submitTask}>
                    <Box className='input-layout'>
                        <Grid container sx={{justifyContent: "flex-start", alignItems: "start",}}>
                            <Grid  size={2} component="div"> 
                                <Box className="icon-box">                                    
                                     <IconButton onClick={toggleAddMode}>
                                        { addMode ? 
                                            <EditIcon className='add-text'/> : 
                                            <ChecklistIcon className='add-text' />
                                        }
                                     </IconButton>                                     
                                </Box>
                            </Grid>
                            <Grid  size={10} sx={{marginLeft: "-1rem"}}>
                                <Box>
                                    {
                                        addMode ? 
                                        <>
                                            <Typography component="h3" className="what-have-you-done">What have you done so far</Typography>
                                            <Typography component={"p"}>write freely, add your thoughts, tasks, updates, or notes</Typography>
                                        </>
                                        :
                                        <>
                                            <Typography component="h3" className="what-have-you-done">What have you drafted so far</Typography>
                                            <Typography component={"p"}>These are the drafts that you have mentioned so far</Typography>
                                        </>
                                    }
                                </Box>
                            </Grid>

                        </Grid>
                        <Box sx={{padding: "0rem 2rem"}}>
                            {
                                addMode ? 
                                <textarea onChange={handleChange} rows="5" placeholder={ textInput ? textInput  : 'Start writing your input text here'} className='input-area'/>
                                        :
                                <textarea onChange={handleChange} readOnly rows="5" placeholder={ displayInput } className='input-area'/>                                        
                            }
                            
                        </Box>
                        <Grid container sx={{marginTop: "1rem", justifyContent: "space-between", alignItems: "center", gap: "2rem"}}>                         
                                <Grid  size="grow">
                                    <button  className='add-task'><Box component={"span"} sx={{display: "flex", justifyContent: "center", alignItem: "center"}}><AddIcon /></Box><Typography component={"span"} sx={{fontSize: 'var(--text-md)', fontFamily: 'var(--font-primary)'}}>Add To Tasks</Typography></button>
                                </Grid>
                                <Grid  size={1} sx={{display: "flex",justifyContent: "flex-end"}}>                                
                                    <button className="delete-icon icon-box" sx={{padding: '.25rem 0', backgroundColor: 'rgba(239, 68, 68, 0.08)'}}><DeleteIcon sx={{color: "red"}}/></button>
                                </Grid>
                        </Grid> 
                    </Box>
                </Grid>
                 <Grid  size={6}>
                    <Box className='input-layout'>
                        <Grid container sx={{justifyContent: "flex-start", alignItems: "start",}}>
                            <Grid  size={2} component="div"> 
                                <Box className="icon-box">
                                    <AutoAwesome className='add-text'/>
                                </Box>
                            </Grid>
                            <Grid  size={10} sx={{marginLeft: "-1rem"}}>
                                <Box>
                                    <Typography component="h3" className="what-have-you-done">The output will appear here</Typography>
                                    <Typography component={"p"}>Copy the output here</Typography>
                                </Box>
                            </Grid>

                        </Grid>
                        <Box sx={{padding: "0rem 2rem"}}>                            
                                <Typography component={"div"} tabIndex={0}  className='input-area' sx={{padding: ".75rem",height: "120px",maxHeight: "120px",boxSizing: "border-box", backgroundColor: "#ffffff", whiteSpace: "pre-line" , borderRadius: "10px", border: '1px solid black', overflowY: "auto"}}>
                                        {displayOutput}
                                </Typography>                                          
                        </Box>
                        <Box sx={{padding: "1.5rem 2rem", display: 'flex' , justifyContent: "flex-start", }}>
                                <button className='copy-btn' onClick={copyContent}>
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