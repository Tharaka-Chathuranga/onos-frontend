// import React, { useState } from 'react'
// import BackButton from '../components/BackButton'
// import Spinner from '../components/Spinner'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// function CreateFlows() {
//   const [sourceIP,setsourceIP] = useState('');
//   const [destinationIP,setDestinationIP] = useState('');
//   const [sourcePort,setSourcePort] = useState('');
//   const [destinationPort,setDestinationPort]= useState('');
//   const [protocol,setProtocol] = useState('');
//   const [action,setAction] = useState('');
//   const [packetCount,setPacketCount] = useState('');
//   const [byteCount,setBytCount] = useState('');
  
//   const [loading,setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSaveFlow =()=>{
//     const data ={
//       sourceIP,
//       destinationIP,
//       sourcePort,
//       destinationPort,
//       protocol,
//       action,
//       packetCount,
//       byteCount
//     };
//     setLoading(true);
//     axios
//       .post('http://localhost:5555/flows',data)
//       .then(()=>{
//         setLoading(false);
//         navigate('/')
//       })
//       .catch((error)=>{
//         setLoading(false);
//         alert('An error happened. Please check console');
//         console.log(error);
//       })
//   };

//   return (
//     <div className='p-4'>
//       <BackButton/>
//       <h1 className='text-3xl my-4'>Create Flow</h1>
//       {loading ? <Spinner/> : ''}
//       <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
//         <div className='my-4'>
//           <lable className='text-xl mr-4 text-gray-500'>Source IP</lable>
//           <input
//             type='text'
//             value={sourceIP}
//             onChange={(e)=>setsourceIP(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2 w-full'
//           />
//         </div>

//         <div className='my-4'>
//           <lable className='text-xl mr-4 text-gray-500'>Destination IP</lable>
//           <input
//             type='text'
//             value={destinationIP}
//             onChange={(e)=>setDestinationIP(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2 w-full'
//           />
//         </div>

//         <div className='my-4'>
//           <lable className='text-xl mr-4 text-gray-500'>Source Port</lable>
//           <input
//             type='text'
//             value={sourcePort}
//             onChange={(e)=>setSourcePort(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2 w-full'
//           />
//         </div>

//         <div className='my-4'>
//         <lable className='text-xl mr-4 text-gray-500'>Destination Port</lable>
//         <input
//           type='text'
//           value={destinationPort}
//           onChange={(e)=>setDestinationPort(e.target.value)}
//           className='border-2 border-gray-500 px-4 py-2 w-full'
//         />
//       </div>

//       <div className='my-4'>
//       <lable className='text-xl mr-4 text-gray-500'>Protocol</lable>
//       <input
//         type='text'
//         value={protocol}
//         onChange={(e)=>setProtocol(e.target.value)}
//         className='border-2 border-gray-500 px-4 py-2 w-full'
//       />
//     </div>

//     <div className='my-4'>
//     <lable className='text-xl mr-4 text-gray-500'>Action</lable>
//     <input
//       type='text'
//       value={action}
//       onChange={(e)=>setAction(e.target.value)}
//       className='border-2 border-gray-500 px-4 py-2 w-full'
//     />
//   </div>

//   <div className='my-4'>
//   <lable className='text-xl mr-4 text-gray-500'>Packet Countt</lable>
//   <input
//     type='text'
//     value={packetCount}
//     onChange={(e)=>setPacketCount(e.target.value)}
//     className='border-2 border-gray-500 px-4 py-2 w-full'
//   />
// </div>

// <div className='my-4'>
// <lable className='text-xl mr-4 text-gray-500'>Byte Count</lable>
// <input
//   type='text'
//   value={byteCount}
//   onChange={(e)=>setBytCount(e.target.value)}
//   className='border-2 border-gray-500 px-4 py-2 w-full'
// />
// </div>

//           <button className='p-2 bg-sky-300 m-8' onClick={handleSaveFlow}>Save</button>



//       </div>
//     </div>
//   )
// }

// export default CreateFlows

import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateFlows() {
  const [formData, setFormData] = useState({
    priority: 40000,
    timeout: 0,
    isPermanent: true,
    deviceId: 'of:0000000000000001',
    instructionType: 'QUEUE',
    queueId: '1',
    criteriaType: 'ETH_TYPE',
    ethType: '0x800'
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleSaveFlow = () => {
    const data = {
      ...formData,
      treatment: {
        instructions: [
          {
            type: formData.instructionType,
            queueId: formData.queueId
          }
        ]
      },
      selector: {
        criteria: [
          {
            type: formData.criteriaType,
            ethType: formData.ethType
          }
        ]
      }
    };

    const config = {
      headers: {
       "Authorization": 'Basic b25vczpyb2Nrcw==',
       "Access-Control-Allow-Origin": "http://localhost:5173",
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      }
    };

    setLoading(true);
    axios
      .post(`http://localhost:8181/onos/v1/flows/${formData.deviceId}`, data, config)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Flow</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
        {/* Priority input */}
        {/* ... */}
        {/* Timeout input */}
        {/* ... */}
        {/* isPermanent selection */}
        {/* ... */}
        {/* Device ID input */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Device ID</label>
          <input
            type='text'
            name='deviceId'
            value={formData.deviceId}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>

        <div className='my-4'>
        <label className='text-xl mr-4 text-gray-500'>Is Permanent:</label>
        <select name="isPermanent" value={formData.isPermanent} onChange={handleInputChange}>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
        {/* Type of instruction */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Instruction Type</label>
          <input
            type='text'
            name='instructionType'
            value={formData.instructionType}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        {/* Queue ID input */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Queue ID</label>
          <input
            type='text'
            name='queueId'
            value={formData.queueId}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        {/* Selector Criteria Type */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Criteria Type</label>
          <input
            type='text'
            name='criteriaType'
            value={formData.criteriaType}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        {/* EthType input */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>EthType</label>
          <input
            type='text'
            name='ethType'
            value={formData.ethType}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        {/* Save button */}
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveFlow}>
          ADD FLOW
        </button>
      </div>
    </div>
  );
}

export default CreateFlows;




