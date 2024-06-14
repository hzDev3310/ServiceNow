import { useState } from 'react';
import { baseUrl } from '../api/apiclient';

import { useRouter } from 'next/navigation';

const useLogin = () => {
    const router = useRouter();
    const [responseData, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (username, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch(baseUrl + "/admin/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            } else {
                setData(data);
                localStorage.setItem('currentAdmin', JSON.stringify(data));
                router.push("/"); // Redirect to home page on successful login
            }
        } catch (err) {
            setError(err.message || 'Failed to login');
            setData(null)
        } finally {
            setIsLoading(false);
        }
    };

    return {
        responseData,
        error,
        isLoading,
        handleLogin,
    };
};

export default useLogin;
