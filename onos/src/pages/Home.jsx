import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  //we have two different states
  const [flows, setflows] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //call backend
    setLoading(true);
    axios
      .get("http://localhost:5555/flows")
      .then((response) => {
        setflows(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p=4 m-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 text-sky-800">Flow Table</h1>
        <Link to="/flows/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="w-full border-separate">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Source IP</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Source Port
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Destination Port
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Protocol
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Action
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Packet Count
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Byte Count
              </th>
              <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
          </thead>
          <tbody>
            {flows.map((flows, index) => (
              <tr key={flows._id} className="h-8">
                <td className="border border-state-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-state-700 rounded-md text-center">
                  {flows.sourceIP}
                </td>
                <td className="border border-state-700 rounded-md text-center max-md:hidden">
                  {flows.destinationIP}
                </td>
                <td className="border border-state-700 rounded-md text-center max-md:hidden">
                  {flows.protocol}
                </td>
                <td className="border border-state-700 rounded-md text-center max-md:hidden">
                  {flows.action}
                </td>
                <td className="border border-state-700 rounded-md text-center max-md:hidden">
                  {flows.packetCount}
                </td>
                <td className="border border-state-700 rounded-md text-center max-md:hidden">
                  {flows.byteCount}
                </td>
                <td className="border border-state-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/flows/details/${flows._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    <Link to={`/flows/delete/${flows._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
