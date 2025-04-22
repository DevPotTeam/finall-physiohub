import { ApiDeleteRequest } from "@/axios/apiRequest";


async function useDelete(url){
    const response = await ApiDeleteRequest(url)
    console.log(response.status)
    if (response){
        return {data: response.data, error : response.error , status : response.status}
    }
}

export default useDelete;