import React, { useState } from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateFlows() {
  const [sourceIP,setsourceIP] = useState('');
  const [destinationIP,setDestinationIP] = useState('');
  const [sourcePort,setSourcePort] = useState('');
  const [destinationPort,setDestinationPort]= useState('');
  const [protocol,setProtocol] = useState('');
  const [action,setAction] = useState('');
  const [packetCount,setPacketCount] = useState('');
  const [byteCount,setBytCount] = useState('');
  
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveFlow =()=>{
    const data ={
      sourceIP,
      destinationIP,
      sourcePort,
      destinationPort,
      protocol,
      action,
      packetCount,
      byteCount
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books',data)
      .then(()=>{
        setLoading(false);
        navigate('/')
      })
      .catch((error)=>{
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      })
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Flow</h1>
      {loading ? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <lable className='text-xl mr-4 text-gray-500'>Source IP</lable>
          <input
            type='text'
            value={sourceIP}
            onChange={(e)=>setsourceIP(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <lable className='text-xl mr-4 text-gray-500'>Destination IP</lable>
          <input
            type='text'
            value={destinationIP}
            onChange={(e)=>setDestinationIP(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
          <lable className='text-xl mr-4 text-gray-500'>Source Port</lable>
          <input
            type='text'
            value={sourcePort}
            onChange={(e)=>setSourcePort(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
        <lable className='text-xl mr-4 text-gray-500'>Destination Port</lable>
        <input
          type='text'
          value={destinationPort}
          onChange={(e)=>setDestinationPort(e.target.value)}
          className='border-2 border-gray-500 px-4 py-2 w-full'
        />
      </div>

      <div className='my-4'>
      <lable className='text-xl mr-4 text-gray-500'>Protocol</lable>
      <input
        type='text'
        value={protocol}
        onChange={(e)=>setProtocol(e.target.value)}
        className='border-2 border-gray-500 px-4 py-2 w-full'
      />
    </div>

    <div className='my-4'>
    <lable className='text-xl mr-4 text-gray-500'>Action</lable>
    <input
      type='text'
      value={action}
      onChange={(e)=>setAction(e.target.value)}
      className='border-2 border-gray-500 px-4 py-2 w-full'
    />
  </div>

  <div className='my-4'>
  <lable className='text-xl mr-4 text-gray-500'>Packet Countt</lable>
  <input
    type='text'
    value={packetCount}
    onChange={(e)=>setPacketCount(e.target.value)}
    className='border-2 border-gray-500 px-4 py-2 w-full'
  />
</div>

<div className='my-4'>
<lable className='text-xl mr-4 text-gray-500'>Byte Count</lable>
<input
  type='text'
  value={byteCount}
  onChange={(e)=>setBytCount(e.target.value)}
  className='border-2 border-gray-500 px-4 py-2 w-full'
/>
</div>

          <button className='p-2 bg-sky-300 m-8' onClick={handleSaveFlow}>Save</button>



      </div>
    </div>
  )
}

export default CreateFlows