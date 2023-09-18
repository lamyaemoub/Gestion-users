import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from './App'
import Add from './Component/Add'
import EditUser from './Component/EditUser'



function RouteApp() {
  return (
    
       <BrowserRouter>
       
        <Routes>
        <Route path='/' element = {<App/>} />
        <Route path='/create' element = {<Add/>} />
        <Route path="/edit/:id" element={<EditUser />} />
        </Routes>
       </BrowserRouter>
    
  )
}

export default RouteApp
