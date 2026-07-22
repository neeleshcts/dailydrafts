import React from "react"

export const UseAlert = ()=>{

    const  [alert , setAlert] = React.useState({        
        severity: "",
        message: "",
    });

    const handleAlert = (status, severity , message)=>{
        setAlert(alert => ({
            ...alert,            
            severity,
            message
        }))        
    }

    return {
        alert,
        handleAlert
    }
}