import { createBrowserRouter, createRoutesFromElements, Route,RouterProvider } from "react-router"
import App from "../App"
import { checkOutput } from "../services/addToQueue"

const AppRoutes = () => {

  const router = createBrowserRouter(createRoutesFromElements(    
        <Route path="/" loader={checkOutput} element={<App />}/>    
  ))
  return (
    <RouterProvider router={router} />
  )
}

export default AppRoutes