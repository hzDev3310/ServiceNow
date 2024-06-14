"use client"
import DarkModeToggle from './DarkModeToggle';
import { usePathname   } from 'next/navigation';
import Link from 'next/link'
import AppBadge from './AppBadge';

const Navbar = () => {
  const pathname = usePathname();
  const isLoginOrSignup = (pathname === '/login' || pathname === '/signup') ? true : false;
  return (
   <div className={isLoginOrSignup ===true ? 'hidden w-screen' :"block w-screen" }  >
 
     <AppBadge classname="w-screen py-2 px-12 flex justify-between items-center">
      <Link href="./" className='w-36' >
        <h1 className="text-2xl font-bold">Service Now</h1>
      </Link>
    <DarkModeToggle />
    </AppBadge>
   </div>
  );
};

export default Navbar;
