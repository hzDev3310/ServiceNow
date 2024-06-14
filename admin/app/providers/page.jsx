"use client"

import useGet from "../../src/api/useGet"
import Swal from 'sweetalert2'
import LeftBar from "../../src/components/LeftBar";
import AppInput from "../../src/components/AppInput";
import AppLoading from "../../src/components/AppLoading";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import AppButton from "../../src/components/AppButton";
import { useEffect, useRef } from "react";
import useUpdate from "../../src/api/useUpdate";


const page = () => {
    const  {updateData , isLoading : updateLoading ,responseData ,error} = useUpdate()
    const { data ,isLoading } = useGet("/admin/providers",[responseData]);
    const accept = (id)=>{
        updateData(`/admin/${id}/accept`)
    } 

    useEffect(() => {
        responseData && Swal.fire({
          title: "Good job!",
          text: responseData?.message,
          icon: "ok"
        });
        error && Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error,
    
        });
      }, [responseData, error])
    const reject= (id)=>{
        updateData(`/admin/${id}/reject`)
    } 
    const phoneNumberRef = useRef(null);
    const userId = useRef(null);

    const copyToClipboard = (reff, label) => {
        const value = reff.current.innerText;
        const tempInput = document.createElement('input');
        tempInput.value = value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        Swal.fire({
            position: "top-start",
            icon: "success",
            title: label,
            showConfirmButton: false,
            timer: 1500
          });
    };

    return (
        <>
        {(isLoading|| updateLoading) ? <AppLoading ></AppLoading> : 
        <div className="w-screen h-screen flex">
        <LeftBar />
        
        <div className="w-[25%]"> </div>
        <div className="w-[75%] p-12  flex flex-col justify-center items-center" >
            <div className='w-[80%]' >
               
                <AppInput placeholder='search for a user' />
            </div>
            <div className="rounded-xl overflow-y-scroll no-scrollbar">
                <table class="w-full rounded-xl  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 w-32 py-3">
                                id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                phone number
                            </th>
                            <th scope="col" class="px-6 py-3">
                                location
                            </th>
                            <th scope="col" class="px-6 py-3">
                                View certifcation
                            </th>
                            <th scope="col" class="px-6 py-3">
                                View more
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Accept
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Reject
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((user, index) => (
                            <tr key={index} className="bg-white w-32 border-b dark:bg-gray-800 dark:border-gray-700">
                                <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <button onClick={() => copyToClipboard(phoneNumberRef, "ID copied to clipboard!")} className="flex">
                                        <p ref={userId} >
                                            {user._id}
                                        </p>
                                    </button>
                                </td>
                                <td className="px-6 py-4">
                                    {user?.service?.ProviderName}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={() => copyToClipboard(phoneNumberRef, "Phone number copied to clipboard!")} className="flex">
                                        +216
                                        <p ref={phoneNumberRef} className="ml-1" >
                                            {user?.service?.phoneNumber}
                                        </p>
                                    </button>
                                </td>
                                <td className="px-6 py-4  h-32 ">
                                    
                                    <div className="ml-1 flex justify-center items-center" >
                                    <FaMapMarkerAlt />    {user?.service?.location?.cityName}
                                    </div>
                                </td>
                                <td className="px-6 py-4 ">
                                    {user.service.certification ? <a className='h-10 w-10 text-primary underline' target="_blank" href={user.service.certification}>View <br /> certifcation </a> : "no verfication"}


                                </td>
                                <td className="px-6 py-4 ">
                                    <Link className='h-10 w-10 text-primary underline' href={"/users/" + user._id}>View more </Link>
                                </td>
                                <td className="px-6 py-4 ">
                                    <AppButton onClick={()=>{accept(user._id)}}  >accept</AppButton>
                                </td>
                                <td className="px-6 py-4 ">
                                    <AppButton style={{ background: "red" }} onClick={()=>{reject(user._id)}} >reject</AppButton>
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>

            </div>
        </div>


    </div>
        }
        </>
    )
}

export default page
