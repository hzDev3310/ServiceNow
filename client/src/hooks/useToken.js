import useLocalStorage from "./useLocalStorage";

const useToken = () => {
    const { getData: getToken, storeData : setToken } = useLocalStorage("token");
    return {getToken,setToken };
};

export default useToken;
