import { ApiPutRequest } from "@/axios/apiRequest";


async function usePut(url, request){
    const response = await ApiPutRequest(url, request)
    return {data : response.data, error : response.error, status : response.status}
}

export default usePut;