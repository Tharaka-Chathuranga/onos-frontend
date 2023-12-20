import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function ShowFlow() {
  const [flow,setFlow]=useState({})
  const [loading,setLoading]=useState(false)
  const {id}=useParams()

  useEffect(()=>{
    setLoading(true);
    axios
    .get(`http://localhost:5555/flows/${id}`)
    .then((response)=>{
      setflow(response.data);
      setLoading(false);
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Show Flow</h1>
      {loading ?(
        <Spinner/>
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{flow._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Source IP Address</span>
            <span>{flow.sourceIP}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Destination IP Address:</span>
            <span>{flow.destinationIP}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Source Port</span>
            <span>{flow.sourcePort}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Destination Port</span>
            <span>{flow.destinationPort}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Protocol</span>
            <span>{flow.protocol}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Action</span>
            <span>{flow.action}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Packet Count</span>
            <span>{flow.packetCount}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Byte Count</span>
            <span>{flow.byteCount}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(flow.createdAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowFlow