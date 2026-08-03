import React from "react"

export const UseAlert = ()=>{

    const  [alert , setAlert] = React.useState({        
        severity: "",
        message: "",
        status: false
    });

    const handleAlert = (status, severity , message)=>{
        setAlert(alert => ({
            ...alert,  
            status,          
            severity,
            message
        }))        
    }

    return {
        alert,
        handleAlert
    }
}