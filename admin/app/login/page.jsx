"use client"
import React, { useEffect, useState } from 'react';
import useLogin from '../../src/hooks/useLogin';
import Image from 'next/image';
import AppButton from '../../src/components/AppButton';
import AppInput from '../../src/components/AppInput';
import AppLoading from '../../src/components/AppLoading';
import Swal from 'sweetalert2'
import logo from '../../src/img/icon-text.png'
import Link from 'next/link'
import AppSeparator from '../../src/components/AppSeparator';
import AppBadge from '../../src/components/AppBadge';


const Login = () => {
  const { error, handleLogin, isLoading, responseData } = useLogin()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    responseData && Swal.fire({
      title: "Good job!",
      text: "login successfuly!",
      icon: "ok"
    });
    error && Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,

    });
  }, [responseData, error])

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin(username, password)


  };

  return (
    <div className='w-screen h-screen justify-center items-center flex flex-col  bg-primary' >

      {isLoading && <AppLoading />}
      <AppBadge classname='p-10 rounded-xl w-[600px] flex justify-center space-y-4 items-center flex-col'  >
        <Image src={logo} alt="logo" width={200} height={200} />

        <form onSubmit={handleSubmit} className='w-full' >

          <AppInput
            label="email or phone number"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <AppInput
            label="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <AppButton type="submit">Login</AppButton>
          <div className='w-full flex justify-center items-center flex-col' >
          <AppSeparator text={"or"}></AppSeparator>
           <div className='w-full border-solid border-2 border-primary rounded-full p-1 justify-center items-end flex' >
           <Link  className='capitalize text-primary' href="/signup" > sign up</Link>
           </div>
          </div>
        </form>
      </AppBadge>

    </div>
  );
};

export default Login;

