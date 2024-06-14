"use client"
import { useEffect, useState } from "react";
import { baseUrl } from './apiclient';
import { useRouter } from "next/navigation";


const useGet = (endpoint = '/admin' , dep=[]) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const route = useRouter()
    useEffect(() => {
        const currentAdminString = localStorage.getItem("currentAdmin");
        const currentAdmin = JSON.parse(currentAdminString);
        const token = currentAdmin?.token;

        const fetchData = async () => {
            setIsLoading(true)
            if (currentAdminString == null) {
                    route.push("/login")
            } else {
                try {

                    const response = await fetch(baseUrl + endpoint, {
                        method: 'GET',
                        headers:
                        {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        }

                    });
                    const responseData = await response.json();
                    if (!response.ok) {
                        throw new Error("you need to login");
                    }
                    setData(responseData);
                    setError(null)
                } catch (error) {
                    setError(error);
                    setData(null)

                } finally { setIsLoading(false) }
            }

        };

        fetchData();

    }, [endpoint,...dep]);

    return { data, error, isLoading };
};

export default useGet;
