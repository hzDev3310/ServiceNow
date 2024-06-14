"use client"

import { useState } from "react"
import AppButton from "./AppButton"
import { useRouter } from "next/navigation"
import Link from "next/Link"
import AppLoading from "./AppLoading"
import useGet from "../api/useGet";

const ProfilIcon = () => {
  const {}=useGet()
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const currentAdmin = localStorage?.getItem("currentAdmin") || null
  const admin = JSON.parse(currentAdmin) || null
  const token = admin?.token || null
  const adminId = admin?.id || null
  const {data , isLoading}=useGet(`/admin/${adminId}`)
  const logout = async () => {
    setLoading(true)
    await localStorage.removeItem('currentAdmin');
    router.push('/login')
    setLoading(false)
  }

  if (loading) {
    return <div className="w-screen h-screen" >
      <AppLoading />
    </div>
  }

  return (
    <>
      {token != null ?
        <>
          <div className="flex items-center w-36 justify-end cursor-pointer" onClick={() => { setShow(!show) }} >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Service Icon"
              width={40}
              height={40}
            />
            <h1 className="ml-2 text-white">{data?.name}</h1>
          </div>
          <div className={!show && "hidden"}>
            <div className="absolute rounded-xl  bg-slate-200 dark:bg-slate-800  h-32 p-4 min-w-36 top-16 right-10" >
              <h1>login as
                <br />
                {data?.phoneNumber}
                </h1>
              <div className="mt-1" >
                <AppButton onClick={logout} >log out</AppButton>
              </div>
            </div>
          </div>
        </> : <div className="flex items-center w-36 justify-end cursor-pointer" onClick={() => { setShow(!show) }} >
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Service Icon"
            width={40}
            height={40}
          />
          <Link href="/login" className="ml-2 text-white" >login now</Link>
        </div>
      }
    </>
  )
}

export default ProfilIcon
