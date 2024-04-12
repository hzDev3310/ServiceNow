import React from 'react'

const useGetUser = (token) => {
    const { data, loading, error } = useGet('/auth', {
        Authorization: `Bearer ${token}`
    })
    return{data:user , loading ,error}
}

export default useGetUser
