// name dnezxuacy
//197579671982415
//k1bGZJtQ9jftTbgWaYO2GP3hxSg
//CLOUDINARY_URL=cloudinary://197579671982415:k1bGZJtQ9jftTbgWaYO2GP3hxSg@dnezxuacy
//olympic_flag
//https://api.cloudinary.com/v1_1/
"use client";
import React, { useState } from 'react';
const Test = () => {
    const [im, setIm] = useState(null);

    const x = async () => {
        console.log(im)
        const form = new FormData();
        form.append('file', im);
        form.append("upload_preset", "rkvogge5");
        await fetch("https://api.cloudinary.com/v1_1/dnezxuacy/image/upload", {
            method: "POST",
            body: form
        }).then(res=>console.log(res || "no data"))
    };

    return (
        <div>
            <input type='file' filename={im||""} onChange={e => setIm(e.target.files[0])} />
            <br />
            <button onClick={x}>Upload</button>
        </div>
    );
};

export default Test;
