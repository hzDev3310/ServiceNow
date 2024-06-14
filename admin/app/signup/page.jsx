"use client"
import React, { useEffect, useState } from 'react';

import useLogin from '../../src/hooks/useLogin';
import Image from 'next/image';
import AppButton from '../../src/components/AppButton';
import AppInput from '../../src/components/AppInput';
import AppLoading from '../../src/components/AppLoading';
import Swal from 'sweetalert2';
import logo from '../../src/img/icon-text.png';
import Link from 'next/link';
import AppSeparator from '../../src/components/AppSeparator';
import usePost from '../../src/api/usePost';
import { useRouter } from 'next/navigation';
import AppBadge from '../../src/components/AppBadge';


const Signup = () => {
  const route = useRouter()
  const [body, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [key, setKey] = useState("")
  const { name, email, phoneNumber, password } = body;

  const { error,responseData, loading, postData } = usePost("/signup", { 'Content-Type': 'application/json', 'Authorization': key });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...body, [name]: value });
  };

  useEffect(() => {
    responseData && Swal.fire({
      title: "Good job!",
      text: "login successfully!",
      icon: "ok"
    });

    responseData  && route.push("/login")
    error && Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error,
    });
  }, [responseData, error])

  const handleSubmit = (event) => {
    event.preventDefault();
    postData(body);
    console.log({ error })
  };

  return (
    <div className='w-screen h-screen justify-center items-center flex flex-col bg-primary' >
      {loading && <AppLoading />}
      <AppBadge classname=' p-10 rounded-xl w-[600px] flex justify-center space-y-4 items-center flex-col'  >
        <Image src={logo} priority alt="logo" width={200} height={200} />

      
        <form onSubmit={handleSubmit} className='w-full' >
          <AppInput
            label="key"
            type="text"
            id="key"
            name="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />
          <AppInput
            label="name"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          <AppInput
            label="email"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <AppInput
            label="phone number"
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
          />
          <AppInput
            label="password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
          <AppButton type="submit">sign up</AppButton>
          <div className='w-full flex justify-center items-center flex-col' >
            <AppSeparator text={"or"}></AppSeparator>
            <Link href="/login" className='w-full border-solid border-2 border-primary rounded-full p-1 justify-center items-end flex' >
              <h1 className='capitalize text-primary'  > login</h1>
            </Link>
          </div>
        </form>
      </AppBadge>
    </div>
  );
};

export default Signup;
