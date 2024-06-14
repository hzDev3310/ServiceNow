"use client"
import AppBadge from "../../src/components/AppBadge"
import AppButton from "../../src/components/AppButton"
import LeftBar from "../../src/components/LeftBar"
import { FaCopy } from "react-icons/fa";
import usePost from "../../src/api/usePost"
import AppLoading from "../../src/components/AppLoading";
import { useRef } from "react";
import Swal from "sweetalert2";

const page = () => {
    const { loading, postData, responseData,error } = usePost("/admin");
    const keyRef = useRef(null)
    const copyToClipboard = (ref, label) => {
        const value = ref.current.innerText;
        const tempInput = document.createElement('input');
        tempInput.value = value;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        Swal.fire({
            position: "button-end",
            icon: "success",
            title: label,
            showConfirmButton: false,
            timer: 1500
        });
    };
    return (
        <div className='w-screen h-screen'>
            {
                loading ? <AppLoading /> : <>
                    <LeftBar />
                    <div className="ml-[25%] w-[75%] h-full flex flex-col justify-center items-center space-y-2 " >
                        <div className="w-full ml-[33%]"> <h1 className="text-primary font-bold text-2xl capitalize"> genrate new admin key</h1><br /></div>
                        <div className="  items-center w-[70%]">
                            <AppBadge classname={"w-full h-16 rounded-xl flex items-center px-4 justify-between"} >
                                <h1 ref={keyRef}>
                                   {responseData}
                                </h1>
                                <br />
                                <button onClick={()=>{copyToClipboard(keyRef , "Admin Key copied to clipboard!")}}> <FaCopy /></button>

                            </AppBadge>
                            <br />
                            <AppButton classname={"h-16 rounded-xl"} onClick={()=>postData()} >genrate</AppButton>
                            <br />
                        
                        </div>


                    </div></>
            }
        </div>
    )
}

export default page
