import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ShowTable from './pages/showTable'
import DeleteFlow from './pages/DeleteFlow'
import CreateFlow from './pages/CreateFlow'


function App() {
  return (
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/flow/create' element={<CreateFlow/>}/>
     <Route path='/flow/details/:id' element={<ShowTable/>}/>
     <Route path='/flow/delete/:id' element={<DeleteFlow/>}/>
   </Routes>
  )
}

export default App