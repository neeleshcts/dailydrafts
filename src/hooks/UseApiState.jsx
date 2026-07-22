import React from "react"

export const UseApiState = ()=>{
    
    const [ apiState , setApiState] = React.useState({
        loading: false,
        success: false,
        error: false
    })
    
    const handleApiState = (newApiStateObj)=>{
        setApiState( prev => ({
            ...prev,
           loading : newApiStateObj.loading,
           success : newApiStateObj.success,
           error : newApiStateObj.error,
        }))        
    }

    return  {apiState , handleApiState}
}