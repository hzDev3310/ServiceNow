"use client"
import AppBadge from './AppBadge'
import AppButton from './AppButton'
import AppSeparator from './AppSeparator'
import { usePathname } from 'next/navigation'
import useGet from '../api/useGet';
import Link from 'next/link';


const LeftBar = () => {
  const pathname = usePathname()
  const currentuser = localStorage.getItem("currentAdmin") || null
  const jsonuser = JSON.parse(currentuser)
  const id = jsonuser?.id
  const logout = ()=>{
    localStorage.removeItem('currentAdmin')
    window.location.reload()
  }

  const { data } = useGet("/admin/" + id)
  return (
    <AppBadge classname=' h-screen w-[25%] flex  flex-col justify-between items-center p-8 fixed' >

      <div className='w-full flex flex-col justify-between items-center ' >
        <div className='flex flex-col justify-center items-center space-y-4' >
        <img class="theme-image light-mode-img dark-mode-img rounded-full" alt="Theme based image"></img>
          <h1 className='capitalize font-bold text-3xl' >{data?.name}</h1>
        </div>
        <div className="w-full m-4">
          <AppSeparator />
        </div>
        <ul className='flex flex-col w-full'>
          <Link href="/" className={`capitalize  mb-4 w-full text-xl p-4 rounded-xl ${pathname =="/" && "bg-primary text-white"}`}> Dashbord </Link>
          <Link href="/users" className={`capitalize  mb-4 w-full text-xl p-4 rounded-xl ${pathname.includes("/users")  && "bg-primary text-white"}`} >Users</Link>
          <Link href="/providers" className={`capitalize  mb-4 w-full text-xl p-4 rounded-xl ${pathname =="/providers" && "bg-primary text-white"}`}> providers</Link>
          <Link href="/reports" className={`capitalize  mb-4 w-full text-xl p-4 rounded-xl ${pathname =="/reports" && "bg-primary text-white"}`}>Reports</Link>
          <Link href="/admin" className={`capitalize  mb-4 w-full text-xl p-4 rounded-xl ${pathname =="/admin" && "bg-primary text-white"}`}>Admin</Link>
        </ul>

      </div>
      <div className='w-full flex flex-col justify-center items-center'>
        <div className="w-full m-4">
          <AppSeparator />
        </div>
        <AppButton onClick={logout} >logout</AppButton>
      </div>
    </AppBadge>
  )
}

export default LeftBar
