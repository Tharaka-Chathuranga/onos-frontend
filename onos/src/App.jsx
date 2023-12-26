import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import ShowTable from './pages/showTable'
import DeleteFlow from './pages/DeleteFlow'
import CreateFlow from './pages/CreateFlow'
import CreateQueue from './pages/CreateQueue'


function App() {
  return (
   <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/flows/create' element={<CreateFlow/>}/>
     <Route path='/flows/details/:id' element={<ShowTable/>}/>
     <Route path='/flows/delete/:id' element={<DeleteFlow/>}/>
      <Route path='/queues/create' element={<CreateQueue/>}/>
   </Routes>
  )
}

export default App