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
     <Route path='/flows/create' element={<CreateFlow/>}/>
     <Route path='/flows/details/:id' element={<ShowTable/>}/>
     <Route path='/flows/delete/:id' element={<DeleteFlow/>}/>
   </Routes>
  )
}

export default App