"use client"
import React, { useEffect } from 'react'
import useGet from '../../src/api/useGet'
import AppInput from '../../src/components/AppInput'
import LeftBar from '../../src/components/LeftBar'
import { FaMapMarkerAlt } from 'react-icons/fa'
import AppButton from '../../src/components/AppButton'
import AppLoading from '../../src/components/AppLoading'
import useDelete from '../../src/api/useDelete'
import Swal from 'sweetalert2'

const users = () => {
  const {handleDelete,isLoading : deleteLoading , responseData}=useDelete()
  const { data, isLoading } = useGet("/users",[responseData])
  const deleteUser = (id)=>{
    handleDelete("/users/"+id)
  }
  useEffect(()=>{
    responseData?.message && Swal.fire({
      title: "Good job!",
      text: "user blocked successfully",
      icon: "ok"
    });
  },[responseData])
  return (
    <div className='flex '>
      <LeftBar></LeftBar>
      <div className="w-[20%]" ></div>
     {
      (isLoading || deleteLoading) ? <AppLoading /> :  <div className='w-[80%]  justify-center items-center  flex flex-col flex-wrap  px-32 py-20' >
      <div className='w-[80%]' >
        <AppInput placeholder='search for a user' />
      </div>
      <br />
    
<div class="rounded-xl  relative overflow-x-auto w-[80%]">
  <table class="w-full rounded-xl  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
              <th scope="col" class="px-6 w-32 py-3">
                  
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
                  Block
              </th>
          </tr>
      </thead>
      <tbody>
      {data?.map((user, index) => (
        <tr key={index} className="bg-white w-32 border-b dark:bg-gray-800 dark:border-gray-700">
          <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
           <img  className='w-20 h-20 rounded-xl' src={user.profilPic||"https://img.freepik.com/vecteurs-premium/photo-profil-avatar-homme-illustration-vectorielle_268834-538.jpg"} alt="profil" />
          </td>
          <td className="px-6 py-4">
           {user?.name}
          </td>
          <td className="px-6 py-4">
           +216 {user?.phoneNumber?.number}
          </td>
          <td className="px-6 py-4 flex items-center h-32 ">
          <FaMapMarkerAlt /> Tunisa , {user?.location?.cityName}
          </td>
          <td className="px-6 py-4 ">
            <AppButton   onClick={()=>{deleteUser(user._id)}} >block</AppButton>
          </td>
        </tr>
      ))}
        
       
      </tbody>
  </table>
</div>



    </div>
     }
    </div>
  )
}

export default users
